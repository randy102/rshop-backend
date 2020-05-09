import { INestApplication } from "@nestjs/common";
import { TestingModule, Test } from "@nestjs/testing";
import { AppModule } from "src/app.module";
import * as request from 'supertest';
import LoggerConfigService from "src/configs/LoggerTestService";

const ACCOUNT = {
  'ADMIN': ['welldey102@gmail.com', '12345', 'adminLogin']
}

export async function getTestAppModule(): Promise<INestApplication> {
  const moduleFixture: TestingModule = await Test.createTestingModule({
    imports: [AppModule],
  }).compile()
  moduleFixture.useLogger(new LoggerConfigService())
  return moduleFixture.createNestApplication()
}

async function getTestLogin(app: INestApplication, [email, password, field]: string[]) {
  const res = await request(app.getHttpServer())
    .post('/graphql')
    .send({
      operationName: null,
      variables: {},
      query: `mutation { ${field}(input: {email: "${email}", password: "${password}"})}`
    })
  return res.body.data[field]
}

export async function getTestAdminToken(app: INestApplication) {
  return await getTestLogin(app, ACCOUNT.ADMIN)
}

export async function query(query: string, field: string, app: INestApplication, token: string) {
  const res = await request(app.getHttpServer())
    .post('/graphql')
    .set('token', token)
    .send({
      operationName: null,
      variables: {},
      query,
    })
    .expect(200)

  return { error: res.body.errors, data: res.body.data[field] }
}

//* Test */

export function expectDuplicated(error) {
  expect(error[0].message).toMatch(/Duplicated/)
}

export function expectNotFound(error) {
  expect(error[0].message).toMatch(/Not found/)
}

export function expectCreatedExist(data: any[], input: object) {
  expect(data.length).toEqual(1)
  expect(data[0]).toMatchObject(input)
}

//* Generator *//

export function generateInput(inputs: object) {
  const getVal = (val) => typeof val === 'string' ? `"${val}"` : `[${val.map(v => `"${v}"`)}]`
  return !inputs ? '' : '(input: {' + Object.keys(inputs).reduce((str, key) => str + `${key}:${getVal(inputs[key])},`, '') + '})'
}

export function generateGqlQuery(type: string, field: string, fields: string, inputs?: object) {
  return `${type} {${field + generateInput(inputs)} ${fields}}`
}
