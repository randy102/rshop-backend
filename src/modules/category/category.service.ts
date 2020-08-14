import { Injectable, Inject, forwardRef } from '@nestjs/common';
import RootService from '../root/root.service';
import { CategoryEntity } from './category.entity';
import { RoleService } from '../role/role.service';
import { CreateCategoryInput, UpdateCategoryInput } from 'src/graphql.schema';
import { ProductService } from '../product/product.service';
import { GraphQLError } from 'graphql';

@Injectable()
export class CategoryService extends RootService<CategoryEntity>{
  constructor(
    @Inject(forwardRef(() => ProductService)) protected readonly productService: ProductService
  ) {
    super(CategoryEntity, 'Thể loại')
  }

  byShop(idShop: string): Promise<CategoryEntity[]>{
    return this.find({idShop})
  }

  async create(idShop: string, input: CreateCategoryInput, createdBy: string): Promise<CategoryEntity>{
    if(input.idParent !== null) await this.checkExistedId(input.idParent)
    return this.save({
      idShop,
      ...input,
      createdBy
    })
  }

  async update(input: UpdateCategoryInput, updatedBy: string): Promise<CategoryEntity>{
    const existed = await this.checkExistedId(input._id)
    return this.save({
      ...existed,
      ...input,
      updatedBy
    })
  }

  async deleteCategory(id: string): Promise<boolean>{
    await this.checkExistedId(id)
    await this.checkUsedCateogries([id])
    await this.deleteChilds(id)
    return this.delete([id])
  }

  async deleteChilds(idParent: string){
    let toDeleteIds: string[] = []
    
    const firstChilds = await this.find({idParent})
    const firstChildIds = firstChilds.map(c=>c._id)

    await this.checkUsedCateogries(firstChildIds)
    toDeleteIds.push(...firstChildIds)

    for(let {_id: idParent} of firstChilds){
      const secondChilds = await this.find({idParent})
      const secondChildIds = secondChilds.map(c=>c._id)
      
      await this.checkUsedCateogries(secondChildIds)
      toDeleteIds.push(...secondChildIds)
    }

    await this.delete(toDeleteIds)
  }

  async checkUsedCateogries(ids: string[]){
    const productByBrand = await this.productService.find({idCategory: {$in: ids}})
    if(productByBrand.length)
      throw new GraphQLError('Thể loại đã được sử dụng!')

  }
}
