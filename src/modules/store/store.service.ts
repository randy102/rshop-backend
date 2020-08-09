import { Injectable } from '@nestjs/common';
import RootService from '../root/root.service';
import { StoreEntity } from './store.entity';
import { CreateStoreInput, UpdateStoreInput } from 'src/graphql.schema';

@Injectable()
export class StoreService extends RootService<StoreEntity>{
  constructor() { super(StoreEntity, 'Kho hàng') }

  async create(idShop: string, input: CreateStoreInput, createdBy: string): Promise<StoreEntity> {
    await this.checkDuplication({ name: input.name }, 'Tên kho hàng')
    return this.save({
      idShop,
      ...input,
      createdBy
    })
  }

  async update(idShop: string, input: UpdateStoreInput, updatedBy: string): Promise<StoreEntity> {
    const existed = await this.checkExistedId(input._id)
    await this.checkDuplication({ name: input.name, _id: { $ne: input._id } }, 'Tên kho hàng')
    return this.save({
      ...existed,
      ...input,
      updatedBy
    })
  }

  async deleteStore(ids: string[]): Promise<boolean> {

    await this.checkExistedIds(ids)
    await this.checkStoreEmpty(ids)

    return this.delete(ids)
  }

  async checkStoreEmpty(ids: string[]) {
    // TODO: Check if store empty
  }
}
