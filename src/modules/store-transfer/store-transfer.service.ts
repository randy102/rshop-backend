import { Injectable, Inject, forwardRef } from '@nestjs/common';
import { StoreTransferEntity } from './store-transfer.entity';
import RootService from '../root/root.service';
import { TransferStoreInput } from 'src/graphql.schema';
import { TransferItemService } from '../store-transfer-item/store-transfer-item.service';
import { StoreService } from '../store/store.service';

@Injectable()
export class StoreTransferService extends RootService<StoreTransferEntity>{
  constructor(
    @Inject(forwardRef(() => TransferItemService)) protected readonly transferItemService: TransferItemService,
    protected readonly storeService: StoreService
  ){super(StoreTransferEntity,'Đơn chuyển kho')}

  async create(input: TransferStoreInput, createdBy: string): Promise<StoreTransferEntity>{
    const transfer = await this.save({
      ...input,
      createdBy
    })
    
    // Create transfered items
    await this.transferItemService.create(transfer._id, input.items)

    return transfer
  }

  async byShop(idShop: string): Promise<StoreTransferEntity[]>{
    const storesByShop = await this.storeService.find({idShop})
    const storeIds = storesByShop.map(s => s._id)
    return this.find({$or: [
      {idSrc: {$in: storeIds}},
      {idDes: {$in: storeIds}}
    ]})
  }
}
