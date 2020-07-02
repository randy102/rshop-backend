import { Entity, Column } from "typeorm";
import { RootEntity } from "../root/root.entity";
import { Expose } from "class-transformer";
import { PlanState } from "src/graphql.schema";

@Entity({name: 'Plan'})
export class PlanEntity extends RootEntity<PlanEntity>{
  @Expose()
  @Column()
  name: string

  @Expose()
  @Column()
  duration: number

  @Expose()
  @Column()
  price: number

  @Expose()
  @Column()
  numShop: number

  @Expose()
  @Column()
  state: PlanState

  @Expose()
  @Column()
  description: string

  constructor(plan: Partial<PlanEntity>){
    super(plan, PlanEntity)
    if(plan){
      this.state = this.state || PlanState.DRAFT
    }
  }
}
