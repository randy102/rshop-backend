import { Entity, Column } from "typeorm";
import { RootEntity } from "../root/root.entity";
import { Expose } from "class-transformer";

@Entity({name: 'Template'})
export class TemplateEntity extends RootEntity<TemplateEntity>{
  @Expose()
  @Column()
  name: string

  @Expose()
  @Column()
  code: string

  @Expose()
  @Column()
  isActive: boolean

  @Expose()
  @Column()
  demoImg: string

  constructor(tem: Partial<TemplateEntity>){
    super(tem, TemplateEntity)
  }
}