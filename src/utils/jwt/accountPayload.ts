import { ACCOUNT_TYPE } from "src/graphql.schema";

export interface AccountPayload{
  type: ACCOUNT_TYPE
  _id: string
}

export function generateAccountPayload(type: ACCOUNT_TYPE, _id: string): AccountPayload{
  return {
    type,
    _id
  }
}