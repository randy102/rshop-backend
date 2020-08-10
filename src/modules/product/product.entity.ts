import { Entity, Column } from "typeorm";
import { RootEntity } from "../root/root.entity";
import { Expose } from "class-transformer";

@Entity({name: 'Product'})
export class ProductEntity extends RootEntity<ProductEntity>{
  @Column()
  @Expose()
  idShop: string

  @Column()
  @Expose()
  idCategory: string

  @Column()
  @Expose()
  idBrand: string

  @Column()
  @Expose()
  isActive: boolean

  @Column()
  @Expose()
  name: string

  @Column()
  @Expose()
  description: string
  
  constructor(plain: Partial<ProductEntity>){
    super(plain,ProductEntity)
  }
}