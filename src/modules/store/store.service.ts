import {Injectable, Inject, forwardRef} from '@nestjs/common';
import RootService from '../root/root.service';
import {StoreEntity} from './store.entity';
import {
  CreateStoreInput,
  UpdateStoreInput,
  TransferStoreInput,
  TransferType,
  TransferItemInput
} from 'src/graphql.schema';
import {StoreTransferEntity} from '../store-transfer/store-transfer.entity';
import {StoreTransferService} from '../store-transfer/store-transfer.service';
import {TransferItemService} from '../store-transfer-item/store-transfer-item.service';
import {StockService} from '../stock/stock.service';
import {StockRecordService} from '../stock-record/stock-record.service';
import {GraphQLError} from 'graphql';

@Injectable()
export class StoreService extends RootService<StoreEntity> {
  constructor(
    @Inject(forwardRef(() => StoreTransferService))
    protected readonly storeTransferService: StoreTransferService,
    @Inject(forwardRef(() => StockService))
    protected readonly stockService: StockService,
    protected readonly stockRecordService: StockRecordService
  ) {
    super(StoreEntity, 'Kho hàng')
  }

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
    await this.stockRecordService.deleteByStore(ids)
    return this.delete(ids)
  }

  async checkStoreEmpty(ids: string[]) {
    const records = await this.stockRecordService.find({ idStore: { $in: ids } })
    if (records.length) {
      const remainStock = records.reduce((total, record) => total + record.quantity, 0)
      if (remainStock > 0) throw new GraphQLError('Còn tồn hàng trong kho.')
    }
  }

  async transfer(idShop: string, input: TransferStoreInput, createdBy: string): Promise<StoreTransferEntity> {
    if (!input.items.length)
      throw new GraphQLError('Danh sách hàng hóa rỗng!')

    // Check Stock existed
    const idStocks = input.items.map(i => i.idStock)
    await this.stockService.checkExistedInShop(idShop, idStocks)

    // Check Src Des existed
    await this.checkSrcDes(idShop, input.type, input.idSrc, input.idDes)

    // Check record is available if export or transfer
    await this.stockRecordService.checkAvailable(input)

    // Create transfer
    const transfer = await this.storeTransferService.create(input, createdBy)

    // Update records
    await this.stockRecordService.update(input, createdBy)

    return transfer
  }

  async checkSrcDes(idShop: string, type: TransferType, idSrc: string, idDes: string) {
    if (type === TransferType.EXPORT)
      await this.checkExisted({ _id: idSrc, idShop })
    else if (type === TransferType.IMPORT)
      await this.checkExisted({ _id: idDes, idShop })
    else {
      await this.checkExisted({ _id: idSrc, idShop })
      await this.checkExisted({ _id: idDes, idShop })
    }
  }

}
