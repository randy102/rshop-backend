import {Module} from '@nestjs/common';
import {ContractResolver} from './contract.resolver';
import {ContractService} from './contract.service';
import {TypeOrmModule} from '@nestjs/typeorm';
import {ContractEntity} from './contract.entity';
import {PlanModule} from '../plan/plan.module';
import {UserModule} from '../user/user.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([ContractEntity]),
    PlanModule,
    UserModule
  ],
  providers: [ContractResolver, ContractService],
  exports: [ContractService]
})
export class ContractModule {
}
