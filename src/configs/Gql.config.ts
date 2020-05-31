import { join } from 'path'
import { GqlModuleOptions } from '@nestjs/graphql';
import schemaDirectives from '../commons/directives'
import { ACCOUNT_TYPE, PERMISSION } from 'src/graphql.schema';
import { JwtService } from 'src/modules/jwt/jwt.service';
import { AuthService } from 'src/modules/auth/auth.service';
import { AccountRootEntity } from 'src/modules/root/account-root.entity';

export default async function GqlConfigFactory(
  jwtService: JwtService,
  authService: AuthService
): Promise<GqlModuleOptions> {

  async function contextHandler({ req, connection }) {
    if (connection) {
      const { currentAccount } = connection.context.currentAccount
      return { currentAccount }
    }

    let accountType: ACCOUNT_TYPE
    let currentAccount: AccountRootEntity
    let permissions: PERMISSION[]

    const token = req.headers['token']
    if(!token) return // If not have token

    const payload = await jwtService.verify(token)
    if(!payload) return // If verify failed
    
    const { type, _id, credentialHash } = payload
    
    // If type is not in Account type
    if(!(type in ACCOUNT_TYPE)) return 

    accountType = type
    currentAccount = await authService.getCurrentAccount(_id, type)

    // If account not found
    if(!currentAccount) return 

    // If account's credential has been change
    if(credentialHash !== currentAccount.credentialHash) return
    
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