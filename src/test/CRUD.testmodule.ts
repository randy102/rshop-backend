import { INestApplication } from '@nestjs/common';
import { getTestAppModule, query, expectDuplicated, generateGqlQuery, expectCreatedExist, getToken, ACCOUNT } from "./root.testmodule";

export interface CRUDTestInput {
  subject: string
  fields: string
  createInput?: object
  updateInput?: object
  apply?: string[]
  afterCreate?: [string, (app: INestApplication, data: any, ID_A: string) => void]
  afterRead?: [string, (app: INestApplication, data: any[], ID_A: string) => void]
  afterUpdate?: [string, (app: INestApplication, data: any, ID_A: string, ID_B: string) => void]
  afterDelete?: [string, (app: INestApplication, ID_A: string, ID_B: string) => void]
}

export function CRUDTest({
  subject,
  fields,
  createInput = {},
  updateInput = {},
  apply = ['C', 'R', 'U', 'D'],
  afterCreate = ['', () => { }],
  afterRead = ['', () => { }],
  afterUpdate = ['', () => { }],
  afterDelete = ['', () => { }],
}: CRUDTestInput) {
  describe(`${subject} CURD Test`, () => {
    let app: INestApplication
    let adminToken: string

    let ID_A: string //First create
    let ID_B: string //Second create after update the first one

    let dataCreate: any
    let dataRead: any[]
    let dataUpdate: any

    const CREATE_FIELD = `create${subject}`
    const READ_FIELD = subject.toLowerCase() + 's'
    const UPDATE_FIELD = `update${subject}`
    const DELETE_FIELD = `delete${subject}`

    const gqlGet = generateGqlQuery('query', READ_FIELD, fields)
    const gqlCreate = generateGqlQuery('mutation', CREATE_FIELD, fields, createInput)
    const gqlUpdate = _id => generateGqlQuery('mutation', UPDATE_FIELD, fields, { ...updateInput, _id })
    const gqlDelete = (ids: string[]) => generateGqlQuery('mutation', DELETE_FIELD, '', { ids })

    beforeAll(async () => {
      app = await getTestAppModule()
      await app.init()

      adminToken = await getToken(app, ACCOUNT.ADMIN)
    });

    afterAll(async () => {
      await app.close()
    })

    if (apply.includes('C'))
      it(`Create ${subject}`, async () => {
        const { data } = await query(gqlCreate, CREATE_FIELD, app, adminToken)
        ID_A = data._id
        dataCreate = data

        expect(data).toMatchObject(createInput)

        const { error } = await query(gqlCreate, CREATE_FIELD, app, adminToken)
        expectDuplicated(error)
      })

    if (afterCreate[0])
      it(`Extra: ${afterCreate[0]}`, async () => {
        afterCreate[1](app, dataCreate, ID_A)
      })

    if (apply.includes('R'))
      it(`Read ${subject}`, async () => {
        const { data } = await query(gqlGet, READ_FIELD, app, adminToken)
        dataRead = data

        expectCreatedExist(data, createInput)
      });

    if (afterRead[0])
      it(`Extra: ${afterRead[0]}`, async () => {
        afterRead[1](app, dataRead, ID_A)
      })


    if (apply.includes('U'))
      it(`Update ${subject}`, async () => {
        const { data } = await query(gqlUpdate(ID_A), UPDATE_FIELD, app, adminToken)
        dataUpdate = data

        expect(data).toMatchObject(updateInput)

        // Recreate
        const { data: recreateData } = await query(gqlCreate, CREATE_FIELD, app, adminToken)
        ID_B = recreateData._id
        const { error } = await query(gqlUpdate(ID_B), UPDATE_FIELD, app, adminToken)
        expectDuplicated(error)
      })

    if (afterUpdate[0])
      it(`Extra: ${afterUpdate[0]}`, async () => {
        afterUpdate[1](app, dataUpdate, ID_A, ID_B)
      })

    if (apply.includes('D'))
      it(`Delete ${subject}`, async () => {
        await query(gqlDelete([ID_A, ID_B]), DELETE_FIELD, app, adminToken)

        const { data } = await query(gqlGet, READ_FIELD, app, adminToken)
        const oldExist = data.some(d => d._id === ID_A || d._id === ID_B)
        expect(oldExist).toEqual(false)
      })

    if (afterDelete[0])
      it(`Extra: ${afterDelete[0]}`, async () => {
        afterDelete[1](app, ID_A, ID_B)
      })

  });
}