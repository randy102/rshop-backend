import { Injectable } from '@nestjs/common';
import RootService from '../root/root.service';
import { RoleEntity } from './role.entity';
import { NoPermissionError } from 'src/commons/exceptions/GqlException';
import { CreateRoleInput, UpdateRoleInput } from 'src/graphql.schema';
import { GraphQLError } from 'graphql';

@Injectable()
export class RoleService extends RootService<RoleEntity>{
  constructor() {
    super(RoleEntity, 'Vai trò')
  }

  async create(idShop: string, input: CreateRoleInput, createdBy: string): Promise<RoleEntity>{
    await this.checkDuplication({idShop, idUser: input.idUser})
    return this.save({
      idShop,
      ...input,
      createdBy
    })
  }

  createMaster(idShop: string, idUser: string): Promise<RoleEntity>{
    return this.save({
      idShop,
      description: 'Chủ cửa hàng',
      name: 'Chủ cửa hàng',
      idPermissions: [],
      idUser,
      isMaster: true
    })
  }

  async update(input: UpdateRoleInput, updatedBy: string): Promise<RoleEntity>{
    const existed = await this.checkExistedId(input._id)
    return this.save({
      ...existed,
      ...input,
      updatedBy
    })
  }

  async deleteRole(id: string): Promise<boolean>{
    const existed = await this.checkExistedId(id)
    if(existed.isMaster) throw new GraphQLError("Không thể xóa vai trò của chủ cửa hàng")

    return this.delete([id])
  }

  // Check if user is a member of shop
  async checkStaff(idUser: string, idShop: string){
    try{
      await this.checkExisted({idUser, idShop}, '')
    } catch(e){
      throw new NoPermissionError()
    }
  }

}
