import { Resolver, Mutation, Args, Query, Context } from '@nestjs/graphql';
import {CreateAdminInput, Admin, UpdateAdminInput, AdminLoginInput, DeleteAdminInput, ACCOUNT_TYPE} from '../../graphql.schema'
import { AdminService } from './admin.service';
import AdminEntity from './admin.entity';

@Resolver('Admin')
export class AdminResolver {
  constructor(
    private readonly adminService: AdminService
  ){}

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
  updateAdmin(@Args('input') input: UpdateAdminInput): Promise<Admin>{
    return this.adminService.update(input)
  }

  @Mutation()
  deleteAdmin(@Args('input') input: DeleteAdminInput): Promise<boolean>{
    return this.adminService.delete(input.ids)
  }

  @Mutation()
  loginAdmin(@Args('input') input: AdminLoginInput): Promise<string>{
    return this.adminService.login(input)
  }
}
