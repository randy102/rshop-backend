import { Entity, Column } from "typeorm";
import { RootEntity } from "../root/root.entity";
import { Expose } from "class-transformer";

@Entity({name: 'Stock'})
export class StockEntity extends RootEntity<StockEntity>{
  @Column()
  @Expose()
  idProduct: string

  @Column()
  @Expose()
  name: string

  @Column()
  @Expose()
  salePrice: number

  @Column()
  @Expose()
  imgs: string[]
  
  constructor(plain: Partial<StockEntity>){
    super(plain, StockEntity)
  }
}