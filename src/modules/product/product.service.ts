import {Injectable, Inject, forwardRef} from '@nestjs/common';
import RootService from '../root/root.service';
import {ProductEntity} from './product.entity';
import {CreateProductInput, UpdateProductInput} from 'src/graphql.schema';
import {BrandService} from '../brand/brand.service';
import {CategoryService} from '../category/category.service';
import {StockService} from '../stock/stock.service';

@Injectable()
export class ProductService extends RootService<ProductEntity> {
  constructor(
    protected readonly categoryService: CategoryService,
    protected readonly stockService: StockService,
    @Inject(forwardRef(() => BrandService)) protected readonly brandService: BrandService,
  ) {
    super(ProductEntity, 'Mặt hàng')
  }

  async create(idShop: string, input: CreateProductInput, createdBy: string): Promise<ProductEntity> {
    await this.brandService.checkExisted({ _id: input.idBrand, idShop })
    await this.categoryService.checkExisted({ _id: input.idCategory, idShop })
    return this.save({
      idShop,
      ...input,
      createdBy
    })
  }

  async update(idShop: string, input: UpdateProductInput, updatedBy: string): Promise<ProductEntity> {
    const existed = await this.checkExistedId(input._id)
    await this.brandService.checkExisted({ _id: input.idBrand, idShop })
    await this.categoryService.checkExisted({ _id: input.idCategory, idShop })
    return this.save({
      ...existed,
      ...input,
      updatedBy
    })
  }

  async deleteProduct(ids: string[]): Promise<boolean> {
    await this.stockService.deleteByProduct(ids)
    return this.delete(ids)
  }
}
