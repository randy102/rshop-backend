import { Resolver, Query, Mutation, Args, Context } from '@nestjs/graphql';
import { UserService } from './user.service';
import { User, LoginUserInput, RegisterUserInput, UpdateUserInput, DeleteUserInput, ConfirmUserEmailInput } from 'src/graphql.schema';
import UserEntity from './user.entity';

@Resolver('User')
export class UserResolver {
  constructor(private readonly userService: UserService) { }

  @Query()
  users(): Promise<User[]> {
    return this.userService.find()
  }

  @Mutation()
  loginUser(@Args('input') input: LoginUserInput): Promise<string> {
    return this.userService.login(input)
  }

  @Mutation()
  confirmUserEmail(@Args('input') input: ConfirmUserEmailInput){
    return this.userService.confirmEmail(input.email)
  }

  @Mutation()
  registerUser(@Args('input') input: RegisterUserInput): Promise<string> {
    return this.userService.register(input)
  }

  @Mutation()
  updateUser(@Context('currentAccount') user: UserEntity, @Args('input') input: UpdateUserInput): Promise<User> {
    return this.userService.update(user._id, input)
  }

  @Mutation()
  deleteUser(@Args('input') input: DeleteUserInput): Promise<boolean>{
    return this.userService.delete(input.ids)
  }
}
