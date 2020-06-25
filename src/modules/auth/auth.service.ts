import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import {CredentialError} from 'src/commons/exceptions/GqlException'
import UserEntity from '../user/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService
  ){}

  getCurrentAccount(_id: string): Promise<UserEntity>{
   return this.userService.findById(_id)
  }

  checkCredentialHash(tokenHash: string, accountHash: string){
    if(tokenHash !== accountHash)
      throw new CredentialError()
  }
}
