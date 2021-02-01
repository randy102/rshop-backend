import {Entity, ObjectIdColumn, Column} from "typeorm";
import {Expose} from 'class-transformer'
import {RootEntity} from "../root/root.entity";

@Entity({ name: 'Permission' })
export default class PermissionEntity extends RootEntity<PermissionEntity> {
  @Expose()
  @ObjectIdColumn()
  _id: string

  @Expose()
  @Column()
  name: string

  @Expose()
  @Column()
  description: string

  constructor(permission: Partial<PermissionEntity>) {
    super(permission, PermissionEntity)

  }
}