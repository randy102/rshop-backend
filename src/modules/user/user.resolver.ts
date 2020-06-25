import { Resolver, Mutation, Args, Query, Context, ResolveField, Parent } from '@nestjs/graphql';
import { CreateUserInput, User, DeleteUserInput,  LoginInput, ChangePasswordInput, UpdateAdminInput } from '../../graphql.schema'
import { UserService } from './user.service';
import UserEntity from './user.entity';
import { ProfileService } from '../profile/profile.service';
import { CredentialService } from '../credential/credential.service';
import { AccountRootResolver } from '../root/account-root.resolver';
import ProfileEntity from '../profile/profile.entity';

@Resolver('User')
export class UserResolver extends AccountRootResolver<UserEntity> {
  constructor(
    private readonly userService: UserService,
    readonly profileService: ProfileService,
    readonly credentialService: CredentialService,
  ) { super(profileService, credentialService) }

  @Query()
  users(): Promise<User[]> {
    return this.userService.find()
  }

  @Query()
  currentUser(@Context("user") user: UserEntity): User {
    return user
  }

  @Mutation()
  createUser(@Context('user') user: UserEntity, @Args('input') input: CreateUserInput): Promise<User> {
    return this.userService.create(input, '')
  }

  @Mutation()
  deleteUser(@Context('user') user: UserEntity, @Args('input') input: DeleteUserInput): Promise<boolean> {
    if(!input.ids.some(id => id === user._id))
    return this.userService.deleteAccount(input.ids)
  }

  @Mutation()
  loginUser(@Args('input') input: LoginInput): Promise<string> {
    return this.userService.login(input)
  }

  @Mutation()
  changeUserPassword(@Context('user') user: UserEntity, @Args('input') input: ChangePasswordInput): Promise<string> {
    return this.userService.changePassword(user,input)
  }

  @Mutation()
  updateAdmin(@Context('user') user: UserEntity, @Args('input') inp: UpdateAdminInput): Promise<User>{
    if(user._id !== inp._id)
    return this.userService.updateAdmin(inp)
  }
}
