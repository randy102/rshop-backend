import { Entity, ObjectIdColumn, Column } from "typeorm";
import {Expose, plainToClass} from 'class-transformer'
import {v4 as uuidv4} from 'uuid'
import * as moment from 'moment'
import { AccountRootEntity } from "../root/account-root.entity";

@Entity({ name: 'User' })
export default class UserEntity extends AccountRootEntity{
  
  @Expose()
  @Column()
  email: string

  @Expose()
  @Column()
  password: string

  @Expose()
  @Column()
  fullname: string

  @Expose()
  @Column()
  phone: string

  @Expose()
  @Column()
  address: string


  constructor(plain: Partial<UserEntity>){
    super()
    if(plain){
      Object.assign(this, plainToClass(UserEntity, plain, {excludeExtraneousValues: true}))

      this._id = this._id || uuidv4()
      this.createdAt = this.createdAt || moment().valueOf()
    }
  }
}