import { Injectable, Inject, forwardRef } from '@nestjs/common';
import RootService from '../root/root.service';
import { StockEntity } from './stock.entity';
import { StockInfoService } from '../stock-info/stock-info.service';
import { StockRecordService } from '../stock-record/stock-record.service';
import { CreateStockInput, UpdateStockInput } from 'src/graphql.schema';
import { ProductService } from '../product/product.service';
import { NotFoundError } from 'src/commons/exceptions/GqlException';
import { TransferItemService } from '../store-transfer-item/store-transfer-item.service';

@Injectable()
export class StockService extends RootService<StockEntity>{
  constructor(
    protected readonly stockInfoService: StockInfoService,
    protected readonly stockRecordService: StockRecordService,
    @Inject(forwardRef(() => ProductService)) protected readonly productService: ProductService,
    protected readonly transferItemService: TransferItemService
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

  async deleteByProduct(idProducs: string[]): Promise<boolean>{
    const stocks = await this.find({idProduct: {$in: idProducs}})
    return this.deleteStock(stocks.map(s => s._id))
  }

  async deleteStock(ids: string[]): Promise<boolean>{
    await this.stockInfoService.deleteByStock(ids)
    await this.stockRecordService.deleteByStock(ids)
    await this.transferItemService.deleteByStock(ids)

    return this.delete(ids)
  }

  async checkExistedInShop(idShop: string, idStocks: string[]){
    const stocks = await this.aggregate([
      {$match: {_id: {$in: idStocks}}},
      {$lookup: {
        from: 'Product',
        localField: 'idProduct',
        foreignField: '_id',
        as: 'product'
      }},
      {$unwind: {path: '$product'}},
      {$match: {'product.idShop': idShop}}
    ])

    if(stocks.length !== idStocks.length)
      throw new NotFoundError('Hàng hóa')
  }
}
