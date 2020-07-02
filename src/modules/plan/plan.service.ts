import { Injectable } from '@nestjs/common';
import RootService from '../root/root.service';
import { PlanEntity } from './plan.entity';
import { CreateDraftPlanInput, UpdateDraftPlanInput, PlanState } from 'src/graphql.schema';
import { GraphQLError } from 'graphql';

@Injectable()
export class PlanService extends RootService<PlanEntity>{
  constructor() {
    super(PlanEntity,'Gói')
  }

  getPublished(): Promise<PlanEntity[]>{
    return this.find({state: PlanState.PUBLISHED})
  }

  async createDraft(input: CreateDraftPlanInput, createdBy: string): Promise<PlanEntity>{
    await this.checkDuplication({name: input.name})
    return this.save(new PlanEntity({
      ...input,
      createdBy
    }))
  }

  async updateDraft(input: UpdateDraftPlanInput, updatedBy: string): Promise<PlanEntity>{
    var existed = await this.checkExistedId(input._id)

    if(existed.state !== PlanState.DRAFT) 
      throw new GraphQLError('Chỉ có thể sửa gói ở trạng thái nháp!')

    await this.checkDuplication({name: input.name, _id: {$ne: input._id}})

    return this.save(new PlanEntity({
      ...existed,
      ...input,
      updatedBy
    }))
  }

  async deleteDraft(ids: string[]): Promise<boolean>{
    var notDraft = await this.find({_id: {$in: ids}, state: {$ne: PlanState.DRAFT}})
    if(notDraft.length > 0)
      throw new GraphQLError('Chỉ có thể xóa gói ở trạng thái nháp')
      
    return this.delete(ids)
  }

  async publish(id: string, updatedBy: string): Promise<PlanEntity>{
    var existed = await this.checkExistedId(id)

    return this.save(new PlanEntity({
      ...existed,
      state: PlanState.PUBLISHED,
      updatedBy
    }))
  }

  async suppress(id: string, updatedBy: string): Promise<PlanEntity>{
    var existed = await this.checkExistedId(id)

    return this.save(new PlanEntity({
      ...existed,
      state: PlanState.SUPPRESSED,
      updatedBy
    }))
  }
}
