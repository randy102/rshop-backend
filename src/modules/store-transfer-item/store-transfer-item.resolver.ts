import { Resolver, ResolveField, Parent } from '@nestjs/graphql';
import { TransferItemEntity } from './store-transfer-item.entity';
import { StoreTransfer, Stock } from 'src/graphql.schema';
import { StockService } from '../stock/stock.service';
import { StoreTransferService } from '../store-transfer/store-transfer.service';

@Resolver('TransferItem')
export class StoreTransferItemResolver {
  constructor(
    protected readonly stockService: StockService,
    protected readonly transferService: StoreTransferService
  ){}

  @ResolveField()
  transfer(@Parent() item: TransferItemEntity): Promise<StoreTransfer>{
    return this.transferService.findById(item.idStoreTransfer)
  }

  @ResolveField()
  stock(@Parent() item: TransferItemEntity): Promise<Stock>{
    return this.stockService.findById(item.idStock)
  }
}
