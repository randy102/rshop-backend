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



@Module({
  imports: [
    TypeOrmModule.forRootAsync({ useClass: TypeOrmConfigService }),
    ConfigModule.forRoot({ isGlobal: true }),
    GraphQLModule.forRootAsync({
      imports: [AdminModule, UserModule],
      inject: [AdminService, UserService],
      useFactory: GqlConfigFactory
    }),
    AdminModule,
    PermissionModule,
    UserModule,
    TokenModule,
  ],
})
export class AppModule { }
