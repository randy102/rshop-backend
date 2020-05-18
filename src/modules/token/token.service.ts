import { Injectable } from '@nestjs/common';
import { getMongoRepository } from 'typeorm';
import TokenEntity from './token.entity';
import { NotFoundError } from 'src/commons/exceptions/GqlException';

@Injectable()
export class TokenService {
  async generate(content: object): Promise<string>{
    const created = await getMongoRepository(TokenEntity).save(new TokenEntity(content))
    return created._id
  }

  async get(_id: string): Promise<object>{
    const existed = await getMongoRepository(TokenEntity).findOne({_id})
    if(!existed) throw new NotFoundError('Token')

    return JSON.parse(existed.content)
  }
}
