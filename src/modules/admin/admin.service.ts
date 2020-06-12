import { Injectable } from '@nestjs/common';
import { ACCOUNT_TYPE, CreateAdminInput, LoginInput, ChangePasswordInput } from 'src/graphql.schema';
import AdminEntity from './admin.entity';
import { JwtService } from '../jwt/jwt.service';
import AccountRootService from '../root/account-root.service';
import { CredentialService } from '../credential/credential.service';
import { HashService } from '../utils/hash/hash.service';
import { ProfileService } from '../profile/profile.service';
import { AccountRootEntity } from '../root/account-root.entity';


@Injectable()
export class AdminService extends AccountRootService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly credentialService: CredentialService,
    private readonly hashService: HashService,
    private readonly profileService: ProfileService
  ) { super(AdminEntity, 'Admin') }
  
  async updateCredentialHash(id: string): Promise<AccountRootEntity>{
    const admin: AdminEntity = await this.findById(id)
    const credential = await this.credentialService.findById(admin.idCredential)
    
    const hashContent = {
      ...credential
    }

    const credentialHash = this.hashService.create(JSON.stringify(hashContent))

    return this.save(new AdminEntity({
      ...admin,
      credentialHash
    }))
  }

  async login(input: LoginInput): Promise<string> {
    const hashedPassword = this.hashService.create(input.password)

    const admin: AdminEntity = await this.authenticate(input.email,hashedPassword)
    return this.jwtService.sign(ACCOUNT_TYPE.ADMIN, admin)
  }

  async create(input: CreateAdminInput, createdBy: string) {
    await this.checkAccountDuplication(input.email)
    
    const DEFAULT_PASSWORD = '12345678'
    const createdCredential = await this.credentialService.create(input.email, DEFAULT_PASSWORD)
    const createdProfile = await this.profileService.create(input)

    const createdAdmin: AdminEntity = await this.save(new AdminEntity({
      idCredential: createdCredential._id,
      idProfile: createdProfile._id,  
      createdBy
    }))

    await this.updateCredentialHash(createdAdmin._id)
    return createdAdmin
  }
  
  async changePassword(admin: AccountRootEntity, input: ChangePasswordInput): Promise<string>{
    await this.credentialService.changePassword(admin.idCredential, input)
    const updated = await this.updateCredentialHash(admin._id)
    return this.jwtService.sign(ACCOUNT_TYPE.ADMIN, updated)
  }
}
