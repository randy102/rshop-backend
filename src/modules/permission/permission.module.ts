import { Module } from '@nestjs/common';
import { PermissionResolver } from './permission.resolver';
import { PermissionService } from './permission.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import PermissionEntity from './permission.entity';

@Module({
  providers: [PermissionResolver, PermissionService],
  imports: [TypeOrmModule.forFeature([PermissionEntity])],
  exports: [PermissionService]
})
export class PermissionModule {}
