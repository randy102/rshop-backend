import { Injectable } from '@nestjs/common';
import { ACCOUNT_TYPE, CreateUserInput, LoginInput, ChangePasswordInput } from 'src/graphql.schema';
import UserEntity from './user.entity';
import { JwtService } from '../jwt/jwt.service';
import AccountRootService from '../root/account-root.service';
import { CredentialService } from '../credential/credential.service';
import { HashService } from '../utils/hash/hash.service';
import { ProfileService } from '../profile/profile.service';
import { AccountRootEntity } from '../root/account-root.entity';


@Injectable()
export class UserService extends AccountRootService<UserEntity> {
  constructor(
    private readonly jwtService: JwtService,
    private readonly credentialService: CredentialService,
    private readonly hashService: HashService,
    private readonly profileService: ProfileService
  ) { super(UserEntity, 'User') }
  
  async updateCredentialHash(id: string): Promise<UserEntity>{
    const user: UserEntity = await this.findById(id)
    const credential = await this.credentialService.findById(user.idCredential)
    
    const hashContent = {
      ...credential
    }

    const credentialHash = this.hashService.create(JSON.stringify(hashContent))

    return this.save(new UserEntity({
      ...user,
      credentialHash
    }))
  }

  async login(input: LoginInput): Promise<string> {
    const hashedPassword = this.hashService.create(input.password)

    const user: UserEntity = await this.authenticate(input.email,hashedPassword)
    return this.jwtService.sign(user)
  }

  async create(input: CreateUserInput, createdBy: string) {
    await this.checkAccountDuplication(input.email)
    
    const DEFAULT_PASSWORD = '12345678'
    const createdCredential = await this.credentialService.create(input.email, DEFAULT_PASSWORD)
    const createdProfile = await this.profileService.create(input)

    const createdUser: UserEntity = await this.save(new UserEntity({
      isAdmin: input.isAdmin,
      idCredential: createdCredential._id,
      idProfile: createdProfile._id,  
      createdBy
    }))

    await this.updateCredentialHash(createdUser._id)
    return createdUser
  }
  
  async changePassword(user: AccountRootEntity, input: ChangePasswordInput): Promise<string>{
    await this.credentialService.changePassword(user.idCredential, input)
    const updated = await this.updateCredentialHash(user._id)
    return this.jwtService.sign(updated)
  }
}
