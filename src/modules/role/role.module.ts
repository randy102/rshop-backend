import { Module } from '@nestjs/common';
import { RoleResolver } from './role.resolver';
import { RoleService } from './role.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoleEntity } from './role.entity';

@Module({
  providers: [RoleResolver, RoleService],
  exports: [RoleService],
  imports: [
    TypeOrmModule.forFeature([RoleEntity])
  ]
})
export class RoleModule {}
