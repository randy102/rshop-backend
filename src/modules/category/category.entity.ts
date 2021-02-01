import {Entity, Column} from "typeorm";
import {RootEntity} from "../root/root.entity";
import {Expose} from "class-transformer";

@Entity({ name: 'Category' })
export class CategoryEntity extends RootEntity<CategoryEntity> {
  @Column()
  @Expose()
  name: string

  @Column()
  @Expose()
  idParent: string

  @Column()
  @Expose()
  idShop: string

  constructor(plain: Partial<CategoryEntity>) {
    super(plain, CategoryEntity)
  }
}