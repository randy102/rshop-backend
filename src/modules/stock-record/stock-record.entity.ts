import {Entity, Column} from "typeorm";
import {RootEntity} from "../root/root.entity";
import {Expose} from "class-transformer";

@Entity({ name: 'StockRecord' })
export class StockRecordEntity extends RootEntity<StockRecordEntity> {
  @Column()
  @Expose()
  idStock: string

  @Column()
  @Expose()
  idStore: string

  @Column()
  @Expose()
  quantity: number

  constructor(plain: Partial<StockRecordEntity>) {
    super(plain, StockRecordEntity)
  }
}