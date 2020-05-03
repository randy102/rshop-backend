import { SchemaDirectiveVisitor } from 'graphql-tools'
import { defaultFieldResolver } from 'graphql'
import { AuthError } from '../exceptions/GqlException'

class AuthDirective extends SchemaDirectiveVisitor {
  visitFieldDefinition(field) {
    const { resolve = defaultFieldResolver } = field

    field.resolve = function (...args) {
      const { currentAccount } = args[2] //Context
      if (!currentAccount) throw new AuthError()

      return resolve.apply(this, args)
    }
  }
}

export default AuthDirective
