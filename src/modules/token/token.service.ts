import {Injectable} from '@nestjs/common';
import {getMongoRepository, getRepository} from 'typeorm';
import TokenEntity from './token.entity';
import {NotFoundError} from 'src/commons/exceptions/GqlException';

@Injectable()
export class TokenService {
  async generate(content: object): Promise<string> {
    const created = await getMongoRepository(TokenEntity).save(new TokenEntity(content))
    return created._id
  }

  async get(_id: string): Promise<any> {
    const existed = await getMongoRepository(TokenEntity).findOne({ _id })
    if (!existed) throw new NotFoundError('Token')

    await getRepository(TokenEntity).remove(existed)

    return JSON.parse(existed.content)
  }
}
