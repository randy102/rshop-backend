import {Injectable} from '@nestjs/common';
import RootService from '../root/root.service';
import {BrandEntity} from './brand.entity';
import {CreateBrandInput, UpdateBrandInput} from 'src/graphql.schema';
import {PhotoService} from '../photo/photo.service';
import {ProductService} from '../product/product.service';
import {GraphQLError} from 'graphql';

@Injectable()
export class BrandService extends RootService<BrandEntity> {
  constructor(
    private readonly photoService: PhotoService,
    private readonly productService: ProductService
  ) {
    super(BrandEntity, 'Thương hiệu')
  }

  async create(idShop: string, input: CreateBrandInput, createdBy: string): Promise<BrandEntity> {
    return this.save({
      idShop,
      ...input,
      createdBy
    })
  }

  async update(input: UpdateBrandInput, updatedBy: string): Promise<BrandEntity> {
    const existed = await this.checkExistedId(input._id)
    return this.save({
      ...existed,
      ...input,
      updatedBy
    })
  }

  async deleteBrands(ids: string[]): Promise<boolean> {
    // Check if brand is used
    const productByBrand = await this.productService.find({ idBrand: { $in: ids } })
    if (productByBrand.length)
      throw new GraphQLError('Thương hiệu đã được sử dụng!')

    const existeds = await this.checkExistedIds(ids)
    existeds.forEach(brand => this.photoService.remove(brand.img))
    return this.delete(ids)
  }
}
