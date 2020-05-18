import { AccountTest } from "src/test/Acount.testmodule";
import { ACCOUNT_TYPE } from "src/graphql.schema";

AccountTest({
  subject: 'User',
  fields: '{_id, email, fullname, phone, address}',
  admin: ACCOUNT_TYPE.ADMIN,
  registerInput: {
    email: 'test@123',
    fullname: 'test',
    password: '12345'
  },
  updateInput: {
    fullname: 'edited',
    phone: '012345',
    address: 'test'
  }
})