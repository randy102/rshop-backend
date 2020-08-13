import { Resolver, ResolveField, Parent } from '@nestjs/graphql';
import { RootResolver } from '../root/root.resolver';
import { StoreTransferEntity } from './store-transfer.entity';
import { UserService } from '../user/user.service';
import { StoreService } from '../store/store.service';
import { Store, TransferItem } from 'src/graphql.schema';
import { TransferItemService } from '../store-transfer-item/store-transfer-item.service';

@Resolver('StoreTransfer')
export class StoreTransferResolver extends RootResolver<StoreTransferEntity>{
  constructor(
    protected readonly userService: UserService,
    protected readonly storeService: StoreService,
    protected readonly transferItemService: TransferItemService
  ) { super(userService) }

  @ResolveField()
  des(@Parent() transfer: StoreTransferEntity): Promise<Store>{
    return this.storeService.findById(transfer.idDes)
  }

  @ResolveField()
  src(@Parent() transfer: StoreTransferEntity): Promise<Store>{
    return this.storeService.findById(transfer.idSrc)
  }

  @ResolveField()
  items(@Parent() transfer: StoreTransferEntity): Promise<TransferItem[]>{
    return this.transferItemService.find({idStoreTransfer: transfer._id})
  }
}
