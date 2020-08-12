import { Injectable } from '@nestjs/common';
import RootService from '../root/root.service';
import { StockInfoEntity } from './stock-info.entity';

@Injectable()
export class StockInfoService extends RootService<StockInfoEntity>{
  constructor(){super(StockInfoEntity, 'Thông tin hàng hóa')}
}
