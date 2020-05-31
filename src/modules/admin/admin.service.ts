import { Injectable } from '@nestjs/common';
import { Admin, ACCOUNT_TYPE, CreateAdminInput, UpdateProfileInput } from 'src/graphql.schema';
import AdminEntity from './admin.entity';
import { LoginError } from 'src/commons/exceptions/GqlException';
import { JwtService } from '../jwt/jwt.service';
import AccountRootService from '../root/account-root.service';
import { CredentialService } from '../credential/credential.service';
import { HashService } from '../utils/hash/hash.service';
import CredentialEntity from '../credential/credential.entity';
import { ProfileService } from '../profile/profile.service';


@Injectable()
export class AdminService extends AccountRootService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly credentialService: CredentialService,
    private readonly hashService: HashService,
    private readonly profileService: ProfileService
  ) { super(AdminEntity, 'Admin') }

  async login({ email, password }): Promise<string> {
    const hashedPassword = this.hashService.create(password)

    const admin: AdminEntity = await this.authenticate(email,hashedPassword)
    return this.jwtService.sign(ACCOUNT_TYPE.ADMIN, admin._id)
  }

  async create(input: CreateAdminInput, createdBy: string) {
    const DEFAULT_PASSWORD = '12345678'

    await this.checkAccountDuplication(input.email)

    const createdCredential = await this.credentialService.create(input.email, DEFAULT_PASSWORD)
    const createdProfile = await this.profileService.create(input)

    return this.save(new AdminEntity({
      idCredential: createdCredential._id,
      idProfile: createdProfile._id,  
      createdBy
    }));
  }

  
}
