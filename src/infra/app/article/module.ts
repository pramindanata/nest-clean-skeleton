import { Module } from '@nestjs/common';
import { ArticleDomainModule } from '@/domain';

import {
  GetArticlesSchema,
  CreateArticleSchema,
  UpdateArticleSchema,
  ArticleController,
} from './http';

@Module({
  imports: [ArticleDomainModule],
  controllers: [ArticleController],
  providers: [GetArticlesSchema, CreateArticleSchema, UpdateArticleSchema],
})
export class ArticleAppModule {}
