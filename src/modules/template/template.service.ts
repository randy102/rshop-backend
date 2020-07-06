import { Injectable } from '@nestjs/common';
import RootService from '../root/root.service';
import { TemplateEntity } from './template.entity';
import { CreateTemplateInput, UpdateTemplateInput } from 'src/graphql.schema';


@Injectable()
export class TemplateService extends RootService<TemplateEntity>{
  constructor(){
    super(TemplateEntity, 'Chủ đề')
  }

  getActive(): Promise<TemplateEntity[]>{
    return this.find({isActive: true})
  }

  async create(input: CreateTemplateInput, createdBy: string): Promise<TemplateEntity>{
    await this.checkDuplication({code: input.code})
    return this.save(new TemplateEntity({
      ...input,
      createdBy
    }))
  }

  async update(input: UpdateTemplateInput, updatedBy: string): Promise<TemplateEntity>{
    return this.save(new TemplateEntity({
      ...input,
      updatedBy
    }))
  }
}
