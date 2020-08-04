import { Resolver, Query, ResolveProperty, ResolveField, Parent, Mutation, Args, Context } from '@nestjs/graphql';
import { Brand, User, CreateBrandInput, UpdateBrandInput } from 'src/graphql.schema';
import { BrandService } from './brand.service';
import { UserService } from '../user/user.service';
import { BrandEntity } from './brand.entity';
import { GQL_CTX } from 'src/commons/constants/gqlContext';
import UserEntity from '../user/user.entity';
import { RootResolver } from '../root/root.resolver';

@Resolver('Brand')
export class BrandResolver extends RootResolver<BrandEntity>{
  constructor(
    protected readonly brandService: BrandService,
    protected readonly userService: UserService
  ) { super(userService) }


  @Query()
  brands(): Promise<Brand[]> {
    return this.brandService.find()
  }

  @Mutation()
  createBrand(@Args('idShop') idShop: string, @Args('input') i: CreateBrandInput, @Context(GQL_CTX.USER) u: UserEntity): Promise<Brand> {
    return this.brandService.create(idShop, i, u._id)
  }

  @Mutation()
  updateBrand(@Args('input') i: UpdateBrandInput, @Context(GQL_CTX.USER) u: UserEntity): Promise<Brand> {
    return this.brandService.update(i, u._id)
  }

  @Mutation()
  deleteBrand(@Args('ids') ids: string[]): Promise<boolean>{
    return this.brandService.deleteBrands(ids)
  }
}
