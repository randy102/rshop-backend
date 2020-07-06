import { Module } from '@nestjs/common';
import { TemplateResolver } from './template.resolver';
import { TemplateService } from './template.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TemplateEntity } from './template.entity';

@Module({
  providers: [TemplateResolver, TemplateService],
  imports: [
    TypeOrmModule.forFeature([TemplateEntity])
  ]
})
export class TemplateModule {}
