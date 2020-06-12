import {MongoClient, Db} from 'mongodb'
import AdminEntity from 'src/modules/admin/admin.entity'

const client = new MongoClient('mongodb://localhost:27017', { useNewUrlParser: true })

export enum DBSeedTask {
  GEN_ADMIN,
  GEN_USER,
  GEN_CUSTOMER
}

export class TestDBSeed {
  private DB: Db

  constructor(private readonly Tasks: DBSeedTask[]) {}

  async run() {
    await client.connect()
    this.DB = client.db('rshop-test')

    for (let task of this.Tasks) {
      switch (task) {
        case DBSeedTask.GEN_ADMIN:
          this.beginAdmin
          break
        default:
          break
      }
    }
  }

  private beginAdmin() {
    
  }

  private endAdmin(){

  }

  cleanData() {

  }


}