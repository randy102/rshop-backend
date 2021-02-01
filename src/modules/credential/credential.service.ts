import {Injectable} from '@nestjs/common';
import {ChangePasswordInput} from 'src/graphql.schema';
import RootService from '../root/root.service';
import CredentialEntity from './credential.entity';
import {HashService} from '../utils/hash/hash.service';
import {FieldError} from 'src/commons/exceptions/GqlException';
import {Moment} from 'src/utils/moment';

@Injectable()
export class CredentialService extends RootService<CredentialEntity> {
  constructor(
    private readonly hashService: HashService
  ) {
    super(CredentialEntity, 'Credential')
  }

  create(email: string, password: string): Promise<CredentialEntity> {
    return this.save({
      email,
      password: this.hashService.create(password)
    })
  }

  checkPasswordMatch(password: string, _password: string) {
    if (password !== _password)
      throw new FieldError('Mật khẩu')
  }

  async changePassword(_id: string, input: ChangePasswordInput): Promise<boolean> {
    const existed: CredentialEntity = await this.checkExistedId(_id)

    const hashedOldPassword = this.hashService.create(input.old)
    const hashedNewPassword = this.hashService.create(input.new)

    this.checkPasswordMatch(existed.password, hashedOldPassword)

    const updatedPassword = await this.save({
      ...existed,
      password: hashedNewPassword,
      updatedAt: Moment().valueOf()
    })

    return !!updatedPassword
  }
}
