import { Module } from '@nestjs/common';
import { ArticleUseCase } from '../article';
import { UserUseCase } from './use-case';

@Module({
  providers: [UserUseCase],
  exports: [ArticleUseCase],
})
export class UserModule {}
