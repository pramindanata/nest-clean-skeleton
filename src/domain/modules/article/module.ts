import { Module } from '@nestjs/common';
import { ArticleUseCase } from './use-case';

@Module({
  providers: [ArticleUseCase],
  exports: [ArticleUseCase],
})
export class ArticleModule {}
