import { CRUDTest } from "src/test/CRUD.testmodule";
import { getToken } from "src/test/root.testmodule";

CRUDTest({
  subject: 'Admin',
  fields: '{_id, email, fullname}',
  createInput: {
    email: 'test@123',
    fullname: 'test'
  },
  updateInput: {
    email: 'edited@123',
    fullname: 'edited'
  },
  afterCreate: ['Admin Login', async (app) => {
    const token = await getToken(app, ['test@123', '12345678', 'loginAdmin'])
    expect(token).toBeDefined()
  }]
})