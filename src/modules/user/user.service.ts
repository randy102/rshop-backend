import { Injectable } from '@nestjs/common';
import RootService from '../root/root.service';
import UserEntity from './user.entity';
import { User, ACCOUNT_TYPE, RegisterUserInput, UpdateUserInput, ChangeUserPasswordInput } from 'src/graphql.schema';
import { LoginError } from 'src/commons/exceptions/GqlException';

import { JwtService } from '../jwt/jwt.service';
import { MailerService } from '../mailer/mailer.service';
import { TokenService } from '../token/token.service';
import { FieldError } from 'src/commons/exceptions/GqlException'
import { HashService } from '../utils/hash/hash.service';
import { AdminService } from '../admin/admin.service';

@Injectable()
export class UserService extends RootService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly mailerService: MailerService,
    private readonly tokenService: TokenService,
    private readonly hashService: HashService
  ) { super(UserEntity, 'User') }


  async login({ email, password }): Promise<string> {
    const hashedPassword = this.hashService.create(password)

    const user: UserEntity = await this.findOne({ email, password: hashedPassword })
    if (!user) throw new LoginError()
    
    return this.jwtService.sign(ACCOUNT_TYPE.USER, user._id)
  }

  async register(input: RegisterUserInput) {
    const { email } = await this.tokenService.get(input.token)
    await this.checkDuplication({ email }, 'Email')
    const created = await this.save(new UserEntity({
      ...input,
      email,
      password: this.hashService.create(input.password),
    }))

    return this.jwtService.sign(ACCOUNT_TYPE.USER, created._id)
  }

  sendConfirmMail(to: string, token: string): Promise<any> {
    return this.mailerService.send({
      to,
      subject: 'Xác thực tài khoản',
      html: `Vui lòng nhấn vào liên kết <a href="${token}">này</a> để hoàn thành bước xác thực email của bạn.`,
    })
  }

  async confirmEmail(email: string) {
    await this.checkDuplication({ email }, 'Email')
    const confirmToken = await this.tokenService.generate({ email })
    const result = await this.sendConfirmMail(email, confirmToken)
    return !!result
  }



  async update(_id, input: UpdateUserInput) {
    const existed: User = await this.checkExistedId(_id)

    return this.save(new UserEntity({
      ...existed,
      ...input
    }))
  }

  async changePassword(password: ChangeUserPasswordInput, _id: string) {
    const existed: UserEntity = await this.checkExistedId(_id)
    const hashedNewPassword = this.hashService.create(password.new)
    const hashedOldPassword = this.hashService.create(password.old)

    if (existed.password !== hashedOldPassword)
      throw new FieldError('Password')

    const result = await this.save(new UserEntity({
      ...existed,
      password: hashedNewPassword
    }))

    return !!result
  }

  sendNewPasswordEmail(to: string, newPassword: string) {
    return this.mailerService.send({
      to,
      subject: 'Mật khẩu ',
      html: ``,
    })
  }

  async resetPassword(email: String) {
    const PASSWORD_SIZE = 8
    const existed: UserEntity = await this.checkExisted({ email }, 'Email')
    const newPassword = this.hashService.rand(PASSWORD_SIZE)

    const updated = await this.save(new UserEntity({
      ...existed,
      password: this.hashService.create(newPassword)
    }))

    return updated ? newPassword : undefined
  }
}
