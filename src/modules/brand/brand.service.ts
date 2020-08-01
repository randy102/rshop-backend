import { Injectable } from '@nestjs/common';
import RootService from '../root/root.service';
import { BrandEntity } from './brand.entity';

@Injectable()
export class BrandService extends RootService<BrandEntity>{
  constructor(){
    super(BrandEntity, 'Thương hiệu')
  }

  async create(name: string): Promise<BrandEntity>{
    await this.checkDuplication({name})
    return this.save({
      name
    })
  }
}
