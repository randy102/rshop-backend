import { CRUDTest } from "src/test/CRUD.testmodule";
import { getToken, query, expectCreatedExist } from "src/test/root.testmodule";
import { AccountTest } from "src/test/Acount.testmodule";

AccountTest({
  subject: 'User',
  fields: '{_id, email, fullname, phone, address}',
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