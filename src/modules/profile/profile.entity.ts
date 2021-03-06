import {Entity, ObjectIdColumn, Column} from "typeorm";
import {Expose, plainToClass} from "class-transformer";
import {uuid} from "src/utils/uuid";
import {RootEntity} from "../root/root.entity";

@Entity({ name: 'Profile' })
export default class ProfileEntity extends RootEntity<ProfileEntity> {

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


  constructor(profile: Partial<ProfileEntity>) {
    super(profile, ProfileEntity)
    if (profile) {
      this.avatar = this.avatar || process.env.S3_DEFAULT_AVATAR
    }
  }
}