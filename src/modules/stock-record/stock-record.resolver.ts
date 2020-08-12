import { Resolver, ResolveField, Parent } from '@nestjs/graphql';
import { StockRecordEntity } from './stock-record.entity';
import { Store } from 'src/graphql.schema';
import { StoreService } from '../store/store.service';

@Resolver('StockRecord')
export class StockRecordResolver {
  constructor(protected readonly storeService: StoreService){}

  @ResolveField()
  store(@Parent() record: StockRecordEntity): Promise<Store>{
    return this.storeService.findById(record.idStore)
  }
}
