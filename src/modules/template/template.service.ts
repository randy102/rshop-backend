import { Injectable } from '@nestjs/common';
import RootService from '../root/root.service';
import { TemplateEntity } from './template.entity';
import { CreateTemplateInput, UpdateTemplateInput } from 'src/graphql.schema';
import { ShopService } from '../shop/shop.service';
import { GraphQLError } from 'graphql';
import { PhotoService } from '../photo/photo.service';


@Injectable()
export class TemplateService extends RootService<TemplateEntity>{
  constructor(
    private readonly shopService: ShopService,
    private readonly photoService: PhotoService
  ) {
    super(TemplateEntity, 'Chủ đề')
  }

  getActive(): Promise<TemplateEntity[]> {
    return this.find({ isActive: true })
  }

  async create(input: CreateTemplateInput, createdBy: string): Promise<TemplateEntity> {
    await this.checkDuplication({ code: input.code }, 'Mã')
    return this.save({
      ...input,
      createdBy
    })
  }

  async update(input: UpdateTemplateInput, updatedBy: string): Promise<TemplateEntity> {
    const existed = await this.checkExistedId(input._id)
    return this.save({
      ...existed,
      ...input,
      updatedBy
    })
  }

  async deleteTemplate(id: string): Promise<boolean>{
    const existed = await this.checkExistedId(id)
    const used = await this.shopService.findOne({idTemplate: id})
    if(used) throw new GraphQLError('Chủ đề đã được sử dụng. Không thể xóa')
    this.photoService.remove(existed.demoImg)
    return this.delete([id])
  }
}
