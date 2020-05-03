import { Entity, ObjectIdColumn, Column } from "typeorm";
import {Expose, plainToClass} from 'class-transformer'
import {v4 as uuidv4} from 'uuid'
import * as moment from 'moment'

@Entity({ name: 'Permission' })
export default class PermissionEntity {
  @Expose()
  @ObjectIdColumn()
  _id: string

  @Expose()
  @Column()
  name: string

  @Expose()
  @Column()
  description: string

  @Expose()
  @Column()
  createdAt: number
  
  @Expose()
  @Column()
  createdBy: string


  constructor(permission: Partial<PermissionEntity>){
    if(permission){
      Object.assign(this, plainToClass(PermissionEntity, permission, {excludeExtraneousValues: true}))

      this._id = this._id || uuidv4()
      this.createdAt = this.createdAt || moment().valueOf()
    }
  }
}