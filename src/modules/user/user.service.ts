import { Injectable } from '@nestjs/common';
import RootService from '../root/root.service';
import UserEntity from './user.entity';
import { User, ACCOUNT_TYPE } from 'src/graphql.schema';
import { getMongoRepository } from 'typeorm';
import md5 = require('md5');
import { LoginError } from 'src/commons/exceptions/GqlException';
import { sign } from 'src/utils/jwt';
import { generateAccountPayload } from 'src/utils/jwt/accountPayload';
import moment = require('moment')

@Injectable()
export class UserService extends RootService {
  constructor() { super(UserEntity, 'User') }

  async login({ email, password }): Promise<string> {
    const user: User = await this.findOne({ email, password: md5(password) })
    if (!user) throw new LoginError()

    const jwt = sign(generateAccountPayload(ACCOUNT_TYPE.USER, user._id), process.env.JWT_SECRET)
    return jwt
  }

  async register(input) {
    await this.checkDuplication({ email: input.email })

    const created = await this.save({
      ...input,
      password: md5(input.password),
      createdAt: moment().valueOf()
    })

    const jwt = sign(generateAccountPayload(ACCOUNT_TYPE.USER, created._id), process.env.JWT_SECRET)
    return jwt
  }

  async update(_id,input) {
    const existed: User = await this.checkExistedId(_id)

    await this.checkDuplication({ email: input.email, _id: { $ne: _id } })

    return this.save({
      ...existed,
      ...input
    })
  }
}
