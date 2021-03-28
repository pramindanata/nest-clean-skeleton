import { UserModule } from '@/domain';
import { Module } from '@nestjs/common';
import { AuthController } from './controller';

@Module({
  imports: [UserModule],
  controllers: [AuthController],
})
export class AuthAPIModule {}
