import { Module } from '@nestjs/common'
import { GraphQLModule } from '@nestjs/graphql'
import { ConfigModule } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'

import { AdminModule } from './modules/admin/admin.module';
import GqlConfigFactory from './configs/Gql.config'
import TypeOrmConfigService from './configs/Typeorm.config'
import { PermissionModule } from './modules/permission/permission.module';
import { UserModule } from './modules/user/user.module';
import { TokenModule } from './modules/token/token.module';
import { JwtModule } from './modules/jwt/jwt.module';
import { JwtService } from './modules/jwt/jwt.service';
import { CredentialModule } from './modules/credential/credential.module';
import { MailerModule } from './modules/mailer/mailer.module';
import { UtilsModule } from './modules/utils/utils.module';
import { AuthModule } from './modules/auth/auth.module';
import { AuthService } from './modules/auth/auth.service';
import { ProfileModule } from './modules/profile/profile.module';



@Module({
  imports: [
    TypeOrmModule.forRootAsync({ useClass: TypeOrmConfigService }),
    ConfigModule.forRoot({ isGlobal: true }),
    GraphQLModule.forRootAsync({
      imports: [JwtModule, AuthModule],
      inject: [JwtService, AuthService],
      useFactory: GqlConfigFactory
    }),
    AdminModule,
    PermissionModule,
    UserModule,
    TokenModule,
    JwtModule,
    CredentialModule,
    MailerModule,
    UtilsModule,
    AuthModule,
    ProfileModule,
  ],
})
export class AppModule { }
