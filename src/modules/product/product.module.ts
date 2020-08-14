import { Module, forwardRef } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductResolver } from './product.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductEntity } from './product.entity';
import { UserModule } from '../user/user.module';
import { BrandModule } from '../brand/brand.module';
import { CategoryModule } from '../category/category.module';
import { StockModule } from '../stock/stock.module';

@Module({
  providers: [ProductService, ProductResolver],
  imports: [
    TypeOrmModule.forFeature([ProductEntity]),
    forwardRef(() => BrandModule),
    forwardRef(() => CategoryModule),
    forwardRef(() => StockModule),
    UserModule,
  ],
   exports: [ProductService]
})
export class ProductModule {}
