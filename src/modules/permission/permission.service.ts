import { Injectable } from '@nestjs/common';
import { Permission } from 'src/graphql.schema';
import PermissionEntity from './permission.entity';
import { getMongoRepository, DeleteWriteOpResultObject, MongoRepository } from 'typeorm';
import RootService from '../root/root.service';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class PermissionService extends RootService {
  constructor(@InjectRepository(PermissionEntity) readonly repo: MongoRepository<PermissionEntity>){ super(PermissionEntity) }
  
}
