import { Resolver, ResolveField, Parent } from '@nestjs/graphql';
import { StockRecordEntity } from './stock-record.entity';
import { Store } from 'src/graphql.schema';
import { StoreService } from '../store/store.service';
import { RootResolver } from '../root/root.resolver';
import { UserService } from '../user/user.service';

@Resolver('StockRecord')
export class StockRecordResolver extends RootResolver<StockRecordEntity>{
  constructor(
    protected readonly storeService: StoreService,
    protected readonly userService: UserService
  ){
    super(userService)
  }

  @ResolveField()
  store(@Parent() record: StockRecordEntity): Promise<Store>{
    return this.storeService.findById(record.idStore)
  }
}
