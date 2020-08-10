import { Module } from '@nestjs/common';
import { BrandResolver } from './brand.resolver';
import { BrandService } from './brand.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BrandEntity } from './brand.entity';
import { UserModule } from '../user/user.module';
import { PhotoModule } from '../photo/photo.module';

@Module({
  providers: [BrandResolver, BrandService],
  imports: [
    TypeOrmModule.forFeature([BrandEntity]),
    UserModule,
    PhotoModule
  ],
  exports: [BrandService]
})
export class BrandModule {}
