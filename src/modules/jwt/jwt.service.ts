import {sign as jwtSign, verify as jwtVerify} from 'jsonwebtoken'
import {Injectable} from '@nestjs/common';
import UserEntity from '../user/user.entity';

export interface AccountPayload {
  _id: string
  credentialHash?: string
}

@Injectable()
export class JwtService {
  sign(account: UserEntity) {
    const payload: AccountPayload = {
      _id: account._id,
      credentialHash: account.credentialHash
    }
    return jwtSign(payload, process.env.JWT_SECRET)
  }

  verify(token: string): Promise<AccountPayload> {
    return new Promise(resolve => {
      jwtVerify(token, process.env.JWT_SECRET, (error, data: AccountPayload) => {
        if (error) resolve(undefined)
        else resolve(data)
      })
    })
  }
}
