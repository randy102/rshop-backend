import { Module, forwardRef } from '@nestjs/common';
import { TemplateResolver } from './template.resolver';
import { TemplateService } from './template.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TemplateEntity } from './template.entity';
import { ShopModule } from '../shop/shop.module';
import { PhotoModule } from '../photo/photo.module';

@Module({
  providers: [TemplateResolver, TemplateService],
  exports: [TemplateService],
  imports: [
    TypeOrmModule.forFeature([TemplateEntity]),
    forwardRef(() => ShopModule),
    PhotoModule
  ]
})
export class TemplateModule {}
