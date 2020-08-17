import { Module, forwardRef } from '@nestjs/common';
import { StoreTransferService } from './store-transfer.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StoreTransferEntity } from './store-transfer.entity';
import { StoreTransferItemModule } from '../store-transfer-item/store-transfer-item.module';
import { StoreTransferResolver } from './store-transfer.resolver';
import { UserModule } from '../user/user.module';
import { StoreModule } from '../store/store.module';

@Module({
  providers: [StoreTransferService, StoreTransferResolver],
  imports: [
    TypeOrmModule.forFeature([StoreTransferEntity]),
    forwardRef(() => StoreTransferItemModule),
    forwardRef(() => StoreModule),
    UserModule,
  ],
  exports: [StoreTransferService]
})
export class StoreTransferModule {}
