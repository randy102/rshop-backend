import { Module } from '@nestjs/common';
import { ProfileService } from './profile.service';
import ProfileEntity from './profile.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProfileResolver } from './profile.resolver';
import { PhotoModule } from '../photo/photo.module';

@Module({
  providers: [ProfileService, ProfileResolver],
  exports: [ProfileService],
  imports: [TypeOrmModule.forFeature([ProfileEntity]),PhotoModule]
})
export class ProfileModule {}
