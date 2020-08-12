import { Injectable } from '@nestjs/common';
import { StockRecordEntity } from './stock-record.entity';
import RootService from '../root/root.service';

@Injectable()
export class StockRecordService extends RootService<StockRecordEntity>{
  constructor(){super(StockRecordEntity, 'Bản ghi mặt hàng')}
}
