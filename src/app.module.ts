import { Module } from '@nestjs/common'
import { GraphQLModule } from '@nestjs/graphql'
import { ConfigModule } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'

import { AdminModule } from './modules/admin/admin.module';
import GqlConfigFactory from './configs/Gql.config'
import TypeOrmConfigService from './configs/Typeorm.config'
import { AdminService } from './modules/admin/admin.service';
import { PermissionModule } from './modules/permission/permission.module';
import { UserModule } from './modules/user/user.module';
import { UserService } from './modules/user/user.service';
import { TokenModule } from './modules/token/token.module';
import { JwtModule } from './modules/jwt/jwt.module';
import { JwtService } from './modules/jwt/jwt.service';
import { AccountModule } from './modules/account/account.module';
import { AccountService } from './modules/account/account.service';
import { MailerModule } from './modules/mailer/mailer.module';



@Module({
  imports: [
    TypeOrmModule.forRootAsync({ useClass: TypeOrmConfigService }),
    ConfigModule.forRoot({ isGlobal: true }),
    GraphQLModule.forRootAsync({
      imports: [JwtModule, AccountModule],
      inject: [JwtService, AccountService],
      useFactory: GqlConfigFactory
    }),
    AdminModule,
    PermissionModule,
    UserModule,
    TokenModule,
    JwtModule,
    AccountModule,
    MailerModule,
  ],
})
export class AppModule { }
