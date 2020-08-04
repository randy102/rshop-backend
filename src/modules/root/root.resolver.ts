import { UserService } from "../user/user.service";
import { ResolveField, Parent } from "@nestjs/graphql";
import { RootEntity } from "./root.entity";
import { User } from "src/graphql.schema";

export class RootResolver<E>{
  constructor(protected readonly userService: UserService){}

  @ResolveField()
  creator(@Parent() parent: RootEntity<E>): Promise<User>{
    return this.userService.findById(parent.createdBy)
  }

  @ResolveField()
  updater(@Parent() parent: RootEntity<E>): Promise<User>{
    return this.userService.findById(parent.updatedBy)
  }
}