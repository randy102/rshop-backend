import { SchemaDirectiveVisitor } from 'graphql-tools'
import { defaultFieldResolver } from 'graphql'
import {AuthError, NoPermissionError} from '../exceptions/GqlException'

class PermissionDirective extends SchemaDirectiveVisitor {
	visitFieldDefinition(field) {
		const { resolve = defaultFieldResolver } = field
		const { permission } = this.args

		field.resolve = async function(...args) {
			const { currentAccount, permissions } = args[2]

			// console.log('Hello', permission, permissions)

			if (!currentAccount) {
				throw new AuthError()
			}

			if (permissions.indexOf(permission) === -1) {
				throw new NoPermissionError()
			}

			return resolve.apply(this, args)
		}
	}
}

export default PermissionDirective
