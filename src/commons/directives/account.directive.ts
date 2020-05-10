import { SchemaDirectiveVisitor } from 'graphql-tools'
import { defaultFieldResolver } from 'graphql'
import {AuthError, NoPermissionError} from '../exceptions/GqlException'
import { ACCOUNT_TYPE, PERMISSION } from 'src/graphql.schema'

class AccountTypeDirective extends SchemaDirectiveVisitor {
	visitFieldDefinition(field) {
		const { resolve = defaultFieldResolver } = field
		const requiredType: ACCOUNT_TYPE = this.args.type
		const requiredPermissions: PERMISSION[] = this.args.permissions

		field.resolve = async function(...args) {
			const context =  args[2]

			const { currentAccount } = context
			const { accountType } = context
			const accountPermissions: string[] = context.permission
			
			if (!currentAccount) {
				throw new AuthError()
			}

			if (accountType !== requiredType) {
				throw new NoPermissionError()
			}

			if (requiredPermissions && !requiredPermissions.every(per => accountPermissions.includes(per))) {
				throw new NoPermissionError()
			}

			return resolve.apply(this, args)
		}
  }

}

export default AccountTypeDirective
