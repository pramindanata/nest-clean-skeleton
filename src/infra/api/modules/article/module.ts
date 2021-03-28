import { Module } from '@nestjs/common';
import { ArticleModule } from '@/domain';
import { ArticleController } from './controller';

@Module({
  imports: [ArticleModule],
  controllers: [ArticleController],
})
export class ArticleAPIModule {}
