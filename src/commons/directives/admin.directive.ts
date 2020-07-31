import { SchemaDirectiveVisitor } from 'graphql-tools'
import { defaultFieldResolver } from 'graphql'
import {AuthError, NoPermissionError} from '../exceptions/GqlException'
import UserEntity from 'src/modules/user/user.entity'

class AdminDirective extends SchemaDirectiveVisitor {
	visitFieldDefinition(field) {
		const { resolve = defaultFieldResolver } = field

		field.resolve = async function(...args) {
			const context =  args[2]
			const user: UserEntity = context['user']
			
			
			if (!user) {
				throw new AuthError()
			}

			if (!user.isAdmin) {
				throw new NoPermissionError()
			}

			return resolve.apply(this, args)
		}
  }

}

export default AdminDirective
