import { Injectable } from '@nestjs/common';
import { StoreTransferEntity } from './store-transfer.entity';
import RootService from '../root/root.service';
import { TransferStoreInput, TransferType } from 'src/graphql.schema';
import { StoreService } from '../store/store.service';
import { TransferItemService } from '../store-transfer-item/store-transfer-item.service';

@Injectable()
export class StoreTransferService extends RootService<StoreTransferEntity>{
  constructor(
    protected readonly transferItemService: TransferItemService
  ){super(StoreTransferEntity,'Đơn chuyển kho')}

  async create(input: TransferStoreInput, createdBy: string): Promise<StoreTransferEntity>{
    const transfer = await this.save({
      ...input,
      createdBy
    })
    
    // Create transfered items
    this.transferItemService.create(transfer._id, input.items)

    return transfer
  }

  
}
