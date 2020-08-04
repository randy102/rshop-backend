import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserResolver } from './user.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import UserEntity from './user.entity';
import { JwtModule } from '../jwt/jwt.module';
import { CredentialModule } from '../credential/credential.module';
import { UtilsModule } from '../utils/utils.module';
import { ProfileModule } from '../profile/profile.module';
import { TokenModule } from '../token/token.module';
import { MailerModule } from '../mailer/mailer.module';
import { PhotoModule } from '../photo/photo.module';



@Module({
  providers: [UserService, UserResolver],
  imports: [
    TypeOrmModule.forFeature([UserEntity]),
    JwtModule,
    CredentialModule,
    UtilsModule,
    ProfileModule,
    TokenModule,
    MailerModule
  ],
  exports: [UserService]
})
export class UserModule {}
