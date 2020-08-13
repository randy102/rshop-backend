import { Entity, Column } from "typeorm";
import { RootEntity } from "../root/root.entity";
import {TransferType} from 'src/graphql.schema'
import { Expose } from "class-transformer";

@Entity({name: 'StoreTransfer'})
export class StoreTransferEntity extends RootEntity<StoreTransferEntity>{
  @Expose()
  @Column()
  idSrc: string

  @Expose()
  @Column()
  idDes: string

  @Expose()
  @Column()
  type: TransferType

  @Expose()
  @Column()
  note: string
  
  constructor(plain: Partial<StoreTransferEntity>){
    super(plain, StoreTransferEntity)
  }
}
