import { Injectable } from '@nestjs/common';
import PermissionEntity from './permission.entity';
import RootService from '../root/root.service';
import { Permission } from 'src/graphql.schema';


@Injectable()
export class PermissionService extends RootService {
  constructor() { super(PermissionEntity, 'Permission') }

  async create(input, createdBy: string) {
    await this.checkDuplication({ name: input.name })

    return this.save({
      ...input,
      createdBy
    })
  }

  async update(input) {
    const existed: Permission = await this.checkExistedId(input._id)

    await this.checkDuplication({ name: input.name, _id: { $ne: input._id } })

    return this.save({
      ...existed,
      ...input
    })

  }
}
