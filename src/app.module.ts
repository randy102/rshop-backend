import { Module } from '@nestjs/common'
import { GraphQLModule } from '@nestjs/graphql'
import { ConfigModule } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'

import { UserModule } from './modules/user/user.module';
import GqlConfigFactory from './configs/Gql.config'
import TypeOrmConfigService from './configs/Typeorm.config'
import { PermissionModule } from './modules/permission/permission.module';
import { TokenModule } from './modules/token/token.module';
import { JwtModule } from './modules/jwt/jwt.module';
import { JwtService } from './modules/jwt/jwt.service';
import { CredentialModule } from './modules/credential/credential.module';
import { MailerModule } from './modules/mailer/mailer.module';
import { UtilsModule } from './modules/utils/utils.module';
import { AuthModule } from './modules/auth/auth.module';
import { AuthService } from './modules/auth/auth.service';
import { ProfileModule } from './modules/profile/profile.module';
import { PhotoModule } from './modules/photo/photo.module';
import { PlanModule } from './modules/plan/plan.module';
import { ContractModule } from './modules/contract/contract.module';
import { RoleModule } from './modules/role/role.module';
import { ShopModule } from './modules/shop/shop.module';
import { TemplateModule } from './modules/template/template.module';
import { BrandModule } from './modules/brand/brand.module';
import { CategoryModule } from './modules/category/category.module';
import { StoreModule } from './modules/store/store.module';




@Module({
  imports: [
    TypeOrmModule.forRootAsync({ useClass: TypeOrmConfigService }),
    ConfigModule.forRoot({ isGlobal: true }),
    GraphQLModule.forRootAsync({
      imports: [JwtModule, AuthModule],
      inject: [JwtService, AuthService],
      useFactory: GqlConfigFactory
    }),
    UserModule,
    PermissionModule,
    TokenModule,
    JwtModule,
    CredentialModule,
    MailerModule,
    UtilsModule,
    AuthModule,
    ProfileModule,
    PhotoModule,
    PlanModule,
    ContractModule,
    RoleModule,
    ShopModule,
    TemplateModule,
    BrandModule,
    CategoryModule,
    StoreModule,
  ],
})
export class AppModule { }
