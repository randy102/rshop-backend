import { Injectable } from "@nestjs/common";
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from "@nestjs/typeorm";

@Injectable()
export default class TypeOrmConfigService implements TypeOrmOptionsFactory {
  createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      type: 'mongodb',
      host: process.env.MONGO_HOST,
      port: +process.env.MONGO_PORT,
      username: '',
      password: '',
      database:process.env.NODE_ENV === 'testing' ? process.env.MONGO_DB_TEST : process.env.MONGO_DB,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
      autoLoadEntities: true,
      useUnifiedTopology: true 
    };
  }
}