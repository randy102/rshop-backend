import { getMongoRepository, MongoRepository } from "typeorm"

export default class RootService{
  private readonly Entity

  constructor(entity){
    this.Entity = entity
  }

  findById(_id: string){
    return getMongoRepository(this.Entity).findOne({_id})
  }

  find(query?){
    return getMongoRepository(this.Entity).find(query)
  }

  findOne(query?){
    return getMongoRepository(this.Entity).findOne(query)
  }

  save(entity: object){
    return getMongoRepository(this.Entity).save(new this.Entity(entity))
  }

  delete(ids: string[]){
    return getMongoRepository(this.Entity).deleteMany({_id: {$in: ids}})
  }
}