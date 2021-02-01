import {RootEntity} from "../root/root.entity";
import {Entity, Column} from "typeorm";
import {Expose} from "class-transformer";

@Entity({ name: 'StoreTransferItem' })
export class TransferItemEntity extends RootEntity<TransferItemEntity> {
  @Expose()
  @Column()
  idStoreTransfer: string

  @Expose()
  @Column()
  idStock: string

  @Expose()
  @Column()
  quantity: number

  constructor(plain: Partial<TransferItemEntity>) {
    super(plain, TransferItemEntity)
  }
}