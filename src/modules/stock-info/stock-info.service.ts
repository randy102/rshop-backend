import { Injectable } from '@nestjs/common';
import RootService from '../root/root.service';
import { StockInfoEntity } from './stock-info.entity';

@Injectable()
export class StockInfoService extends RootService<StockInfoEntity>{
  constructor(){super(StockInfoEntity, 'Thông tin hàng hóa')}

  async deleteByStock(idStocks: string[]): Promise<boolean>{
    const info = await this.find({idStock: {$in: idStocks}})
    return this.delete(info.map(i => i._id))
  }
}
