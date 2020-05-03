import { SchemaDirectiveVisitor } from 'graphql-tools'
import { defaultFieldResolver } from 'graphql'
import {AuthError, NoPermissionError} from '../exceptions/GqlException'

class AccountTypeDirective extends SchemaDirectiveVisitor {
	visitFieldDefinition(field) {
		const { resolve = defaultFieldResolver } = field
		const { type } = this.args

		field.resolve = async function(...args) {
			const { currentAccount, accountType } = args[2]

			// console.log('Hello', permission, permissions)

			if (!currentAccount) {
				throw new AuthError()
			}

			if (accountType !== type) {
				throw new NoPermissionError()
			}

			return resolve.apply(this, args)
		}
  }

}

export default AccountTypeDirective
