import { Injectable } from '@nestjs/common';
import md5 = require('md5');
import { uuid } from 'src/utils/uuid';

@Injectable()
export class HashService {
  private limit(hashed: string, limit: number) {
    return limit ? hashed.slice(0, limit) : hashed
  }

  create(subject: string, size?: number) {
    return this.limit(md5(subject), size)
  }

  rand(size?: number) {
    return this.limit(md5(uuid()), size)
  }
}
