import { Resolver, Mutation, Args, Query, Context } from '@nestjs/graphql';
import * as md5 from 'md5'


import {CreateAdminInput, Admin, UpdateAdminInput, AdminLoginInput} from '../../graphql.schema'
import { AdminService } from './admin.service';
import { NotFoundError, LoginError, DuplicateError } from 'src/commons/exceptions/GqlException';
import { generateAccountPayload } from 'src/utils/jwt/accountPayload';
import { AccountType } from 'src/constants/account';
import { sign } from 'src/utils/jwt';
import AdminEntity from './admin.entity';

@Resolver('Admin')
export class AdminResolver {
  constructor(
    private readonly adminService: AdminService
  ){}

  @Query()
  async admins(): Promise<Admin[]>{
    return await this.adminService.find()
  }

  @Query()
  async currentAdmin(@Context("currentAccount") admin: AdminEntity): Promise<Admin>{
    return admin
  }

  @Mutation()
  async createAdmin(@Context('currentAccount')  admin: AdminEntity, @Args('input') input: CreateAdminInput ): Promise<Admin>{
    const existedEmail = await this.adminService.findOne({email: input.email})
    if(existedEmail) throw new DuplicateError('Admin')
    
    return await this.adminService.save({
      ...input,
      password: md5(input.password),
      createdBy: admin._id
    });
  }

  @Mutation()
  async updateAdmin(@Args('input') input: UpdateAdminInput): Promise<Admin>{
    const existed: Admin = await this.adminService.findById(input._id)
    if(!existed) throw new NotFoundError("Admin")

    const existedEmail = await this.adminService.findOne({email: input.email, _id: {$ne: input._id}})
    if(existedEmail) throw new DuplicateError('Admin')

    const updated = await this.adminService.save({
      ...existed,
      ...input,
      password: md5(input.password)
    })

    return updated
  }

  @Mutation()
  async deleteAdmin(@Args('ids') ids: string[]): Promise<boolean>{
    const deleted = await this.adminService.delete(ids)
    return !!deleted
  }

  @Mutation()
  async adminLogin(@Args('input') input: AdminLoginInput): Promise<string>{
    const admin = await this.adminService.login(input.email, md5(input.password))
    if(!admin) throw new LoginError()

    const jwt = sign(generateAccountPayload(AccountType.ADMIN, admin._id), process.env.JWT_SECRET)
    return jwt
  }
}
