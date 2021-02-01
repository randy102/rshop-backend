import {Module, forwardRef} from '@nestjs/common';
import {BrandResolver} from './brand.resolver';
import {BrandService} from './brand.service';
import {TypeOrmModule} from '@nestjs/typeorm';
import {BrandEntity} from './brand.entity';
import {UserModule} from '../user/user.module';
import {PhotoModule} from '../photo/photo.module';
import {ProductModule} from '../product/product.module';

@Module({
  providers: [BrandResolver, BrandService],
  imports: [
    TypeOrmModule.forFeature([BrandEntity]),
    UserModule,
    PhotoModule,
    forwardRef(() => ProductModule)
  ],
  exports: [BrandService]
})
export class BrandModule {
}
