import { getMongoRepository, MongoRepository } from "typeorm"
import { DuplicateError, NotFoundError, LoginError } from "src/commons/exceptions/GqlException"
import RootService from "./root.service"
import CredentialEntity from "../credential/credential.entity"
import { AccountRootEntity } from "./account-root.entity"
import ProfileEntity from "../profile/profile.entity"
import { LoginInput } from "src/graphql.schema"

export default abstract class AccountRootService extends RootService{
  constructor(entity, name: string){
    super(entity, name)
  }

  abstract generateCredentialHash(id: string, credentials: any): void
  abstract login(input: LoginInput): Promise<string>

  async authenticate(email: string, hashedPassword: string): Promise<any>{
    const existedCredentials = await getMongoRepository(CredentialEntity).find({email,password: hashedPassword})
    const credentialIds = existedCredentials.map(cred => cred._id)
    const matchedAccount = await this.findOne({idCredential: {$in: credentialIds}})
    if(!matchedAccount) throw new LoginError()

    return matchedAccount
  }

  async checkAccountDuplication(email: string, exceptId?: string){
    const accounts = await getMongoRepository(CredentialEntity).find({email})
    const accountIds = accounts.map(acc => acc._id)

    if(exceptId){
      await this.checkDuplication({idCredential: {$in: accountIds}, _id: {$ne: exceptId}})
    } else {
      await this.checkDuplication({idCredential: {$in: accountIds}})
    }
  }

  async deleteAccount(ids: string[]){
    for(let id of ids){
      const account: AccountRootEntity = await this.findById(id)
      await getMongoRepository(CredentialEntity).delete(account.idCredential)
      await getMongoRepository(ProfileEntity).delete(account.idProfile)
    }
    return this.delete(ids)
  }
}