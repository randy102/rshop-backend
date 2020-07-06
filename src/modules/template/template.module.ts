import { Module } from '@nestjs/common';
import { TemplateResolver } from './template.resolver';
import { TemplateService } from './template.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TemplateEntity } from './template.entity';
import { ShopModule } from '../shop/shop.module';

@Module({
  providers: [TemplateResolver, TemplateService],
  imports: [
    TypeOrmModule.forFeature([TemplateEntity]),
    ShopModule
  ]
})
export class TemplateModule {}
