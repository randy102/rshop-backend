import { Entity, ObjectIdColumn, Column } from "typeorm";
import {Expose, plainToClass} from 'class-transformer'
import {v4 as uuidv4} from 'uuid'
import * as moment from 'moment'

@Entity({ name: 'User' })
export default class UserEntity {
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
  fullname: string

  @Expose()
  @Column()
  phone: string

  @Expose()
  @Column()
  address: string

  @Expose()
  @Column()
  createdAt: number
  
  @Expose()
  @Column()
  createdBy: string


  constructor(plain: Partial<UserEntity>){
    if(plain){
      Object.assign(this, plainToClass(UserEntity, plain, {excludeExtraneousValues: true}))

      this._id = this._id || uuidv4()
      this.createdAt = this.createdAt || moment().valueOf()
    }
  }
}