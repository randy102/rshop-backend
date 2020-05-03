import { Injectable } from '@nestjs/common';
import { Admin } from 'src/graphql.schema';
import { getMongoRepository, DeleteWriteOpResultObject, MongoRepository } from 'typeorm';
import AdminEntity from './admin.entity';
import RootService from '../root/root.service';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class AdminService extends RootService{
  constructor(@InjectRepository(AdminEntity) readonly repo: MongoRepository<AdminEntity>){ super(AdminEntity) }

  getAccount(_id: string){
    return getMongoRepository(AdminEntity).aggregate([
      {
        $match: { _id }
      }
    ]).toArray()
  }

  login(email: string, hashedPassword: string): Promise<Admin>{
    return getMongoRepository(AdminEntity).findOne({email, password: hashedPassword})
  }

}
