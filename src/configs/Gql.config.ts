import { join } from 'path'
import { GqlModuleOptions } from '@nestjs/graphql';
import schemaDirectives from '../commons/directives' 
import { JwtService, AccountPayload } from 'src/modules/jwt/jwt.service';
import { AuthService } from 'src/modules/auth/auth.service';
import UserEntity from 'src/modules/user/user.entity';

export default async function GqlConfigFactory(
  jwtService: JwtService,
  authService: AuthService
): Promise<GqlModuleOptions> {

  async function contextHandler({ req, connection }) {
    if (connection) {
      const { currentAccount } = connection.context.currentAccount
      return { currentAccount }
    }

    var user: UserEntity
    var token = req.headers['token']

    if(token) {
      const payload = await jwtService.verify(token)

      if(payload){
        const userEntity =  await authService.getCurrentAccount(payload._id)

        if(userEntity && payload.credentialHash === userEntity.credentialHash){
          user = userEntity
        }
      }
    }
   
    return {
      user
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