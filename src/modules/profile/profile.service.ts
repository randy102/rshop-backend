import {Injectable} from '@nestjs/common';
import RootService from '../root/root.service';
import ProfileEntity from './profile.entity';
import {UpdateProfileInput} from 'src/graphql.schema';
import {Moment} from 'src/utils/moment'
import {PhotoService} from '../photo/photo.service';

@Injectable()
export class ProfileService extends RootService<ProfileEntity> {
  constructor(
    private readonly photoService: PhotoService
  ) {
    super(ProfileEntity, "Profile")
  }

  create(input: Partial<ProfileEntity>): Promise<ProfileEntity> {
    return this.save({ ...input })
  }

  update(_id: string, input: UpdateProfileInput): Promise<ProfileEntity> {
    return this.save({
      _id,
      ...input,
      updatedAt: Moment().valueOf()
    })
  }

  async deleteProfile(ids: string[]): Promise<boolean> {
    const existeds = await this.checkExistedIds(ids)
    for (let profile of existeds) {
      await this.photoService.remove(profile.avatar)
    }
    return this.delete(ids)
  }
}
