import { Module } from '@nestjs/common';
import { CredentialService } from './credential.service';
import { UtilsModule } from '../utils/utils.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import CredentialEntity from './credential.entity';

@Module({
  providers: [CredentialService],
  exports: [CredentialService],
  imports: [
    TypeOrmModule.forFeature([CredentialEntity]),
    UtilsModule
  ]
})
export class CredentialModule {}
