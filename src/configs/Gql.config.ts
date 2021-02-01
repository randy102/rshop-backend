import {join} from 'path'
import {GqlModuleOptions} from '@nestjs/graphql';
import schemaDirectives from '../commons/directives'
import {JwtService, AccountPayload} from 'src/modules/jwt/jwt.service';
import {AuthService, UserRole} from 'src/modules/auth/auth.service';
import UserEntity from 'src/modules/user/user.entity';
import {ContractEntity} from 'src/modules/contract/contract.entity';
import {ContractService} from 'src/modules/contract/contract.service';

export default async function GqlConfigFactory(
  jwtService: JwtService,
  authService: AuthService,
  contractService: ContractService
): Promise<GqlModuleOptions> {

  async function contextHandler({ req, connection }) {
    if (connection) {
      const { currentAccount } = connection.context.currentAccount
      return { currentAccount }
    }

    const token = req.headers['token']

    var user: UserEntity
    var roles: UserRole[]
    var contract: ContractEntity

    if (token) {
      const payload = await jwtService.verify(token)

      if (payload) {
        const userEntity = await authService.getCurrentAccount(payload._id)

        if (userEntity && payload.credentialHash === userEntity.credentialHash) {
          user = userEntity
          roles = await authService.getUserRoles(payload._id)
          contract = await contractService.getActive(payload._id)
        }
      }
    }

    return {
      user, roles, contract
    }
  }

  return {
    typePaths: ['./**/*.gql'],
    context: contextHandler,
    definitions: {
      path: join(process.cwd(), 'src/graphql.schema.ts'),
      outputAs: 'class',
    },
    schemaDirectives
  }

} 