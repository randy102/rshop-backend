import { AccountType } from "src/constants/account";

export interface AccountPayload{
  type: AccountType
  _id: string
}

export function generateAccountPayload(type: AccountType, _id: string): AccountPayload{
  return {
    type,
    _id
  }
}