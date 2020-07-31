import { Injectable } from '@nestjs/common';
import RootService from '../root/root.service';
import { RoleEntity } from './role.entity';
import { NoPermissionError } from 'src/commons/exceptions/GqlException';

@Injectable()
export class RoleService extends RootService<RoleEntity>{
  constructor() {
    super(RoleEntity, 'Vai trò')
  }

  createMaster(idShop: string, idUser: string): Promise<RoleEntity>{
    return this.save(new RoleEntity({
      idShop,
      description: 'Chủ cửa hàng',
      name: 'Chủ cửa hàng',
      idPermissions: [],
      idUser,
      isMaster: true
    }))
  }

  async checkStaff(idUser: string, idShop: string){
    try{
      await this.checkExisted({idUser, idShop}, '')
    } catch(e){
      throw new NoPermissionError()
    }
  }
}
