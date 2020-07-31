import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import {CredentialError} from 'src/commons/exceptions/GqlException'
import UserEntity from '../user/user.entity';
import {MANAGE_PERMISSION} from 'src/commons/constants/permissions'
import { RoleService } from '../role/role.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly roleService: RoleService
  ){}

  getCurrentAccount(_id: string): Promise<UserEntity>{
    return this.userService.findById(_id)
  }

  getUserRoles(idUser: string): Promise<UserRole[]>{
    return this.roleService.aggregate([
      {$match: {idUser}},
      {$lookup: {
        from: 'Permission',
        localField: 'idPermissions',
        foreignField: '_id',
        as: 'permissions'
      }},
      {$project: {idShop: 1, permissions: "$permissions.name", isMaster: 1}}
    ])
  }

}

export interface UserRole {
  idShop: string
  permissions: MANAGE_PERMISSION[]
  isMaster: boolean
}