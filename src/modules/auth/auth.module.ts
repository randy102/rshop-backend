import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AdminModule } from '../admin/admin.module';
import { UserModule } from '../user/user.module';

@Module({
  providers: [AuthService],
  imports: [AdminModule,UserModule],
  exports: [AuthService]
})
export class AuthModule {}
