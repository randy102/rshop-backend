import { Injectable } from '@nestjs/common';
import { Admin, ACCOUNT_TYPE } from 'src/graphql.schema';
import { getMongoRepository } from 'typeorm';
import AdminEntity from './admin.entity';
import RootService from '../root/root.service';
import md5 = require('md5');
import { LoginError } from 'src/commons/exceptions/GqlException';
import { sign } from 'src/utils/jwt';
import { generateAccountPayload } from 'src/utils/jwt/accountPayload';


@Injectable()
export class AdminService extends RootService{
  constructor(){ super(AdminEntity, 'Admin') }

  async login({email, password}): Promise<string>{
    const admin: Admin = await this.findOne({email, password: md5(password)})
    if(!admin) throw new LoginError()

    return sign(generateAccountPayload(ACCOUNT_TYPE.ADMIN, admin._id), process.env.JWT_SECRET)
  }

  async create(input,createdBy: string){
    await this.checkDuplication({email: input.email})
    
    return this.save({
      ...input,
      password: md5('12345678'),
      createdBy
    });
  }

  async update(input){
    const existed: Admin = await this.checkExistedId(input._id)

    await this.checkDuplication({email: input.email, _id: {$ne: input._id}})
    
    return this.save({
      ...existed,
      ...input
    })
  }
}
