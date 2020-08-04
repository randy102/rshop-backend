import { Resolver, ResolveField, Parent, Query, Args, Context, Mutation } from '@nestjs/graphql';
import { RoleService } from './role.service';
import { RoleEntity } from './role.entity';
import { Shop, User, Permission, Role, CreateRoleInput, UpdateRoleInput } from 'src/graphql.schema';
import { ShopService } from '../shop/shop.service';
import { UserService } from '../user/user.service';
import { PermissionService } from '../permission/permission.service';
import { GQL_CTX } from 'src/commons/constants/gqlContext';
import UserEntity from '../user/user.entity';

@Resolver('Role')
export class RoleResolver {
  constructor(
    private readonly roleService: RoleService,
    private readonly shopService: ShopService,
    private readonly userService: UserService,
    private readonly permissionService: PermissionService
  ){}

  @ResolveField()
  shop(@Parent() role: RoleEntity): Promise<Shop>{
    return this.shopService.findById(role.idShop)
  }

  @ResolveField()
  user(@Parent() role: RoleEntity): Promise<User>{
    return this.userService.findById(role.idUser)
  }

  @ResolveField()
  permissions(@Parent() role: RoleEntity): Promise<Permission[]>{
    return this.permissionService.find({_id: {$in: role.idPermissions}})
  }

  @Query()
  staffs(@Args('idShop') idShop: string): Promise<Role[]>{
    return this.roleService.find({idShop})
  }

  @Query()
  currentRole(@Context(GQL_CTX.USER) u: UserEntity, @Args('idShop') idShop: string): Promise<Role>{
    return this.roleService.findOne({idShop, idUser: u._id})
  }

  @Mutation()
  createRole(@Args('idShop') idShop: string, @Args('input') i: CreateRoleInput, @Context(GQL_CTX.USER) u: UserEntity): Promise<Role>{
    return this.roleService.create(idShop,i,u._id)
  }

  @Mutation()
  updateRole(@Args('input') i: UpdateRoleInput, @Context(GQL_CTX.USER) u: UserEntity): Promise<Role>{
    return this.roleService.update(i,u._id)
  }

  @Mutation()
  deleteRole(@Args('id') id: string): Promise<boolean>{
    return this.roleService.deleteRole(id)
  }
}
