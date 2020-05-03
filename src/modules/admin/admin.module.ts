import { Module } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminResolver } from './admin.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import AdminEntity from './admin.entity';



@Module({
  providers: [AdminService, AdminResolver],
  imports: [
    TypeOrmModule.forFeature([AdminEntity])
  ],
  exports: [AdminService]
})
export class AdminModule {}
