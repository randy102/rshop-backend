import { ProfileService } from "../profile/profile.service";
import { CredentialService } from "../credential/credential.service";
import { ResolveField, Parent } from "@nestjs/graphql";
import { AccountRootEntity } from "./account-root.entity";

export class AccountRootResolver<E> {
  constructor(
    protected readonly profileService: ProfileService,
    protected readonly credentialService: CredentialService
  ) { }

  @ResolveField()
  profile(@Parent() admin: AccountRootEntity<E>) {
    return this.profileService.findById(admin.idProfile)
  }

  @ResolveField()
  credential(@Parent() admin: AccountRootEntity<E>) {
    return this.credentialService.findById(admin.idCredential)
  }
}