import { Injectable } from '@nestjs/common';
import RootService from '../root/root.service';
import { TransferItemEntity } from './store-transfer-item.entity';
import { TransferItemInput } from 'src/graphql.schema';

@Injectable()
export class TransferItemService extends RootService<TransferItemEntity>{
  constructor(){super(TransferItemEntity, 'Mục chuyển kho')}

  create(idStoreTransfer: string, items: TransferItemInput[]){
    for(let item of items){
      this.save({
        idStoreTransfer,
        ...item
      })
    }
  }
}
