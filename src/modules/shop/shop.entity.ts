import {RootEntity} from "../root/root.entity";
import {Expose} from "class-transformer";
import {Column, Entity} from "typeorm";

@Entity({ name: 'Shop' })
export class ShopEntity extends RootEntity<ShopEntity> {
  @Expose()
  @Column()
  idTemplate: string

  @Expose()
  @Column()
  name: string

  @Expose()
  @Column()
  domain: string

  @Expose()
  @Column()
  isActive: boolean

  @Expose()
  @Column()
  brandImg: string

  constructor(shop: Partial<ShopEntity>) {
    super(shop, ShopEntity)
    if (shop) {
      this.isActive = this.isActive === undefined ? true : this.isActive
      this.brandImg = this.brandImg || process.env.S3_DEFAULT_BRAND
    }
  }
}