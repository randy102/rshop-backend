import { Module } from '@nestjs/common';
import { ProfileService } from './profile.service';
import ProfileEntity from './profile.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  providers: [ProfileService],
  exports: [ProfileService],
  imports: [TypeOrmModule.forFeature([ProfileEntity]),]
})
export class ProfileModule {}
