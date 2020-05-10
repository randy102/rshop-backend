import { CRUDTest } from "src/test/CRUD.testmodule";

CRUDTest({
  subject: 'Permission',
  fields: '{_id, name, description}',
  createInput: {
    name: 'test',
    description: 'test'
  },
  updateInput: {
    name: 'edited',
    description: 'edited'
  }
})
