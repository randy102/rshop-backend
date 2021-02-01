import {Injectable, Inject, forwardRef} from '@nestjs/common';
import RootService from '../root/root.service';
import {TransferItemEntity} from './store-transfer-item.entity';
import {TransferItemInput} from 'src/graphql.schema';
import {StoreTransferService} from '../store-transfer/store-transfer.service';

@Injectable()
export class TransferItemService extends RootService<TransferItemEntity> {
  constructor(
    @Inject(forwardRef(() => StoreTransferService)) protected readonly transferService: StoreTransferService
  ) {
    super(TransferItemEntity, 'Mục chuyển kho')
  }

  async create(idStoreTransfer: string, items: TransferItemInput[]): Promise<void> {
    for (let item of items) {
      await this.save({
        idStoreTransfer,
        ...item
      })
    }
  }

  async deleteByStock(idStocks: string[]): Promise<boolean> {
    const items = await this.find({ idStock: { $in: idStocks } })
    for (let item of items) {
      const itemsOfTransfer = await this.find({ idStoreTransfer: item.idStoreTransfer })
      // Delete Transfer if has no more item
      if (itemsOfTransfer.length <= 1)
        this.transferService.delete([item.idStoreTransfer])
    }
    return this.delete(items.map(i => i._id))
  }
}
