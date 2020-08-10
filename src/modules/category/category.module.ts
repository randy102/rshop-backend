import { Module } from '@nestjs/common';
import { CategoryResolver } from './category.resolver';
import { CategoryService } from './category.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryEntity } from './category.entity';
import { RoleModule } from '../role/role.module';

@Module({
  providers: [CategoryResolver, CategoryService],
  imports: [
    TypeOrmModule.forFeature([CategoryEntity]),
    RoleModule
  ],
  exports: [CategoryService]
})
export class CategoryModule {}
