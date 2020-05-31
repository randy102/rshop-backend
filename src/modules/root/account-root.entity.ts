import { Expose } from "class-transformer";
import { Column } from "typeorm";

export class AccountRootEntity{
  @Expose()
  @Column()
  idCredential: string

  @Expose()
  @Column()
  idProfile: string
}