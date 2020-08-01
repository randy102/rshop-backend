import { Injectable } from '@nestjs/common';
import { ContractEntity } from './contract.entity';
import RootService from '../root/root.service';
import { PlanService } from '../plan/plan.service';
import { SignContractInput, CreateContractInput } from 'src/graphql.schema';
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

  async sign(input: SignContractInput, idUser: string): Promise<ContractEntity> {
    await this.planService.checkActive(input.idPlan)
    await this.checkDuplicatedSignDate(idUser)
    await this.checkRegisteredFreePlan(idUser, input.idPlan)

    return this.save({
      ...input,
      idUser
    })
  }

  async create(input: CreateContractInput, createdBy: string): Promise<ContractEntity> {
    await this.planService.checkActive(input.idPlan)
    await this.checkDuplicatedSignDate(input.idUser)

    return this.save({
      ...input,
      createdBy
    })
  }

  async getActive(idUser: string): Promise<ContractEntity> {
    await this.userService.checkExistedId(idUser)

    const userContracts = await this.aggregate([
      {
        $match: { idUser }
      },
      {
        $lookup: {
          from: 'Plan',
          localField: 'idPlan',
          foreignField: '_id',
          as: 'plan'
        }
      },
      { $unwind: { path: '$plan', preserveNullAndEmptyArrays: true } }
    ])

    return userContracts.length && userContracts.find(contract => {
      let now = Moment().valueOf()
      let expDate = Moment(contract.signDate).add(contract.plan.duration, 'day').valueOf()
      return now <= expDate
    })
  }


  /**
   * @param idContract contract id
   * @returns {number} contract's expired date
   */
  async getExpDate(idContract: string): Promise<number> {
    const contract = await this.findById(idContract)
    const plan = await this.planService.findById(contract.idPlan)
    return Moment(contract.signDate).add(plan.duration, 'day').valueOf()
  }


  /**
   * 
   * @param idUser user id
   * @returns {ContractEntity[]} all contracts of user
   */
  async byUser(idUser: string): Promise<ContractEntity[]> {
    await this.userService.checkExistedId(idUser)
    return this.find({ idUser })
  }


  /**
   * @param idUser user id
   * @description Check if user is having an active contract
   */
  async checkDuplicatedSignDate(idUser: string) {
    const existActive = await this.getActive(idUser)

    if (existActive)
      throw new GraphQLError('Hợp đồng hiện tại đang có hiệu lực. Không thể đăng ký gói mới')
  }


  /**
   * @param idUser user id
   * @param idPlan plan to register
   * @description Check if user did register free plan
   */
  async checkRegisteredFreePlan(idUser: string, idPlan: string) {
    const plan = await this.planService.findById(idPlan)
    if (plan.price === 0) {
      const userRegistered = await this.aggregate([
        {
          $match: { idUser }
        },
        {
          $lookup: {
            from: 'Plan',
            localField: 'idPlan',
            foreignField: '_id',
            as: 'plan'
          }
        },
        { $unwind: { path: '$plan', preserveNullAndEmptyArrays: true } }
      ])

      if(userRegistered.some(({plan}) => plan.price === 0)){
        throw new GraphQLError("Gói dùng thử chỉ được đăng ký một lần")
      }
    }
  }
}
