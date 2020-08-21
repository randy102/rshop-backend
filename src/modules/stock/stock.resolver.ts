import { Resolver, ResolveField, Parent, Mutation, Context, Query, Args } from '@nestjs/graphql';
import { RootResolver } from '../root/root.resolver';
import { StockEntity } from './stock.entity';
import { UserService } from '../user/user.service';
import { StockInfoService } from '../stock-info/stock-info.service';
import { StockRecordService } from '../stock-record/stock-record.service';
import { StockInfo, StockRecord, CreateStockInput, Stock, Product, UpdateStockInput } from 'src/graphql.schema';
import { GQL_CTX } from 'src/commons/constants/gqlContext';
import UserEntity from '../user/user.entity';
import { StockService } from './stock.service';
import { ProductService } from '../product/product.service';

@Resolver('Stock')
export class StockResolver extends RootResolver<StockEntity>{
  constructor(
    protected readonly userService: UserService,
    protected readonly stockInfoService: StockInfoService,
    protected readonly stockRecordService: StockRecordService,
    protected readonly stockService: StockService,
    protected readonly productService: ProductService,
  ) { super(userService) }

  @ResolveField()
  info(@Parent() stock: StockEntity): Promise<StockInfo> {
    return this.stockInfoService.findOne({ idStock: stock._id })
  }

  @ResolveField()
  records(@Parent() stock: StockEntity): Promise<StockRecord[]> {
    return this.stockRecordService.find({ idStock: stock._id })
  }

  @ResolveField()
  product(@Parent() stock: StockEntity): Promise<Product> {
    return this.productService.findById(stock.idProduct)
  }

  @Query()
  stocks(@Args('idShop') idShop: string): Promise<Stock[]>{
    return this.stockService.byShop(idShop)
  }

  @Query()
  stocksByProduct(@Args('idProduct') idProduct: string): Promise<Stock[]>{
    return this.stockService.find({idProduct})
  }

  @Query()
  stocksByStore(@Args('idStore') idStore: string): Promise<Stock[]>{
    return this.stockService.byStore(idStore)
  }

  @Mutation()
  createStock(@Args('idShop') idShop: string, @Args('input') i: CreateStockInput, @Context(GQL_CTX.USER) u: UserEntity): Promise<Stock> {
    return this.stockService.create(idShop, i, u._id)
  }

  @Mutation()
  updateStock(@Args('input') i: UpdateStockInput, @Context(GQL_CTX.USER) u: UserEntity): Promise<Stock> {
    return this.stockService.update(i, u._id)
  }

  @Mutation()
  deleteStock(@Args('ids') ids: string[]): Promise<boolean>{
    return this.stockService.deleteStock(ids)
  }
}
