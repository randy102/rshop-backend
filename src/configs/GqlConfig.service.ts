import { join } from 'path'
import { GqlModuleOptions } from '@nestjs/graphql';
import { AuthError } from '../commons/exceptions/GqlException'
import { verify } from 'src/utils/jwt';
import schemaDirectives from '../commons/directives'
import { AdminService } from 'src/modules/admin/admin.service';
import { AccountType } from 'src/constants/account';
import { Permission } from 'src/constants/permission';

export default async function GqlConfigService(
  adminService: AdminService
): Promise<GqlModuleOptions> {

  async function contextHandler({ req, connection }) {
    if (connection) {
      const { currentAccount } = connection.context.currentAccount
      return { currentAccount }
    }

    let accountType: AccountType
    let currentAccount = []
    let permissions: Permission[]

    const token = req.headers['token']
    if(!token) return // If not have token

    const payload = await verify(token, process.env.JWT_SECRET)
    if(!payload) return // If verify failed
    
    const { type, _id } = payload
    if(!(type in AccountType)) return // If type is not in Account type

    accountType = type

    if (type === AccountType.ADMIN){
      currentAccount = await adminService.getAccount(_id)

    }
    else if(type === AccountType.USER){
      currentAccount = []
    }
    else{
      currentAccount = []
    }
    
    if(!currentAccount.length) return // If account not found
    
    return {
      currentAccount: currentAccount[0],
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