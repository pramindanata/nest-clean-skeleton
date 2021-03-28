import { UserDomainModule } from '@/domain';
import { Module } from '@nestjs/common';
import { AuthController } from './controller';
import { LoginSchema, RegisterSchema } from './schema';

@Module({
  imports: [UserDomainModule],
  controllers: [AuthController],
  providers: [LoginSchema, RegisterSchema],
})
export class AuthAPIModule {}
