import { Injectable } from '@nestjs/common';
import { CreateUserInput, LoginInput, ChangePasswordInput, UpdateAdminInput } from 'src/graphql.schema';
import UserEntity from './user.entity';
import { JwtService } from '../jwt/jwt.service';
import AccountRootService from '../root/account-root.service';
import { CredentialService } from '../credential/credential.service';
import { HashService } from '../utils/hash/hash.service';
import { ProfileService } from '../profile/profile.service';

@Injectable()
export class UserService extends AccountRootService<UserEntity> {
  constructor(
    private readonly jwtService: JwtService,
    private readonly credentialService: CredentialService,
    private readonly hashService: HashService,
    private readonly profileService: ProfileService
  ) { super(UserEntity, 'User') }
  
  async updateCredentialHash(id: string): Promise<UserEntity>{
    const user: UserEntity = await this.checkExistedId(id)
    const credential = await this.credentialService.checkExistedId(user.idCredential)
    
    const hashContent = {
      ...credential,
      isAdmin: user.isAdmin
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
  
  async changePassword(user: UserEntity, input: ChangePasswordInput): Promise<string>{
    await this.credentialService.changePassword(user.idCredential, input)
    const updated = await this.updateCredentialHash(user._id)
    return this.jwtService.sign(updated)
  }

  async updateAdmin(input: UpdateAdminInput): Promise<UserEntity>{
    const existed = await this.checkExistedId(input._id)
    const updated = await this.save(new UserEntity({
      ...existed,
      isAdmin: input.isAdmin
    }))
    await this.updateCredentialHash(input._id)
    return updated
  }
}
