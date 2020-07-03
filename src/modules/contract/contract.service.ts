import { Injectable } from '@nestjs/common';
import { ContractEntity } from './contract.entity';
import RootService from '../root/root.service';
import { SignContractInput } from 'src/graphql';
import { PlanService } from '../plan/plan.service';
import { PlanState, CreateContractInput, Contract } from 'src/graphql.schema';
import { GraphQLError } from 'graphql';
import { UserService } from '../user/user.service';
import { Moment } from 'src/utils/moment';

@Injectable()
export class ContractService extends RootService<ContractEntity>{
  constructor(
    private readonly planService: PlanService,
    private readonly userService: UserService
  ) {
    super(ContractEntity, 'Hợp đồng')
  }

  async sign(input: SignContractInput, idUser: string): Promise<ContractEntity>{
    await this.planService.checkActive(input.idPlan)
    await this.checkDuplicatedSignDate(idUser)
    
    return this.save(new ContractEntity({
      ...input,
      idUser
    }))
  }

  async create(input: CreateContractInput, createdBy: string): Promise<ContractEntity>{
    await this.planService.checkActive(input.idPlan)
    await this.checkDuplicatedSignDate(input.idUser)

    return this.save(new ContractEntity({
      ...input,
      createdBy
    }))
  }

  async getActive(idUser: string): Promise<ContractEntity>{
    await this.userService.checkExistedId(idUser)

    var userContracts = await this.aggregate([
      {
        $match: {idUser}
      },
      {
        $lookup: {
          from: 'Plan',
          localField: 'idPlan',
          foreignField: '_id',
          as: 'plan'
        }
      },
      {$unwind: {path: '$plan', preserveNullAndEmptyArrays: true}}
    ])

    return userContracts.find(contract => {
      let now = Moment().valueOf()
      let expDate = Moment(contract.signDate).add(contract.plan.duration, 'day').valueOf()
      return now <= expDate
    })
  }


  /**
   * 
   * @param idContract contract id
   * @returns {number} contract's expired date
   */
  async getExpDate(idContract: string): Promise<number>{
    var contract = await this.findById(idContract)
    var plan = await this.planService.findById(contract.idPlan)
    return Moment(contract.signDate).add(plan.duration, 'day').valueOf()
  }


  /**
   * 
   * @param idUser user id
   * @returns {ContractEntity[]} all contracts of user
   */
  async byUser(idUser): Promise<ContractEntity[]>{
    await this.userService.checkExistedId(idUser)
    return this.find({idUser})
  }


  /**
   * 
   * @param idUser user id
   * @description Check if user is having an active contract
   * 
   */

  async checkDuplicatedSignDate(idUser: string){
    var existActive = await this.getActive(idUser)
    
    if(existActive)
      throw new GraphQLError('Hợp đồng hiện tại đang có hiệu lực. Không thể đăng ký gói mới')
  }
}
