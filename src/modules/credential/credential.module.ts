import { Module } from '@nestjs/common';
import { CredentialService } from './credential.service';
import { UtilsModule } from '../utils/utils.module';

@Module({
  providers: [CredentialService],
  exports: [CredentialService],
  imports: [UtilsModule]
})
export class CredentialModule {}
