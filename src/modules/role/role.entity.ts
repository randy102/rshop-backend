import { Entity, Column } from "typeorm";
import { RootEntity } from "../root/root.entity";
import { Expose } from "class-transformer";

@Entity({name: 'Role'})
export class RoleEntity extends RootEntity<RoleEntity>{
  @Expose()
  @Column()
  idShop: string

  @Expose()
  @Column()
  idUser: string

  @Expose()
  @Column()
  idPermissions: string[]

  @Expose()
  @Column()
  name: string

  @Expose()
  @Column()
  isMaster: boolean

  @Expose()
  @Column()
  description: string

  constructor(role: Partial<RoleEntity>) {
    super(role, RoleEntity)
    if(role){
      this.isMaster = this.isMaster || false
    }
  }
}