import { Module, forwardRef } from '@nestjs/common';
import { StockService } from './stock.service';
import { StockResolver } from './stock.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StockEntity } from './stock.entity';
import { StockInfoModule } from '../stock-info/stock-info.module';
import { StockRecordModule } from '../stock-record/stock-record.module';
import { UserModule } from '../user/user.module';
import { ProductModule } from '../product/product.module';
import { StoreModule } from '../store/store.module';

@Module({
  providers: [StockService, StockResolver],
  imports: [
    TypeOrmModule.forFeature([StockEntity]),
    StockInfoModule,
    StockRecordModule,
    ProductModule,
    UserModule,
    forwardRef(() => StoreModule)
  ],
  exports: [StockService]
})
export class StockModule {}
