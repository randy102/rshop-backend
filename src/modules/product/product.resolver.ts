import {Resolver, ResolveField, Parent, Query, Args, Context, Mutation} from '@nestjs/graphql';
import {ProductEntity} from './product.entity';
import {UserService} from '../user/user.service';
import {RootResolver} from '../root/root.resolver';
import {ProductService} from './product.service';
import {BrandService} from '../brand/brand.service';
import {CategoryService} from '../category/category.service';
import {Category, Brand, Product, CreateProductInput, UpdateProductInput} from 'src/graphql.schema';
import {GQL_CTX} from 'src/commons/constants/gqlContext';
import UserEntity from '../user/user.entity';

@Resolver('Product')
export class ProductResolver extends RootResolver<ProductEntity> {
  constructor(
    protected readonly userService: UserService,
    protected readonly productService: ProductService,
    protected readonly brandService: BrandService,
    protected readonly categoryService: CategoryService
  ) {
    super(userService)
  }

  @ResolveField()
  category(@Parent() product: ProductEntity): Promise<Category> {
    return this.categoryService.findById(product.idCategory)
  }

  @ResolveField()
  brand(@Parent() product: ProductEntity): Promise<Brand> {
    return this.brandService.findById(product.idBrand)
  }

  @Query()
  products(@Args('idShop') idShop: string): Promise<Product[]> {
    return this.productService.find({ idShop })
  }

  @Mutation()
  createProduct(
    @Args('idShop') idShop: string,
    @Args('input') i: CreateProductInput,
    @Context(GQL_CTX.USER) u: UserEntity
  ): Promise<Product> {
    return this.productService.create(idShop, i, u._id)
  }

  @Mutation()
  updateProduct(
    @Args('idShop') idShop: string,
    @Args('input') i: UpdateProductInput,
    @Context(GQL_CTX.USER) u: UserEntity
  ): Promise<Product> {
    return this.productService.update(idShop, i, u._id)
  }

  @Mutation()
  deleteProduct(@Args('ids') ids: string[]): Promise<boolean> {
    return this.productService.deleteProduct(ids)
  }
}
