import { Injectable } from '@nestjs/common';
import RootService from '../root/root.service';
import UserEntity from './user.entity';
import { User, ACCOUNT_TYPE, RegisterUserInput, UpdateUserInput, ChangeUserPasswordInput } from 'src/graphql.schema';
import md5 = require('md5');
import { LoginError } from 'src/commons/exceptions/GqlException';

import { JwtService } from '../jwt/jwt.service';
import { MailerService } from '../mailer/mailer.service';
import { TokenService } from '../token/token.service';
import {FieldError} from 'src/commons/exceptions/GqlException'

@Injectable()
export class UserService extends RootService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly mailerService: MailerService,
    private readonly tokenService: TokenService
  ) { super(UserEntity, 'User') }

  async login({ email, password }): Promise<string> {
    const user: User = await this.findOne({ email, password: md5(password) })
    if (!user) throw new LoginError()

    const jwt = this.jwtService.sign(ACCOUNT_TYPE.USER, user._id)
    return jwt
  }

  sendConfirmMail(to: string, token: string): Promise<any>{
    return this.mailerService.send({
      to,
      subject: 'Xác thực tài khoản',
      html: `Vui lòng nhấn vào liên kết <a href="${token}">này</a> để hoàn thành bước xác thực email của bạn.`,
    })
  }

  async confirmEmail(email: string){
    await this.checkDuplication({email}, 'Email')
    const confirmToken = await this.tokenService.generate({email})
    const result = await this.sendConfirmMail(email, confirmToken)
    return !!result
  }

  async register(input: RegisterUserInput) {
    const {email} = await this.tokenService.get(input.token)
    await this.checkDuplication({ email }, 'Email')
    
    const created = await this.save(new UserEntity({
      ...input,
      email,
      password: md5(input.password),
    }))

    const jwt = this.jwtService.sign(ACCOUNT_TYPE.USER, created._id)
    return jwt
  }

  async update(_id, input: UpdateUserInput) {
    const existed: User = await this.checkExistedId(_id)
    
    return this.save(new UserEntity({
      ...existed,
      ...input
    }))
  }

  async changePassword(password: ChangeUserPasswordInput, _id: string){
    const existed: UserEntity = await this.checkExistedId(_id)

    if(existed.password !== md5(password.old))
      throw new FieldError('Password')

    const result = await this.save(new UserEntity({
      ...existed,
      password: md5(password.new)
    }))

    return !!result
  }
}