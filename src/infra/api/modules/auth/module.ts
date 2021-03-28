import { UserDomainModule } from '@/domain';
import { Module } from '@nestjs/common';
import { AuthController } from './controller';

@Module({
  imports: [UserDomainModule],
  controllers: [AuthController],
})
export class AuthAPIModule {}
