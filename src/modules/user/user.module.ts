import { Module } from '@nestjs/common';
import { UserResolver } from './user.resolver';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import UserEntity from './user.entity';
import { JwtModule } from '../jwt/jwt.module';
import { MailerModule } from '../mailer/mailer.module';
import { TokenModule } from '../token/token.module';

@Module({
  providers: [UserResolver, UserService],
  imports: [
    TypeOrmModule.forFeature([UserEntity]),
    JwtModule,
    MailerModule,
    TokenModule
  ],
  exports: [UserService]
})
export class UserModule {}
