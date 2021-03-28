import { Module } from '@nestjs/common';
import { ArticleDomainModule } from '@/domain';
import { ArticleController } from './controller';
import {
  GetArticlesSchema,
  CreateArticleSchema,
  UpdateArticleSchema,
} from './schema';

@Module({
  imports: [ArticleDomainModule],
  controllers: [ArticleController],
  providers: [GetArticlesSchema, CreateArticleSchema, UpdateArticleSchema],
})
export class ArticleAPIModule {}
