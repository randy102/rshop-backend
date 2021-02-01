import {SchemaDirectiveVisitor} from 'graphql-tools'
import {defaultFieldResolver} from 'graphql'
import {UserRole} from 'src/modules/auth/auth.service'
import {NoPermissionError, AuthError, ContractError} from '../exceptions/GqlException'
import {MANAGE_PERMISSION} from '../constants/permissions'
import UserEntity from 'src/modules/user/user.entity'
import {ContractEntity} from 'src/modules/contract/contract.entity'

class StaffDirective extends SchemaDirectiveVisitor {
  visitFieldDefinition(field) {
    const { resolve = defaultFieldResolver } = field
    const requiredPermission: MANAGE_PERMISSION = this.args.with

    field.resolve = function (...args) {
      const { idShop } = args[1] //variables
      const roles: UserRole[] = args[2].roles //context
      const user: UserEntity = args[2].user //context
      const contract: ContractEntity = args[2].contract //context

      if (!user) throw new AuthError()

      if (!contract) throw new ContractError()

      const shopRole = roles.find(role => role.idShop === idShop)
      if (!shopRole) throw new NoPermissionError()

      const hasPermission = !requiredPermission || shopRole.isMaster || shopRole.permissions.some(p => p === requiredPermission)
      if (!hasPermission) throw new NoPermissionError()

      return resolve.apply(this, args)
    }
  }
}

export default StaffDirective
