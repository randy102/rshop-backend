import { Resolver, Mutation, Args, Query, Context } from '@nestjs/graphql';
import { CreatePermissionInput, Permission, UpdatePermissionInput, DeletePermissionInput } from 'src/graphql.schema';
import { PermissionService } from './permission.service';
import UserEntity from '../user/user.entity';

@Resolver('Permission')
export class PermissionResolver {
  constructor(private readonly permissionService: PermissionService) { }

  @Query()
  permissions(): Promise<Permission[]> {
    return this.permissionService.find()
  }

  @Mutation()
  createPermission(@Context('user') admin: UserEntity, @Args('input') input: CreatePermissionInput): Promise<Permission> {
    return this.permissionService.create(input, admin._id)
  }

  @Mutation()
  updatePermission(@Args('input') input: UpdatePermissionInput): Promise<Permission> {
    return this.permissionService.update(input)
  }

  @Mutation()
  deletePermission(@Args('input') input: DeletePermissionInput): Promise<boolean> {
    return this.permissionService.delete(input.ids)
  }

}
