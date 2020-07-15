import { Module } from '@nestjs/common';
import { ShopService } from './shop.service';
import { ShopResolver } from './shop.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ShopEntity } from './shop.entity';
import { RoleModule } from '../role/role.module';

@Module({
  providers: [ShopService, ShopResolver],
  exports: [ShopService],
  imports: [
    TypeOrmModule.forFeature([ShopEntity]),
    RoleModule
  ]
})
export class ShopModule {}
