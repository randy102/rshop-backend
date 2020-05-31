import { join } from 'path'
import { GqlModuleOptions } from '@nestjs/graphql';
import schemaDirectives from '../commons/directives'
import { ACCOUNT_TYPE, PERMISSION } from 'src/graphql.schema';
import { JwtService } from 'src/modules/jwt/jwt.service';
import { AuthService } from 'src/modules/auth/auth.service';

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
    let currentAccount = undefined
    let permissions: PERMISSION[]

    const token = req.headers['token']
    if(!token) return // If not have token

    const payload = await jwtService.verify(token)
    if(!payload) return // If verify failed
    
    const { type, _id } = payload
    if(!(type in ACCOUNT_TYPE)) return // If type is not in Account type

    accountType = type
    currentAccount = await authService.getCurrentAccount(_id, type)
    
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