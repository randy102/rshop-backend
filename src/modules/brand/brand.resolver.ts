import { Resolver, Query, ResolveProperty, ResolveField, Parent, Mutation, Args } from '@nestjs/graphql';
import { Brand, User } from 'src/graphql.schema';
import { BrandService } from './brand.service';
import { UserService } from '../user/user.service';
import { BrandEntity } from './brand.entity';

@Resolver('Brand')
export class BrandResolver {
  constructor(
    private readonly brandService: BrandService
  ){}

 
  @Query()
  brands(): Promise<Brand[]>{
    return this.brandService.find()
  }

  @Mutation()
  createBrand(@Args('name') name: string){
    return this.brandService.create(name)
  }

}
