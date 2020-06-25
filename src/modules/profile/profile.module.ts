import { Module } from '@nestjs/common';
import { ProfileService } from './profile.service';
import ProfileEntity from './profile.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProfileResolver } from './profile.resolver';

@Module({
  providers: [ProfileService, ProfileResolver],
  exports: [ProfileService],
  imports: [TypeOrmModule.forFeature([ProfileEntity]),]
})
export class ProfileModule {}
