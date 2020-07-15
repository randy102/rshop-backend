import { Injectable } from '@nestjs/common';
import RootService from '../root/root.service';
import { RoleEntity } from './role.entity';

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
}
