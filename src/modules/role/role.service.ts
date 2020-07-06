import { Injectable } from '@nestjs/common';
import RootService from '../root/root.service';
import { RoleEntity } from './role.entity';

@Injectable()
export class RoleService extends RootService<RoleEntity>{
  constructor() {
    super(RoleEntity, 'Vai trò')
  }
}
