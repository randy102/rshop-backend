import { Module } from '@nestjs/common';
import { BrandResolver } from './brand.resolver';
import { BrandService } from './brand.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BrandEntity } from './brand.entity';

@Module({
  providers: [BrandResolver, BrandService],
  imports: [
    TypeOrmModule.forFeature([BrandEntity])
  ]
})
export class BrandModule {}
