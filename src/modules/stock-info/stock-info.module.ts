import { Module } from '@nestjs/common';
import { StockInfoService } from './stock-info.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StockInfoEntity } from './stock-info.entity';

@Module({
  providers: [StockInfoService],
  imports: [TypeOrmModule.forFeature([StockInfoEntity])],
  exports: [StockInfoService]
})
export class StockInfoModule {}
