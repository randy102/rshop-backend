import { Entity, ObjectIdColumn, Column } from "typeorm";
import { Expose, plainToClass } from "class-transformer";
import { uuid } from "src/utils/uuid";

@Entity({name: 'Profile'})
export default class ProfileEntity{
  @Expose()
  @ObjectIdColumn()
  _id: string

  @Expose()
  @Column()
  avatar: string

  @Expose()
  @Column()
  fullName: string

  @Expose()
  @Column()
  dob: number

  @Expose()
  @Column()
  address: string

  @Expose()
  @Column()
  phone: string

  @Expose()
  @Column()
  updatedAt: number
  
  constructor(profile: Partial<ProfileEntity>){
    if(profile){
      Object.assign(this, plainToClass(ProfileEntity, profile, {excludeExtraneousValues: true}))

      this._id = this._id || uuid()
    }
  }
}