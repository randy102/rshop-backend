import { Injectable } from '@nestjs/common';
import RootService from '../root/root.service';
import { TemplateEntity } from './template.entity';
import { CreateTemplateInput, UpdateTemplateInput } from 'src/graphql.schema';
import { ShopService } from '../shop/shop.service';
import { GraphQLError } from 'graphql';


@Injectable()
export class TemplateService extends RootService<TemplateEntity>{
  constructor(
    private readonly shopService: ShopService
  ) {
    super(TemplateEntity, 'Chủ đề')
  }

  getActive(): Promise<TemplateEntity[]> {
    return this.find({ isActive: true })
  }

  async create(input: CreateTemplateInput, createdBy: string): Promise<TemplateEntity> {
    await this.checkDuplication({ code: input.code }, 'Mã')
    return this.save(new TemplateEntity({
      ...input,
      createdBy
    }))
  }

  async update(input: UpdateTemplateInput, updatedBy: string): Promise<TemplateEntity> {
    const existed = await this.checkExistedId(input._id)
    return this.save(new TemplateEntity({
      ...existed,
      ...input,
      updatedBy
    }))
  }

  async deleteTemplate(id: string): Promise<boolean>{
    const used = await this.shopService.findOne({idTemplate: id})
    if(used) throw new GraphQLError('Chủ đề đã được sử dụng. Không thể xóa')
    
    return this.delete([id])
  }
}
