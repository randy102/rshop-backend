import { Injectable } from '@nestjs/common';
import RootService from '../root/root.service';
import ProfileEntity from './profile.entity';
import { UpdateProfileInput } from 'src/graphql.schema';
import {Moment} from 'src/utils/moment'

@Injectable()
export class ProfileService extends RootService<ProfileEntity>{
  constructor() { super(ProfileEntity, "Profile") }
  
  create(input: Partial<ProfileEntity>): Promise<ProfileEntity>{
    return this.save(new ProfileEntity({...input}))
  }

  update(_id: string, input: UpdateProfileInput): Promise<ProfileEntity>{
    return this.save(new ProfileEntity({
      _id,
      ...input,
      updatedAt: Moment().valueOf()
    }))
  }
}
