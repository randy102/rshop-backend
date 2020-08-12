import { Module } from '@nestjs/common';
import { StoreResolver } from './store.resolver';
import { StoreService } from './store.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StoreEntity } from './store.entity';
import { UserModule } from '../user/user.module';

@Module({
  providers: [StoreResolver, StoreService],
  imports: [
    TypeOrmModule.forFeature([StoreEntity]),
    UserModule
  ],
  exports: [StoreService]
})
export class StoreModule {}
