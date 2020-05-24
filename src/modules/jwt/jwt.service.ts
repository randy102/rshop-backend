import { sign as jwtSign, verify as jwtVerify } from 'jsonwebtoken'
import { Injectable } from '@nestjs/common';
import { ACCOUNT_TYPE } from 'src/graphql.schema';

@Injectable()
export class JwtService {
  sign(type: ACCOUNT_TYPE, _id: string) {
    return jwtSign(this.generateAccountPayload(type,_id), process.env.JWT_SECRET)
  }

  async verify(token: string) {
    let result
    await jwtVerify(token, process.env.JWT_SECRET, (error, data: AccountPayload) => {
      if (error) result = undefined
      else result = data
    })
    return result
  }

  private generateAccountPayload(type: ACCOUNT_TYPE, _id: string): AccountPayload{
    return {
      type,
      _id
    }
  }
}

interface AccountPayload{
  type: ACCOUNT_TYPE
  _id: string
}