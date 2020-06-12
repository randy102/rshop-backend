import { INestApplication } from "@nestjs/common"
import {getTestAppModule} from '../../test/root.testmodule'

describe('Admin (e2e)', () => {
  let app: INestApplication

  beforeAll(async () => {
    app = await getTestAppModule()
    await app.init()
  });

  afterAll(async () => {
    await app.close()
  })

  it("")
})
