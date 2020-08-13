import { Resolver, Mutation, Args, Context, Query } from '@nestjs/graphql';
import { RootResolver } from '../root/root.resolver';
import { StoreEntity } from './store.entity';
import { UserService } from '../user/user.service';
import { StoreService } from './store.service';
import { CreateStoreInput, Store, UpdateStoreInput } from 'src/graphql.schema';
import { GQL_CTX } from 'src/commons/constants/gqlContext';
import UserEntity from '../user/user.entity';

@Resolver('Store')
export class StoreResolver extends RootResolver<StoreEntity>{
  constructor(
    protected readonly userService: UserService,
    protected readonly storeService: StoreService
  ) { super(userService) }

  @Query()
  stores(@Args('idShop') idShop: string): Promise<Store[]> {
    return this.storeService.find({ idShop })
  }

  @Mutation()
  createStore(
    @Args('idShop') idShop: string,
    @Args('input') i: CreateStoreInput,
    @Context(GQL_CTX.USER) u: UserEntity
  ): Promise<Store> {
    return this.storeService.create(idShop, i, u._id)
  }

  @Mutation()
  updateStore(
    @Args('input') i: UpdateStoreInput,
    @Context(GQL_CTX.USER) u: UserEntity
  ): Promise<Store> {
    return this.storeService.update(i, u._id)
  }

  @Mutation()
  deleteStore(@Args('ids') ids: string[]): Promise<boolean>{
    return this.storeService.deleteStore(ids)
  }
}
