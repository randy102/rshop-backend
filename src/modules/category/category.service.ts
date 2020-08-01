import { Injectable } from '@nestjs/common';
import RootService from '../root/root.service';
import { CategoryEntity } from './category.entity';
import { RoleService } from '../role/role.service';
import { CreateCategoryInput, UpdateCategoryInput } from 'src/graphql.schema';

@Injectable()
export class CategoryService extends RootService<CategoryEntity>{
  constructor(
    private readonly roleService: RoleService
  ) {
    super(CategoryEntity, 'Thể loại')
  }

  byShop(idShop: string): Promise<CategoryEntity[]>{
    return this.find({idShop})
  }

  async create(idShop: string, input: CreateCategoryInput, createdBy: string): Promise<CategoryEntity>{
    await this.checkExistedId(input.idParent)
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
    await this.checkUsedCateogry(id)
    return this.delete([id])
  }

  async checkUsedCateogry(idCategory: string){

  }
}
