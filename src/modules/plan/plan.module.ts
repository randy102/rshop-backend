import { Module } from '@nestjs/common';
import { PlanResolver } from './plan.resolver';
import { PlanService } from './plan.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlanEntity } from './plan.entity';

@Module({
  imports:[TypeOrmModule.forFeature([PlanEntity])],
  providers: [PlanResolver, PlanService]
})
export class PlanModule {}
