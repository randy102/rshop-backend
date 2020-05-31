import { Resolver, Mutation, Args, Query, Context, ResolveField, Parent } from '@nestjs/graphql';
import {CreateAdminInput, Admin, DeleteAdminInput, ACCOUNT_TYPE, UpdateProfileInput, LoginInput, ChangePasswordInput} from '../../graphql.schema'
import { AdminService } from './admin.service';
import AdminEntity from './admin.entity';
import { ProfileService } from '../profile/profile.service';
import { CredentialService } from '../credential/credential.service';

@Resolver('Admin')
export class AdminResolver {
  constructor(
    private readonly adminService: AdminService,
    private readonly profileService: ProfileService,
    private readonly credentialService: CredentialService,
  ){}
  
  @ResolveField()
  profile(@Parent() admin: AdminEntity){
    return this.profileService.findById(admin.idProfile)
  }

  @ResolveField()
  credential(@Parent() admin: AdminEntity){
    return this.credentialService.findById(admin.idCredential)
  }

  @Query()
  admins(): Promise<Admin[]>{
    return this.adminService.find()
  }

  @Query()
  currentAdmin(@Context("currentAccount") admin: AdminEntity): Admin{
    return admin
  }

  @Mutation()
  createAdmin(@Context('currentAccount')  admin: AdminEntity, @Args('input') input: CreateAdminInput ): Promise<Admin>{
    return this.adminService.create(input, admin._id)
  }

  @Mutation()
  updateAdminProfile(@Context("currentAccount") admin: AdminEntity, @Args('input') input: UpdateProfileInput): Promise<boolean>{
    return this.profileService.update(admin.idProfile, input)
  }

  @Mutation()
  deleteAdmin(@Args('input') input: DeleteAdminInput): Promise<boolean>{
    return this.adminService.deleteAccount(input.ids)
  }

  @Mutation()
  loginAdmin(@Args('input') input: LoginInput): Promise<string>{
    return this.adminService.login(input)
  }

  @Mutation()
  changeAdminPassword(@Context("currentAccount") admin: AdminEntity, @Args('input') input: ChangePasswordInput): Promise<boolean>{
    return this.credentialService.changePassword(admin.idCredential, input)
  }
}
