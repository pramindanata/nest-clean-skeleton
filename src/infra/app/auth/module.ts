import { UserDomainModule } from '@/domain';
import { Module } from '@nestjs/common';
import { AuthController, LoginSchema, RegisterSchema } from './http';

@Module({
  imports: [UserDomainModule],
  controllers: [AuthController],
  providers: [LoginSchema, RegisterSchema],
})
export class AuthAppModule {}
