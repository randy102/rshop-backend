import {Resolver, Mutation, Args, Query, Context} from '@nestjs/graphql';
import {
  CreateUserInput,
  LoginResponse,
  User,
  DeleteUserInput,
  LoginInput,
  ChangePasswordInput,
  UpdateAdminInput,
  RequestEmailConfirmInput,
  RegisterUserInput
} from '../../graphql.schema'
import {UserService} from './user.service';
import UserEntity from './user.entity';
import {ProfileService} from '../profile/profile.service';
import {CredentialService} from '../credential/credential.service';
import {AccountRootResolver} from '../root/account-root.resolver';
import {GQL_CTX} from 'src/commons/constants/gqlContext';
import {PhotoService} from '../photo/photo.service';


@Resolver('User')
export class UserResolver extends AccountRootResolver<UserEntity> {
  constructor(
    protected readonly userService: UserService,
    protected readonly profileService: ProfileService,
    protected readonly credentialService: CredentialService,
  ) {
    super(profileService, credentialService, userService)
  }

  @Query()
  users(): Promise<User[]> {
    return this.userService.find()
  }

  @Query()
  usersByEmail(@Args('email') email: string): Promise<User[]> {
    return this.userService.findByEmail(email)
  }

  @Query()
  currentUser(@Context("user") user: UserEntity): User {
    return user
  }

  @Mutation()
  loginUser(@Args('input') input: LoginInput): Promise<LoginResponse> {
    return this.userService.login(input)
  }

  @Mutation()
  requestEmailConfirm(@Args('input') i: RequestEmailConfirmInput): Promise<string> {
    return this.userService.requestEmailConfirm(i.email)
  }

  @Mutation()
  registerUser(@Args('input') i: RegisterUserInput): Promise<User> {
    return this.userService.registerUser(i)
  }

  @Mutation()
  createUser(@Context(GQL_CTX.USER) user: UserEntity, @Args('input') input: CreateUserInput): Promise<User> {
    return this.userService.create(input, user._id)
  }

  @Mutation()
  deleteUser(@Context(GQL_CTX.USER) user: UserEntity, @Args('input') input: DeleteUserInput): Promise<boolean> {
    return this.userService.deleteUser(input.ids, user._id)
  }

  @Mutation()
  changeUserPassword(@Context(GQL_CTX.USER) user: UserEntity, @Args('input') input: ChangePasswordInput): Promise<string> {
    return this.userService.changePassword(user, input)
  }

  @Mutation()
  updateAdmin(@Context(GQL_CTX.USER) user: UserEntity, @Args('input') inp: UpdateAdminInput): Promise<User> {
    return this.userService.updateAdmin(inp, user._id)
  }
}
