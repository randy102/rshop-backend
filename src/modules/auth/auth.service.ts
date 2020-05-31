import { Injectable } from '@nestjs/common';
import { ACCOUNT_TYPE } from 'src/graphql.schema';
import { AdminService } from '../admin/admin.service';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly adminService: AdminService,
    private readonly userService: UserService
  ){}

  async getCurrentAccount(_id: string, type: ACCOUNT_TYPE): Promise<any>{
    if (type === ACCOUNT_TYPE.ADMIN){
      return this.adminService.findById(_id)
    }
    else if(type === ACCOUNT_TYPE.USER){
      return this.userService.findById(_id)
    }
    else{
      return undefined
    }
  }
}
