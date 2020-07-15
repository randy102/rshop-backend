import { Injectable } from '@nestjs/common';
import RootService from '../root/root.service';
import { ShopEntity } from './shop.entity';
import { CreateShopInput, UpdateShopInput } from 'src/graphql.schema';
import { RoleService } from '../role/role.service';
import { RoleEntity } from '../role/role.entity';

@Injectable()
export class ShopService extends RootService<ShopEntity>{
  constructor(
    private readonly roleService: RoleService
  ) {
    super(ShopEntity,'Cửa hàng')
  }

  async create(input: CreateShopInput, master: string): Promise<ShopEntity>{
    await this.checkDuplication({domain: input.domain},'Tên miền')
    const createdShop = await this.save(new ShopEntity({
      ...input,
      createdBy: master
    }))
    await this.roleService.createMaster(createdShop._id, master)
    return createdShop
  }

  async update(input: UpdateShopInput, updatedBy: string): Promise<ShopEntity>{
    const existed = await this.checkExistedId(input._id)
    await this.checkDuplication({domain: input.domain, _id: {$ne: input._id}},'Tên miền')
    return this.save(new ShopEntity({
      ...existed,
      ...input,
      updatedBy
    }))
  }
}
