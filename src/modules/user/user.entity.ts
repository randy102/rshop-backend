import { Entity, ObjectIdColumn, Column } from "typeorm";
import {Expose, plainToClass} from 'class-transformer'
import * as moment from 'moment'
import { uuid } from "src/utils/uuid";
import { AccountRootEntity } from "../root/account-root.entity";

@Entity({ name: 'User' })
export default class UserEntity extends AccountRootEntity{
  @Expose()
  @Column()
  isAdmin: boolean

  constructor(user: Partial<UserEntity>){
    super()

    if(user){
      Object.assign(this, plainToClass(UserEntity, user, {excludeExtraneousValues: true}))
      this._id = this._id || uuid()
      this.createdAt = this.createdAt || moment().valueOf()
    }
  }
}