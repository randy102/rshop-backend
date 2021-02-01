import {Module, forwardRef} from '@nestjs/common';
import {ShopService} from './shop.service';
import {ShopResolver} from './shop.resolver';
import {TypeOrmModule} from '@nestjs/typeorm';
import {ShopEntity} from './shop.entity';
import {RoleModule} from '../role/role.module';
import {TemplateModule} from '../template/template.module';

@Module({
  providers: [ShopService, ShopResolver],
  exports: [ShopService],
  imports: [
    TypeOrmModule.forFeature([ShopEntity]),
    forwardRef(() => RoleModule),
    forwardRef(() => TemplateModule)
  ]
})
export class ShopModule {
}
