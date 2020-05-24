import { Module } from '@nestjs/common';
import { AccountService } from './account.service';
import { AdminModule } from '../admin/admin.module';
import { UserModule } from '../user/user.module';

@Module({
  providers: [AccountService],
  imports: [AdminModule,UserModule],
  exports: [AccountService]
})
export class AccountModule {}
