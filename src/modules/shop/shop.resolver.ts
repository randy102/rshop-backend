import { Resolver, Mutation, Args, Context } from '@nestjs/graphql';
import UserEntity from '../user/user.entity';
import { CreateShopInput, Shop, UpdateShopInput } from 'src/graphql.schema';
import { ShopService } from './shop.service';

@Resolver('Shop')
export class ShopResolver {
  constructor(
    private readonly shopService: ShopService
  ){}

  @Mutation()
  createShop(@Context('user') u: UserEntity, @Args('input') i: CreateShopInput): Promise<Shop>{
    return this.shopService.create(i,u._id)
  }

  @Mutation()
  updateShop(@Context('user') u: UserEntity, @Args('input') i: UpdateShopInput): Promise<Shop>{
    return this.shopService.update(i,u._id)
  }
}
