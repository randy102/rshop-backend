import { getMongoRepository } from "typeorm"
import {  LoginError } from "src/commons/exceptions/GqlException"
import RootService from "./root.service"
import CredentialEntity from "../credential/credential.entity"
import { AccountRootEntity } from "./account-root.entity"
import ProfileEntity from "../profile/profile.entity"
import { LoginInput, ChangePasswordInput } from "src/graphql.schema"


export default abstract class AccountRootService<E extends AccountRootEntity> extends RootService<E>{
  constructor(readonly entity: any, readonly name: string){
    super(entity, name)
  }
  
 
  abstract updateCredentialHash(accountId: string): Promise<AccountRootEntity>

  /**
   * @returns {string} new jwt
   */
  abstract login(input: LoginInput): Promise<string>

  /**
   * @returns {string} new jwt
   */
  abstract changePassword(account: AccountRootEntity, input: ChangePasswordInput): Promise<string>

  /**
   * 
   * @param email 
   * @param hashedPassword 
   * @description 
   * Find email, password pair in Credential 
   * then find those credential's ids on account table,
   * if not found throw LoginError
   */
  async authenticate(email: string, hashedPassword: string): Promise<any>{
    const existedCredentials = await getMongoRepository(CredentialEntity).find({email,password: hashedPassword})
    const credentialIds = existedCredentials.map(cred => cred._id)
    const matchedAccount = await this.findOne({idCredential: {$in: credentialIds}})
    if(!matchedAccount) throw new LoginError()

    return matchedAccount
  }

  /**
   * 
   * @param email 
   * @param exceptId
   * @description
   * Find email existed on Credential,
   * then check if Account has those credential
   * if found, throw DuplicationError
   */
  async checkAccountDuplication(email: string, exceptId?: string){
    const credentials = await getMongoRepository(CredentialEntity).find({email})
    const credentialIds = credentials.map(acc => acc._id)

    if(exceptId){
      await this.checkDuplication({idCredential: {$in: credentialIds}, _id: {$ne: exceptId}})
    } else {
      await this.checkDuplication({idCredential: {$in: credentialIds}})
    }
  }

  /**
   * 
   * @param ids 
   * @description
   * Delete all Credentials and Profiles of each account
   * then delete accounts
   */
  async deleteAccount(ids: string[]){
    for(let id of ids){
      const account: AccountRootEntity = await this.findById(id)

      await getMongoRepository(CredentialEntity).delete({_id: account.idCredential})
      await getMongoRepository(ProfileEntity).delete({_id: account.idProfile})
    }
    return this.delete(ids)
  }
}