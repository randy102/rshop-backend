import { getMongoRepository, MongoRepository } from "typeorm"
import { DuplicateError, NotFoundError } from "src/commons/exceptions/GqlException"
import { RootEntity } from "./root.entity"

export default class RootService<E extends RootEntity>{
  protected readonly Entity: any
  protected readonly Name: string

  constructor(entity: any, name: string){
    this.Entity = entity
    this.Name = name
  }

  async findById(_id: string): Promise<E>{
    const result = await this.find({_id})
    return result[0]
  }

  find(query?): Promise<E[]>{
    return getMongoRepository<E>(this.Entity).find(query)
  }

  findOne(query?): Promise<E>{
    return getMongoRepository<E>(this.Entity).findOne(query)
  }

  save(entity: any): Promise<E>{
    return getMongoRepository<E>(this.Entity).save(entity)
  }

  async delete(ids: string[]): Promise<boolean>{
    const deleted = await getMongoRepository(this.Entity).deleteMany({_id: {$in: ids}})
    return !!deleted.result.ok
  }

  async checkDuplication(query: any, subject?: string): Promise<void>{
    const subjectStr = subject ? ` [${subject}]` : ''

    const existed = await this.findOne(query)
    if(existed) throw new DuplicateError(this.Name+subjectStr)
  }

  async checkExisted(query: any, subject: string): Promise<E>{
    const existed = await this.findOne(query)
    if(!existed) throw new NotFoundError(subject)
    return existed
  }

  checkExistedId(id: string): Promise<E>{
    return this.checkExisted({_id:id}, this.Name)
  }
}