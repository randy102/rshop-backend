import { Expose } from "class-transformer";
import { Column, ObjectIdColumn, Entity } from "typeorm";

@Entity()
export class RootEntity{
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
}