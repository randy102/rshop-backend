import { SchemaDirectiveVisitor } from 'graphql-tools'
import { defaultFieldResolver } from 'graphql'
import { UserRole } from 'src/modules/auth/auth.service'
import { NoPermissionError } from '../exceptions/GqlException'
import { MANAGE_PERMISSION } from '../constants/permissions'

class StaffDirective extends SchemaDirectiveVisitor {
  visitFieldDefinition(field) {
    const { resolve = defaultFieldResolver } = field
    const requiredPermission: MANAGE_PERMISSION = this.args.with

    field.resolve = function (...args) {
      const { idShop } = args[1] //variables
      const roles: UserRole[] = args[2].roles //context

      const shopRole = roles.find(role => role.idShop === idShop)
      if(!shopRole) throw new NoPermissionError()

      const hasPermission = !requiredPermission || shopRole.isMaster ||  shopRole.permissions.some(p => p === requiredPermission)
      if(!hasPermission) throw new NoPermissionError()

      return resolve.apply(this, args)
    }
  }
}

export default StaffDirective
