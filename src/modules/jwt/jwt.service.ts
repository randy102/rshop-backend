import { sign as jwtSign, verify as jwtVerify } from 'jsonwebtoken'
import { Injectable } from '@nestjs/common';
import { ACCOUNT_TYPE } from 'src/graphql.schema';
import { AccountRootEntity } from '../root/account-root.entity';

interface AccountPayload{
  type: ACCOUNT_TYPE
  _id: string
  credentialHash?: string
}

@Injectable()
export class JwtService {
  sign(type: ACCOUNT_TYPE, account: AccountRootEntity) {
    const payload: AccountPayload = {
      _id: account._id,
      type,
      credentialHash: account.credentialHash
    }
    return jwtSign(payload, process.env.JWT_SECRET)
  }

  async verify(token: string): Promise<AccountPayload> {
    let result
    await jwtVerify(token, process.env.JWT_SECRET, (error, data: AccountPayload) => {
      if (error) result = undefined
      else result = data
    })
    return result
  }
}
