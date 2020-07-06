import { Resolver, Query, Mutation, Args, Context } from '@nestjs/graphql';
import {Template, CreateTemplateInput, UpdateTemplateInput} from '../../graphql.schema'
import { TemplateService } from './template.service';
import UserEntity from '../user/user.entity';

@Resolver('Template')
export class TemplateResolver {
  constructor(
    private readonly templateService: TemplateService
  ){}

  @Query()
  templates(): Promise<Template[]>{
    return this.templateService.find()
  }

  @Query()
  activeTemplates(): Promise<Template[]>{
    return this.templateService.getActive()
  }

  @Mutation()
  createTemplate(@Context('user') u: UserEntity, @Args('input') i: CreateTemplateInput): Promise<Template>{
    return this.templateService.create(i,u._id)
  }

  @Mutation()
  updateTemplate(@Context('user') u: UserEntity, @Args('input') i: UpdateTemplateInput): Promise<Template>{
    return this.templateService.update(i,u._id)
  }

  @Mutation()
  deleteTemplate(@Args('id') id: string): Promise<boolean>{
    return this.templateService.deleteTemplate(id)
  }
}
