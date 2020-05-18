import { Entity, ObjectIdColumn, Column } from "typeorm";
import { Expose } from "class-transformer";
import {v4 as uuidv4} from 'uuid'

@Entity({name: 'Token'})
export default class TokenEntity{
  @ObjectIdColumn()
  _id: string

  @Expose()
  @Column()
  content: string

  constructor(content: object){
    if(content){
      this._id = uuidv4()
      this.content = JSON.stringify(content)
    }
  }
}