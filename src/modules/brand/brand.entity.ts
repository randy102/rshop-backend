import { Entity, Column } from "typeorm";
import { RootEntity } from "../root/root.entity";
import { Expose } from "class-transformer";

@Entity({name: 'Brand'})
export class BrandEntity extends RootEntity<BrandEntity>{
  @Column()
  @Expose()
  name: string

  constructor(plain: Partial<BrandEntity>){
    super(plain, BrandEntity)
  }
}