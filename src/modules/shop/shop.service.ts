import { Injectable } from '@nestjs/common';
import RootService from '../root/root.service';
import { ShopEntity } from './shop.entity';
import { CreateShopInput, UpdateShopInput } from 'src/graphql.schema';
import { RoleService } from '../role/role.service';
import { RoleEntity } from '../role/role.entity';
import { GraphQLError } from 'graphql';
import UserEntity from '../user/user.entity';

@Injectable()
export class ShopService extends RootService<ShopEntity>{
  constructor(
    private readonly roleService: RoleService
  ) {
    super(ShopEntity,'Cửa hàng')
  }

  async create(input: CreateShopInput, master: string): Promise<ShopEntity>{
    await this.checkLimitShop(master)
    await this.checkDuplication({domain: input.domain},'Tên miền')
    const createdShop = await this.save({
      ...input,
      createdBy: master
    })
    await this.roleService.createMaster(createdShop._id, master)
    return createdShop
  }

  async update(input: UpdateShopInput, updatedBy: string): Promise<ShopEntity>{
    const existed = await this.checkExistedId(input._id)
    await this.checkDuplication({domain: input.domain, _id: {$ne: input._id}},'Tên miền')
    return this.save({
      ...existed,
      ...input,
      updatedBy
    })
  }

  byUser(idUser: string): Promise<ShopEntity[]>{
    const pipe = [
      {$match: {idUser}},
      {
        $lookup: {
          from: 'Shop',
          localField: 'idShop',
          foreignField: '_id',
          as: 'shop'
        }
      },
      {$unwind: {path: '$shop'}},
      {$replaceRoot: {newRoot: '$shop'}}
    ]

    return this.roleService.aggregate(pipe)
  }

  ownedByUser(idUser: string): Promise<ShopEntity[]>{
    const pipe = [
      {$match: {idUser, isMaster: true}},
      {
        $lookup: {
          from: 'Shop',
          localField: 'idShop',
          foreignField: '_id',
          as: 'shop'
        }
      },
      {$unwind: {path: '$shop'}},
      {$replaceRoot: {newRoot: '$shop'}}
    ]

    return this.roleService.aggregate(pipe)
  }

  async checkLimitShop(idUser: string){
    const LIMIT = 3
    const userShops =  await this.ownedByUser(idUser)
    if(userShops.length >= LIMIT)
      throw new GraphQLError(`Người dùng chỉ được tạo tối đa ${LIMIT} cửa hàng!`)
  }

  async getShopMaster(idShop: string): Promise<UserEntity>{
    const pipe = [
      {$match: {idShop, isMaster: true}},
      {$lookup: {
        from: 'User',
        localField: 'idUser',
        foreignField: '_id',
        as: 'user'
      }},
      {$unwind: {path: '$user'}},
      {$replaceRoot: {newRoot: '$user'}}
    ]

    return (await this.roleService.aggregate(pipe))[0]
  }
}
