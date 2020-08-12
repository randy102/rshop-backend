import { Injectable } from '@nestjs/common';
import RootService from '../root/root.service';
import { StockEntity } from './stock.entity';
import { StockInfoService } from '../stock-info/stock-info.service';
import { StockRecordService } from '../stock-record/stock-record.service';
import { CreateStockInput, UpdateStockInput } from 'src/graphql.schema';
import { ProductService } from '../product/product.service';
import { StoreService } from '../store/store.service';

@Injectable()
export class StockService extends RootService<StockEntity>{
  constructor(
    protected readonly stockInfoService: StockInfoService,
    protected readonly stockRecordService: StockRecordService,
    protected readonly productService: ProductService,
    protected readonly storeService: StoreService
  ){super(StockEntity,'Hàng hóa')}
  
  async byShop(idShop: string): Promise<StockEntity[]>{
    const products = await this.productService.find({idShop})
    const idProducts = products.map(p => p._id)
    return this.find({idProduct: {$in: idProducts}})
  }

  async create(idShop: string, input: CreateStockInput, createdBy: string): Promise<StockEntity>{
    await this.productService.checkExisted({_id: input.idProduct, idShop})
    
    const created = await this.save({
      ...input,
      createdBy
    })

    this.stockInfoService.save({
      idStock: created._id,
      ...input, 
      createdBy
    })
    
    return created
  }

  async update(input: UpdateStockInput, updatedBy: string): Promise<StockEntity>{
    const existed = await this.checkExistedId(input._id)

    const updated = await this.save({
      ...existed,
      ...input,
      updatedBy
    })

    const info = await this.stockInfoService.checkExisted({idStock: input._id}) 
    this.stockInfoService.save({
      ...info,
      ...input, 
      updatedBy
    })

    return updated
  }

  async deleteStock(ids: string[]): Promise<boolean>{
    // TODO delete Info, record, transferItem
    return this.delete(ids)
  }
}
