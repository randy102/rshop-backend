import { Injectable } from '@nestjs/common';
import RootService from '../root/root.service';
import { StoreEntity } from './store.entity';
import { CreateStoreInput, UpdateStoreInput, TransferStoreInput, TransferType, TransferItemInput } from 'src/graphql.schema';
import { StoreTransferEntity } from '../store-transfer/store-transfer.entity';
import { StoreTransferService } from '../store-transfer/store-transfer.service';
import { TransferItemService } from '../store-transfer-item/store-transfer-item.service';
import { StockService } from '../stock/stock.service';
import { StockRecordService } from '../stock-record/stock-record.service';

@Injectable()
export class StoreService extends RootService<StoreEntity>{
  constructor(
    protected readonly storeTransferService: StoreTransferService,
    protected readonly stockService: StockService,
    protected readonly stockRecordService: StockRecordService
  ) { super(StoreEntity, 'Kho hàng') }

  async create(idShop: string, input: CreateStoreInput, createdBy: string): Promise<StoreEntity> {
    await this.checkDuplication({ name: input.name }, 'Tên kho hàng')
    return this.save({
      idShop,
      ...input,
      createdBy
    })
  }

  async update(input: UpdateStoreInput, updatedBy: string): Promise<StoreEntity> {
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

  async transfer(input: TransferStoreInput, createdBy: string): Promise<StoreTransferEntity>{
    // Check Stock existed
    const idStocks = input.items.map(i => i.idStock)
    await this.stockService.checkExistedIds(idStocks)
    
    // Check Src Des existed
    await this.checkSrcDes(input.type, input.idSrc, input.idDes)

    // Check record is available if export or transfer
    await this.stockRecordService.checkAvailable(input)

    // Create transfer
    const transfer = await this.storeTransferService.create(input, createdBy)
    
    // Update records
    await this.stockRecordService.update(input, createdBy)

    return transfer
  }

  async checkSrcDes(type: TransferType, idSrc: string, idDes: string){
    if(type === TransferType.EXPORT)
      await this.checkExistedId(idSrc)
    else if(type === TransferType.IMPORT)
      await this.checkExistedId(idDes)
    else{
      await this.checkExistedId(idSrc)
      await this.checkExistedId(idDes)
    }
  }

}
