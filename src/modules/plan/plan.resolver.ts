import { Resolver, Query, Mutation, Args, Context } from '@nestjs/graphql';
import { PlanService } from './plan.service';
import { Plan, CreateDraftPlanInput, UpdateDraftPlanInput } from 'src/graphql.schema';
import UserEntity from '../user/user.entity';

@Resolver('Plan')
export class PlanResolver {
  constructor(private readonly planService: PlanService){}

  @Query()
  plans(): Promise<Plan[]>{
    return this.planService.find()
  }

  @Query()
  publishedPlans(): Promise<Plan[]>{
    return this.planService.getPublished()
  }

  @Mutation()
  createDraftPlan(@Context('user') u: UserEntity, @Args('input') i: CreateDraftPlanInput): Promise<Plan>{
    return this.planService.createDraft(i,u._id)
  }

  @Mutation()
  updateDraftPlan(@Context('user') u: UserEntity, @Args('input') i: UpdateDraftPlanInput): Promise<Plan>{
    return this.planService.updateDraft(i,u._id)
  }

  @Mutation()
  deleteDraftPlan(@Args('ids') ids: string[]): Promise<boolean>{
    return this.planService.deleteDraft(ids)
  }

  @Mutation()
  publishPlan(@Context('user') u: UserEntity, @Args('id') id: string): Promise<Plan>{
    return this.planService.publish(id, u._id)
  }

  @Mutation()
  suppressPlan(@Context('user') u: UserEntity, @Args('id') id: string): Promise<Plan>{
    return this.planService.suppress(id, u._id)
  }
}
