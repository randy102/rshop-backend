import {ProfileService} from "../profile/profile.service";
import {CredentialService} from "../credential/credential.service";
import {ResolveField, Parent} from "@nestjs/graphql";
import {AccountRootEntity} from "./account-root.entity";
import {RootResolver} from "./root.resolver";
import {UserService} from "../user/user.service";

export class AccountRootResolver<E> extends RootResolver<E> {
  constructor(
    protected readonly profileService: ProfileService,
    protected readonly credentialService: CredentialService,
    protected readonly userService: UserService
  ) {
    super(userService)
  }

  @ResolveField()
  profile(@Parent() admin: AccountRootEntity<E>) {
    return this.profileService.findById(admin.idProfile)
  }

  @ResolveField()
  credential(@Parent() admin: AccountRootEntity<E>) {
    return this.credentialService.findById(admin.idCredential)
  }
}