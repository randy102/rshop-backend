import { Injectable } from '@nestjs/common';
import RootService from '../root/root.service';
import { ShopEntity } from './shop.entity';

@Injectable()
export class ShopService extends RootService<ShopEntity>{
  constructor() {
    super(ShopEntity,'Cửa hàng')
  }
}
