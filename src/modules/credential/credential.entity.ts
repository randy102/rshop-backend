import {Entity, Column, ObjectIdColumn} from "typeorm";
import {Expose, plainToClass} from "class-transformer";
import {uuid} from "src/utils/uuid";
import {RootEntity} from "../root/root.entity";

@Entity({ name: "Credential" })
export default class CredentialEntity extends RootEntity<CredentialEntity> {

  @Expose()
  @Column()
  email: string

  @Expose()
  @Column()
  password: string

  constructor(credential: Partial<CredentialEntity>) {
    super(credential, CredentialEntity)
    if (credential) {
      // Object.assign(this, plainToClass(CredentialEntity, credential, {excludeExtraneousValues: true}))
      // this._id = this._id || uuid()
    }
  }
}