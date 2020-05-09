import { Resolver, Mutation, Args, Query, Context } from '@nestjs/graphql';
import { CreatePermissionInput, Permission, UpdatePermissionInput, DeletePermissionInput } from 'src/graphql.schema';
import { PermissionService } from './permission.service';
import { NotFoundError, DuplicateError } from 'src/commons/exceptions/GqlException';
import AdminEntity from '../admin/admin.entity';

@Resolver('Permission')
export class PermissionResolver {
  constructor(private readonly permissionService: PermissionService){}

  @Query()
  async permissions(): Promise<Permission[]>{
    return await this.permissionService.find()
  }

  @Mutation()
  async createPermission(@Context('currentAccount') admin: AdminEntity,@Args('input') input: CreatePermissionInput): Promise<Permission>{
    const existed = await this.permissionService.findOne({name: input.name})
    if(existed) throw new DuplicateError('Permission')

    return await this.permissionService.save({
      ...input,
      createdBy: admin._id
    })
  }

  @Mutation()
  async updatePermission(@Args('input') input: UpdatePermissionInput): Promise<Permission>{
    const existed: Permission = await this.permissionService.findById(input._id)
    if(!existed) throw new NotFoundError("Permission")
    
    const existedName = await this.permissionService.findOne({name: input.name, _id: {$ne: input._id}})
    if(existedName) throw new DuplicateError('Permission')

    const updated = await this.permissionService.save({
      ...existed,
      ...input
    })
    return updated
  }

  @Mutation()
  async deletePermission(@Args('input') input: DeletePermissionInput): Promise<boolean>{
    const deleted = await this.permissionService.delete(input.ids)
    return !!deleted
  }

}
