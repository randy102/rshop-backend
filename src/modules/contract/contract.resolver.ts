import { Resolver, Mutation, Args, Context, Query, ResolveField, Parent } from '@nestjs/graphql';
import UserEntity from '../user/user.entity';
import { ContractService } from './contract.service';
import { ContractEntity } from './contract.entity';
import { UserService } from '../user/user.service';
import { PlanService } from '../plan/plan.service';
import { User, Plan, CreateContractInput, SignContractInput, Contract } from 'src/graphql.schema';
import { GQL_CTX } from 'src/commons/constants/gqlContext';

@Resolver('Contract')
export class ContractResolver {
  constructor(
    private readonly contractService: ContractService,
    private readonly userService: UserService,
    private readonly planService: PlanService
  ) { }

  @ResolveField()
  user(@Parent() contract: ContractEntity): Promise<User> {
    return this.userService.findById(contract.idUser)
  }

  @ResolveField()
  plan(@Parent() contract: ContractEntity): Promise<Plan> {
    return this.planService.findById(contract.idPlan)
  }
  
  @ResolveField()
  expDate(@Parent() contract: ContractEntity): Promise<number>{
    return this.contractService.getExpDate(contract._id)
  }

  @Query()
  contracts(): Promise<Contract[]> {
    return this.contractService.find()
  }

  @Query()
  activeContract(@Context(GQL_CTX.USER) u: UserEntity): Promise<Contract>{
    return this.contractService.getActive(u._id)
  }

  @Query()
  userContracts(@Context(GQL_CTX.USER) u: UserEntity): Promise<Contract[]>{
    return this.contractService.byUser(u._id)
  }

  @Mutation()
  signContract(@Context(GQL_CTX.USER) u: UserEntity, @Args('input') i: SignContractInput): Promise<Contract> {
    return this.contractService.sign(i, u._id)
  }

  @Mutation()
  createContract(@Context(GQL_CTX.USER) u: UserEntity, @Args('input') i: CreateContractInput): Promise<Contract> {
    return this.contractService.create(i, u._id)
  }
}
