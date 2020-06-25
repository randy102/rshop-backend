import { Resolver, Mutation, Context, Args } from '@nestjs/graphql';
import { ProfileService } from './profile.service';
import UserEntity from '../user/user.entity';
import { UpdateProfileInput } from 'src/graphql.schema';
import ProfileEntity from './profile.entity';

@Resolver('Profile')
export class ProfileResolver {
  constructor(private readonly profileService: ProfileService){}

  @Mutation()
  updateUserProfile(@Context("user") user: UserEntity, @Args('input') input: UpdateProfileInput): Promise<ProfileEntity> {
    return this.profileService.update(user.idProfile, input)
  }
}
