import { getMongoRepository, MongoRepository } from "typeorm"
import { DuplicateError, NotFoundError } from "src/commons/exceptions/GqlException"

export default class RootService{
  private readonly Entity
  private readonly Name

  constructor(entity, name: string){
    this.Entity = entity
    this.Name = name
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

  save(entity: any){
    return getMongoRepository(this.Entity).save(entity)
  }

  async delete(ids: string[]): Promise<boolean>{
    const deleted = await getMongoRepository(this.Entity).deleteMany({_id: {$in: ids}})
    return !!deleted
  }

  async checkDuplication(query: any, subject?: string): Promise<void>{
    const subjectStr = subject ? ` [${subject}]` : ''

    const existed = await this.findOne(query)
    if(existed) throw new DuplicateError(this.Name+subjectStr)
  }

  async checkExistedId(id: string){
    const existed = await this.findById(id)
    if(!existed) throw new NotFoundError(this.Name)
    return existed
  }
}