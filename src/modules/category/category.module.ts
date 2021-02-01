import {Module, forwardRef} from '@nestjs/common';
import {CategoryResolver} from './category.resolver';
import {CategoryService} from './category.service';
import {TypeOrmModule} from '@nestjs/typeorm';
import {CategoryEntity} from './category.entity';
import {RoleModule} from '../role/role.module';
import {ProductModule} from '../product/product.module';

@Module({
  providers: [CategoryResolver, CategoryService],
  imports: [
    TypeOrmModule.forFeature([CategoryEntity]),
    RoleModule,
    forwardRef(() => ProductModule)
  ],
  exports: [CategoryService]
})
export class CategoryModule {
}
