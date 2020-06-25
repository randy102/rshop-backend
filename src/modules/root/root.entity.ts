import { Expose, plainToClass } from "class-transformer";
import { Column, ObjectIdColumn, Entity } from "typeorm";
import { uuid } from "src/utils/uuid";

@Entity()
export class RootEntity<E>{
  @Expose()
  @ObjectIdColumn()
  _id: string

  @Expose()
  @Column()
  createdAt: number
  
  @Expose()
  @Column()
  createdBy: string

  @Expose()
  @Column()
  updatedAt: number
  
  @Expose()
  @Column()
  updatedBy: string

  constructor(plain: Partial<E>, entity: any){
    if(entity){
      Object.assign(this, plainToClass<E, any>(entity, plain, {excludeExtraneousValues: true}))
      this._id = this._id || uuid()
    }
  }
}