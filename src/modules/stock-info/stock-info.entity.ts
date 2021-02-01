import {Entity, Column} from "typeorm";
import {RootEntity} from "../root/root.entity";
import {Expose} from "class-transformer";

@Entity({ name: 'StockInfo' })
export class StockInfoEntity extends RootEntity<StockInfoEntity> {
  @Column()
  @Expose()
  idStock: string

  @Column()
  @Expose()
  long: number

  @Column()
  @Expose()
  width: number

  @Column()
  @Expose()
  height: number

  @Column()
  @Expose()
  weight: number

  constructor(plain: Partial<StockInfoEntity>) {
    super(plain, StockInfoEntity)
  }
}