import {Module} from '@nestjs/common';
import {TokenService} from './token.service';
import {TypeOrmModule} from '@nestjs/typeorm';
import TokenEntity from './token.entity';

@Module({
  providers: [TokenService],
  imports: [TypeOrmModule.forFeature([TokenEntity])],
  exports: [TokenService]
})
export class TokenModule {
}
