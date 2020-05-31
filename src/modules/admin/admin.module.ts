import { Module } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminResolver } from './admin.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import AdminEntity from './admin.entity';
import { JwtModule } from '../jwt/jwt.module';
import { CredentialModule } from '../credential/credential.module';
import { UtilsModule } from '../utils/utils.module';
import { ProfileModule } from '../profile/profile.module';



@Module({
  providers: [AdminService, AdminResolver],
  imports: [
    TypeOrmModule.forFeature([AdminEntity]),
    JwtModule,
    CredentialModule,
    UtilsModule,
    ProfileModule
  ],
  exports: [AdminService]
})
export class AdminModule {}
