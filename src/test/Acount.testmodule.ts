import { INestApplication } from "@nestjs/common"
import { getTestAppModule, query, generateGqlQuery, getToken, ACCOUNT_DATA, expectDuplicated, expectCreatedExist } from "./root.testmodule"
import { ACCOUNT_TYPE } from "src/graphql.schema"


interface AccountTestInput{
  subject: string
  registerInput: object
  updateInput: object
  fields: string
  admin: string
}

export function AccountTest({
  subject,
  registerInput = {},
  updateInput = {},
  fields,
  admin = ACCOUNT_TYPE.ADMIN
}: AccountTestInput){
  describe(`${subject} Account Test`, () => {
    let app: INestApplication
    let accountToken: string
    let adminToken: string

    const REGISTER_FIELD = `register${subject}`
    const LOGIN_FIELD = `login${subject}`
    const READ_FIELD = subject.toLowerCase() + 's'
    const UPDATE_FIELD = `update${subject}`

    const gqlRegister = generateGqlQuery('mutation',REGISTER_FIELD, '', registerInput)
    const gqlLogin = generateGqlQuery('mutation', LOGIN_FIELD, '', {email: registerInput['email'], password: registerInput['password']})
    const gqlRead = generateGqlQuery('query',READ_FIELD,fields)
    const gqlUpdate = generateGqlQuery('mutation', UPDATE_FIELD, fields, updateInput)

    beforeAll(async () => {
      app = await getTestAppModule()
      await app.init()

      adminToken = await getToken(app, ACCOUNT_DATA[admin])
    });

    afterAll(async () => {
      await app.close()
    })
    
    it(`Register ${subject}`, async () => {
      const {data} = await query(gqlRegister, REGISTER_FIELD, app, '')
      accountToken = data
      expect(data).not.toBeFalsy()

      // Re-register
      const {data: reCreateData, error} = await query(gqlRegister, REGISTER_FIELD, app, '')
      expectDuplicated(error)
    })

    it(`Read ${subject}`, async () => {
      const {data} = await query(gqlRead, READ_FIELD, app, adminToken)
      expectCreatedExist(data, registerInput)
    })

    it(`Login ${subject}`, async () => {
      const {data} = await query(gqlLogin, LOGIN_FIELD, app, '')
      expect(data).toEqual(accountToken)
    })

    it(`Update ${subject}`, async () => {
      const {data} = await query(gqlUpdate, UPDATE_FIELD, app, accountToken)
      expect(data).toMatchObject(updateInput)
    })
  })
}