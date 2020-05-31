import { Entity, ObjectIdColumn, Column } from "typeorm";
import {Expose, plainToClass} from 'class-transformer'
import * as moment from 'moment'
import { uuid } from "src/utils/uuid";
import { AccountRootEntity } from "../root/account-root.entity";

@Entity({ name: 'Admin' })
export default class AdminEntity extends AccountRootEntity{
  @Expose()
  @ObjectIdColumn()
  _id: string

  @Expose()
  @Column()
  credentialHash: string

  @Expose()
  @Column()
  createdAt: number
  
  @Expose()
  @Column()
  createdBy: string


  constructor(admin: Partial<AdminEntity>){
    super()

    if(admin){
      Object.assign(this, plainToClass(AdminEntity, admin, {excludeExtraneousValues: true}))
      this._id = this._id || uuid()
      this.createdAt = this.createdAt || moment().valueOf()
    }
  }
}