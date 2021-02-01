import {Resolver, Query, Args, Context, ResolveField, Parent, Mutation} from '@nestjs/graphql';
import {CategoryService} from './category.service';
import {Category, CreateCategoryInput, UpdateCategoryInput} from 'src/graphql.schema';
import UserEntity from '../user/user.entity';
import {CategoryEntity} from './category.entity';
import {GQL_CTX} from 'src/commons/constants/gqlContext';


@Resolver('Category')
export class CategoryResolver {
  constructor(private readonly categoryService: CategoryService) {
  }

  @ResolveField()
  parent(@Parent() cate: CategoryEntity): Promise<Category> {
    return this.categoryService.findById(cate.idParent)
  }

  @Query()
  categories(@Args('idShop') idShop: string): Promise<Category[]> {
    return this.categoryService.byShop(idShop)
  }

  @Mutation()
  createCategory(@Context(GQL_CTX.USER) u: UserEntity, @Args('idShop') s: string, @Args('input') i: CreateCategoryInput): Promise<Category> {
    return this.categoryService.create(s, i, u._id)
  }

  @Mutation()
  updateCategory(@Context(GQL_CTX.USER) u: UserEntity, @Args('input') i: UpdateCategoryInput): Promise<Category> {
    return this.categoryService.update(i, u._id)
  }

  @Mutation()
  deleteCategory(@Args('id') id: string): Promise<boolean> {
    return this.categoryService.deleteCategory(id)
  }
}
