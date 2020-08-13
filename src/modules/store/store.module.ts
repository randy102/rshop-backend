import { Module, forwardRef } from '@nestjs/common';
import { StoreResolver } from './store.resolver';
import { StoreService } from './store.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StoreEntity } from './store.entity';
import { UserModule } from '../user/user.module';
import { StoreTransferModule } from '../store-transfer/store-transfer.module';
import { StoreTransferItemModule } from '../store-transfer-item/store-transfer-item.module';
import { StockModule } from '../stock/stock.module';
import { StockRecordModule } from '../stock-record/stock-record.module';

@Module({
  providers: [StoreResolver, StoreService],
  imports: [
    TypeOrmModule.forFeature([StoreEntity]),
    UserModule,
    forwardRef(() => StockModule),
    StockRecordModule,
    forwardRef(() => StoreTransferModule)
  ],
  exports: [StoreService]
})
export class StoreModule {}
