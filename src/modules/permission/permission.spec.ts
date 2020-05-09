import { INestApplication } from '@nestjs/common';
import { getTestAppModule, getTestAdminToken, query, expectDuplicated, generateInput, generateGqlQuery, expectCreatedExist } from '../root/rootSpec';

describe('Permission Module', () => {
  let app: INestApplication
  let token: string
  let _id: string
  let _id1: string

  const fields = '{_id, name, description}'

  const createInput = {
    name: 'test',
    description: 'test'
  }

  const updateInput = {
    name: 'edited',
    description: 'edited'
  }

  const gqlGet = generateGqlQuery('query', 'permissions', fields)
  const gqlCreate = generateGqlQuery('mutation', 'createPermission', fields, createInput)
  const gqlUpdate = (_id) => generateGqlQuery('mutation', 'updatePermission', fields, {...updateInput, _id})
  const gqlDelete = (ids: string[]) => generateGqlQuery('mutation', 'deletePermission', '', {ids})

  beforeAll(async () => {
    app = await getTestAppModule()
    await app.init()

    token = await getTestAdminToken(app)
  });

  afterAll(async () => {
    await app.close()
  })


  it('Create Permissions', async () => {
    const { data } = await query(gqlCreate, 'createPermission', app, token)
    _id = data._id
    expect(data).toMatchObject(createInput)

    const { error } = await query(gqlCreate, 'createPermission', app, token)
    expectDuplicated(error)
  })


  it('Get Permissions', async () => {
    const { data } = await query(gqlGet, 'permissions', app, token)
    expectCreatedExist(data, createInput)
  });

  it('Update Permission', async () => {
    const { data } = await query(gqlUpdate(_id), 'updatePermission', app, token)
    expect(data).toMatchObject(updateInput)

    // Recreate
    const {data: recreateData} = await query(gqlCreate, 'createPermission', app, token)
    _id1 = recreateData._id
    const { error } = await query(gqlUpdate(_id1), 'updatePermission', app, token)
    expectDuplicated(error)
  })

  it('Delete Permission', async () => {
    const {error} = await query(gqlDelete([_id, _id1]), 'deletePermission', app, token)
    console.log(gqlDelete([_id, _id1]))
    const { data } = await query(gqlGet, 'permissions', app, token)
    expect(data.length).toEqual(0)
  })

});