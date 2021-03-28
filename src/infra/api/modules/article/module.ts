import { Module } from '@nestjs/common';
import { ArticleDomainModule } from '@/domain';
import { ArticleController } from './controller';

@Module({
  imports: [ArticleDomainModule],
  controllers: [ArticleController],
})
export class ArticleAPIModule {}
