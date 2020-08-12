import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductResolver } from './product.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductEntity } from './product.entity';
import { UserModule } from '../user/user.module';
import { BrandModule } from '../brand/brand.module';
import { CategoryModule } from '../category/category.module';

@Module({
  providers: [ProductService, ProductResolver],
  imports: [
    TypeOrmModule.forFeature([ProductEntity]),
    UserModule,
    BrandModule,
    CategoryModule
  ],
   exports: [ProductService]
})
export class ProductModule {}
