import { join } from 'path'
import { GqlModuleOptions } from '@nestjs/graphql';
import { AuthError } from '../commons/exceptions/GqlException'
import { verify } from 'src/utils/jwt';
import schemaDirectives from '../commons/directives'
import { AdminService } from 'src/modules/admin/admin.service';
import { ACCOUNT_TYPE, PERMISSION } from 'src/graphql.schema';
import { UserService } from 'src/modules/user/user.service';

export default async function GqlConfigFactory(
  adminService: AdminService,
  userService: UserService
): Promise<GqlModuleOptions> {

  async function contextHandler({ req, connection }) {
    if (connection) {
      const { currentAccount } = connection.context.currentAccount
      return { currentAccount }
    }

    let accountType: ACCOUNT_TYPE
    let currentAccount = undefined
    let permissions: PERMISSION[]

    const token = req.headers['token']
    if(!token) return // If not have token

    const payload = await verify(token, process.env.JWT_SECRET)
    if(!payload) return // If verify failed
    
    const { type, _id } = payload
    if(!(type in ACCOUNT_TYPE)) return // If type is not in Account type

    accountType = type

    if (type === ACCOUNT_TYPE.ADMIN){
      currentAccount = await adminService.findById(_id)
    }
    else if(type === ACCOUNT_TYPE.USER){
      currentAccount = await userService.findById(_id)
    }
    else{
      currentAccount = undefined
    }
    
    if(!currentAccount) return // If account not found
    
    return {
      currentAccount,
      accountType,
      permissions
    }
  }

  return {
    typePaths: ['./**/*.gql'],
    context: contextHandler,
    definitions: {
      path: join(process.cwd(), 'src/graphql.ts'),
      outputAs: 'class',
    },
    schemaDirectives
  }

} 