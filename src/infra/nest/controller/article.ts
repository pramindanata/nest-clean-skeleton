import { Controller, Get, Query } from '@nestjs/common';
import { Article, ArticleUseCase, Paginator } from '@/domain';

@Controller('articles')
export class ArticleController {
  constructor(private articleUseCase: ArticleUseCase) {}

  @Get()
  async index(
    @Query()
    query: IndexQuery,
  ): Promise<Paginator<Article>> {
    const { order, page, search, sort } = query;
    const paginator = await this.articleUseCase.paginate({
      search,
      sort: sort || 'DESC',
      order: order || 'createdAt',
      page: page || 1,
      perPage: 8,
    });

    return paginator;
  }
}

interface IndexQuery {
  search?: string;
  order?: 'title' | 'createdAt';
  sort?: 'ASC' | 'DESC';
  page?: number;
}

interface CreateBody {
  title: string;
  description: string;
}

interface UpdateBody {
  title: string;
  description: string;
}
