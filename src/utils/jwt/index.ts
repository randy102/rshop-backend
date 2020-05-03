import { sign as jwtSign, verify as jwtVerify } from 'jsonwebtoken'
import { AccountPayload } from './accountPayload'

export function sign(payload: AccountPayload, secret: string) {
  return jwtSign(payload, secret)
}

export async function verify(token: string, secret: string) {
  let result
  await jwtVerify(token, secret, (error, data: AccountPayload) => {
    if (error) result = undefined
    else result = data
  })
  return result
}