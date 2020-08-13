import { Module, forwardRef } from '@nestjs/common';
import { StockRecordService } from './stock-record.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StockRecordEntity } from './stock-record.entity';
import { StockRecordResolver } from './stock-record.resolver';
import { StoreModule } from '../store/store.module';

@Module({
  providers: [StockRecordService, StockRecordResolver],
  imports: [
    TypeOrmModule.forFeature([StockRecordEntity]),
    forwardRef(() => StoreModule)
  ],
  exports: [StockRecordService]
})
export class StockRecordModule {}
