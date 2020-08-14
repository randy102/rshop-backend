import { Module, forwardRef } from '@nestjs/common';
import { TransferItemService } from './store-transfer-item.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TransferItemEntity } from './store-transfer-item.entity';
import { StoreTransferItemResolver } from './store-transfer-item.resolver';
import { StoreTransferModule } from '../store-transfer/store-transfer.module';
import { StockModule } from '../stock/stock.module';

@Module({
  providers: [TransferItemService, StoreTransferItemResolver],
  imports: [
    TypeOrmModule.forFeature([TransferItemEntity]),
    forwardRef(() => StoreTransferModule),
    forwardRef(() => StockModule)
  ],
  exports: [TransferItemService]
})
export class StoreTransferItemModule {}
