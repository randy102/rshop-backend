import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserModule } from '../user/user.module';
import { RoleModule } from '../role/role.module';

@Module({
  providers: [AuthService],
  imports: [UserModule, RoleModule],
  exports: [AuthService]
})
export class AuthModule {}
