import { Resolver, Mutation, Args, Query, Context } from '@nestjs/graphql';
import { CreatePermissionInput, Permission, UpdatePermissionInput } from 'src/graphql.schema';
import { PermissionService } from './permission.service';
import { NotFoundError, DuplicateError } from 'src/commons/exceptions/GqlException';
import AdminEntity from '../admin/admin.entity';
import PermissionEntity from './permission.entity';

@Resolver('Permission')
export class PermissionResolver {
  constructor(private readonly permissionService: PermissionService){}

  @Query()
  async permissions(): Promise<Permission[]>{
    return await this.permissionService.find()
  }

  @Mutation()
  async createPermission(@Context('currentAccount') admin: AdminEntity,@Args('input') input: CreatePermissionInput): Promise<Permission>{
    const existedEmail = await this.permissionService.findOne({name: input.name})
    if(existedEmail) throw new DuplicateError('Permission')

    return await this.permissionService.save({
      ...input,
      createdBy: admin._id
    })
  }

  @Mutation()
  async updatePermission(@Args('input') input: UpdatePermissionInput): Promise<Permission>{
    const existed: Permission = await this.permissionService.findById(input._id)
    if(!existed) throw new NotFoundError("Permission")
    
    const existedEmail = await this.permissionService.findOne({name: input.name, _id: {$ne: input._id}})
    if(existedEmail) throw new DuplicateError('Permission')

    const updated = await this.permissionService.save({
      ...existed,
      ...input
    })
    return updated
  }

  @Mutation()
  async deletePermission(@Args('ids') ids: string[]): Promise<boolean>{
    const deleted = await this.permissionService.delete(ids)
    return !!deleted
  }

}
