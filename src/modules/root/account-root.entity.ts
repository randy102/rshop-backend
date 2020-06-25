import { Expose } from "class-transformer";
import { Column, ObjectIdColumn } from "typeorm";
import { RootEntity } from "./root.entity";

export class AccountRootEntity<E> extends RootEntity<E>{
  @Expose()
  @Column()
  idCredential: string

  @Expose()
  @Column()
  idProfile: string

  @Expose()
  @Column()
  credentialHash: string
}