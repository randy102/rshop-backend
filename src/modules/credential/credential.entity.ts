import { Entity, Column, ObjectIdColumn } from "typeorm";
import { Expose, plainToClass } from "class-transformer";
import { uuid } from "src/utils/uuid";

@Entity({name: "Credential"})
export default class CredentialEntity{
  @Expose()
  @ObjectIdColumn()
  _id: string

  @Expose()
  @Column()
  email: string

  @Expose()
  @Column()
  password: string

  @Expose()
  @Column()
  updatedAt: number

  constructor(credential: Partial<CredentialEntity>){
    if(credential){
      Object.assign(this, plainToClass(CredentialEntity, credential, {excludeExtraneousValues: true}))
      this._id = this._id || uuid()
    }
  }
}