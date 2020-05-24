import { Injectable } from '@nestjs/common';
import { Admin, ACCOUNT_TYPE, CreateAdminInput, UpdateAdminInput } from 'src/graphql.schema';
import AdminEntity from './admin.entity';
import RootService from '../root/root.service';
import md5 = require('md5');
import { LoginError } from 'src/commons/exceptions/GqlException';
import { JwtService } from '../jwt/jwt.service';


@Injectable()
export class AdminService extends RootService {
  constructor(private readonly jwtService: JwtService) { super(AdminEntity, 'Admin') }

  async login({ email, password }): Promise<string> {
    const admin: Admin = await this.findOne({ email, password: md5(password) })
    if (!admin) throw new LoginError()

    return this.jwtService.sign(ACCOUNT_TYPE.ADMIN, admin._id)
  }

  async create(input: CreateAdminInput, createdBy: string) {
    await this.checkDuplication({ email: input.email })

    return this.save(new AdminEntity({
      ...input,
      password: md5('12345678'),
      createdBy
    }));
  }

  async update(input: UpdateAdminInput) {
    const existed: Admin = await this.checkExistedId(input._id)

    await this.checkDuplication({ email: input.email, _id: { $ne: input._id } })

    return this.save(new AdminEntity({
      ...existed,
      ...input
    }))
  }
}
