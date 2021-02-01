import {Resolver, Mutation, Args, Context, Query, ResolveField, Parent} from '@nestjs/graphql';
import UserEntity from '../user/user.entity';
import {CreateShopInput, Shop, UpdateShopInput, User, Template} from 'src/graphql.schema';
import {ShopService} from './shop.service';
import {ShopEntity} from './shop.entity';
import {TemplateService} from '../template/template.service';
import {GQL_CTX} from 'src/commons/constants/gqlContext';

@Resolver('Shop')
export class ShopResolver {
  constructor(
    private readonly shopService: ShopService,
    private readonly templateService: TemplateService
  ) {
  }

  @ResolveField()
  master(@Parent() shop: ShopEntity): Promise<User> {
    return this.shopService.getShopMaster(shop._id)
  }

  @ResolveField()
  template(@Parent() shop: ShopEntity): Promise<Template> {
    return this.templateService.findById(shop.idTemplate)
  }

  @Query()
  userShops(@Context(GQL_CTX.USER) u: UserEntity): Promise<Shop[]> {
    return this.shopService.byUser(u._id)
  }

  @Query()
  shopByDomain(@Args('domain') domain: string): Promise<Shop> {
    return this.shopService.findOne({ domain })
  }

  @Query()
  shops(@Args('domain') domain: string): Promise<Shop[]> {
    return this.shopService.find()
  }

  @Mutation()
  createShop(@Context(GQL_CTX.USER) u: UserEntity, @Args('input') i: CreateShopInput): Promise<Shop> {
    return this.shopService.create(i, u._id)
  }

  @Mutation()
  updateShop(@Context(GQL_CTX.USER) u: UserEntity, @Args('input') i: UpdateShopInput): Promise<Shop> {
    return this.shopService.update(i, u._id)
  }
}
