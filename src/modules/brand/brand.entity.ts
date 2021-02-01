import {Entity, Column} from "typeorm";
import {RootEntity} from "../root/root.entity";
import {Expose} from "class-transformer";

@Entity({ name: 'Brand' })
export class BrandEntity extends RootEntity<BrandEntity> {
  @Column()
  @Expose()
  idShop: string

  @Column()
  @Expose()
  name: string

  @Column()
  @Expose()
  intro: string

  @Column()
  @Expose()
  img: string

  constructor(plain: Partial<BrandEntity>) {
    super(plain, BrandEntity)
  }
}