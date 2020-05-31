import { Expose } from "class-transformer";
import { Column, ObjectIdColumn } from "typeorm";

export class AccountRootEntity{
  @Expose()
  @ObjectIdColumn()
  _id: string

  @Expose()
  @Column()
  idCredential: string

  @Expose()
  @Column()
  idProfile: string

  @Expose()
  @Column()
  credentialHash: string

  @Expose()
  @Column()
  createdAt: number
  
  @Expose()
  @Column()
  createdBy: string
}