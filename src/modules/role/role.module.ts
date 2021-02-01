import {Module, forwardRef} from '@nestjs/common';
import {RoleResolver} from './role.resolver';
import {RoleService} from './role.service';
import {TypeOrmModule} from '@nestjs/typeorm';
import {RoleEntity} from './role.entity';
import {ShopModule} from '../shop/shop.module';
import {UserModule} from '../user/user.module';
import {PermissionModule} from '../permission/permission.module';

@Module({
  providers: [RoleResolver, RoleService],
  exports: [RoleService],
  imports: [
    TypeOrmModule.forFeature([RoleEntity]),
    forwardRef(() => ShopModule),
    UserModule,
    PermissionModule
  ]
})
export class RoleModule {
}
