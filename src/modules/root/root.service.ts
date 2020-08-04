import { getMongoRepository, MongoRepository, ObjectLiteral } from "typeorm"
import { DuplicateError, NotFoundError } from "src/commons/exceptions/GqlException"
import { RootEntity } from "./root.entity"

export default class RootService<E extends RootEntity<E>>{
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

  save(plain: Partial<E>): Promise<E>{
    return getMongoRepository<E>(this.Entity).save(new this.Entity(plain))
  }

  async delete(ids: string[]): Promise<boolean>{
    const deleted = await getMongoRepository(this.Entity).deleteMany({_id: {$in: ids}})
    return !!deleted.result.ok
  }

  async checkDuplication(query: any, subject?: string): Promise<void>{
    const existed = await this.findOne(query)
    if(existed) throw new DuplicateError(subject || this.Name)
  }

  async checkExisted(query: any, subject?: string): Promise<E>{
    const existed = await this.findOne(query)
    if(!existed) throw new NotFoundError(subject || this.Name)
    return existed
  }

  checkExistedId(_id: string): Promise<E>{
    return this.checkExisted({_id}, this.Name)
  }

  async checkExistedIds(ids: string[]): Promise<E[]>{
    let rows: E[]
    for(let i=0; i<ids.length; i++){
      const existed = await this.findById(ids[i])
      if(!existed) throw new NotFoundError(this.Name)
      rows.push(existed)
    }
    return rows
  }

  aggregate(pipe: ObjectLiteral[]): Promise<any[]>{
    return getMongoRepository<E>(this.Entity).aggregate(pipe).toArray()
  }
}