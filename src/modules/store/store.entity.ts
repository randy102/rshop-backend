import {Entity, Column} from "typeorm";
import {RootEntity} from "../root/root.entity";
import {Expose} from "class-transformer";

@Entity({ name: 'Store' })
export class StoreEntity extends RootEntity<StoreEntity> {

  @Column()
  @Expose()
  idShop: string

  @Column()
  @Expose()
  name: string

  @Column()
  @Expose()
  address: string

  constructor(plain: Partial<StoreEntity>) {
    super(plain, StoreEntity)
  }
}