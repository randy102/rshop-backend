import { Injectable } from '@nestjs/common';
import PermissionEntity from './permission.entity';
import RootService from '../root/root.service';
import { Permission, CreatePermissionInput, UpdatePermissionInput } from 'src/graphql.schema';


@Injectable()
export class PermissionService extends RootService<PermissionEntity> {
  constructor() { super(PermissionEntity, 'Permission') }

  async create(input: CreatePermissionInput, createdBy: string) {
    await this.checkDuplication({ name: input.name })

    return this.save(new PermissionEntity({
      ...input,
      createdBy
    }))
  }

  async update(input: UpdatePermissionInput) {
    const existed: Permission = await this.checkExistedId(input._id)

    await this.checkDuplication({ name: input.name, _id: { $ne: input._id } })

    return this.save(new PermissionEntity({
      ...existed,
      ...input
    }))

  }
}
