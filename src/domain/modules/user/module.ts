import { Module } from '@nestjs/common';
import { UserUseCase } from './use-case';

@Module({
  providers: [UserUseCase],
})
export class UserModule {}
