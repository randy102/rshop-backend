import {Entity, Column} from "typeorm";
import {RootEntity} from "../root/root.entity";
import {Expose} from "class-transformer";

@Entity({ name: 'Contract' })
export class ContractEntity extends RootEntity<ContractEntity> {
  @Expose()
  @Column()
  idUser: string

  @Expose()
  @Column()
  idPlan: string

  @Expose()
  @Column()
  signDate: number

  constructor(contract: Partial<ContractEntity>) {
    super(contract, ContractEntity)
    if (contract) {
      this.signDate = this.signDate || this.createdAt
    }
  }
}