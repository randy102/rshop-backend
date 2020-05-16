import { INestApplication } from "@nestjs/common"
import { getTestAppModule, query, generateGqlQuery, getToken, ACCOUNT, expectDuplicated, expectCreatedExist } from "./root.testmodule"
import { async } from "rxjs/internal/scheduler/async"

interface AccountTestInput{
  subject: string
  registerInput: object
  updateInput: object
  fields: string
}

export function AccountTest({
  subject,
  registerInput = {},
  updateInput = {},
  fields
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
    const gqlUpdate = _id => generateGqlQuery('mutation', UPDATE_FIELD, fields, {...updateInput, _id})

    beforeAll(async () => {
      app = await getTestAppModule()
      await app.init()

      adminToken = await getToken(app, ACCOUNT.ADMIN)
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

    it.only(`Read ${subject}`, async () => {
      const {data} = await query(gqlRead, READ_FIELD, app, adminToken)
      expectCreatedExist(data, registerInput)
    })

    it(`Login ${subject}`, async () => {
      const {data,error} = await query(gqlLogin, LOGIN_FIELD, app, '')
      console.log({error, gqlLogin})
      expect(data).toEqual(accountToken)
    })
  })
}