import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  NotFoundException,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ArticleUseCase, Paginator, User as UserEntity } from '@/domain';
import { ArticleCatalogDTO, ArticleDTO } from '@/infra/dto';
import { ParseStrIntPipe, ValidSchema } from '../shared';
import {
  CreateArticleSchema,
  GetArticlesSchema,
  UpdateArticleSchema,
} from './schema';
import { Auth, User } from '../auth';

@Controller('/articles')
export class ArticleController {
  constructor(private articleUseCase: ArticleUseCase) {}

  @Get('/')
  @ValidSchema({ query: GetArticlesSchema })
  async index(@Query() query: IndexQuery): Promise<Paginator<any>> {
    const { order, page, search, sort } = query;
    const paginator = await this.articleUseCase.paginate({
      search,
      sort: sort || 'DESC',
      order: order || 'createdAt',
      page: page || 1,
      perPage: 8,
    });

    return {
      ...paginator,
      data: paginator.data.map(ArticleCatalogDTO.fromDomain),
    };
  }

  @Post('/')
  @Auth()
  @ValidSchema({ body: CreateArticleSchema })
  @HttpCode(HttpStatus.OK)
  async create(
    @Body() body: CreateBody,
    @User() user: UserEntity,
  ): Promise<any> {
    const { description, title } = body;

    const article = await this.articleUseCase.create({
      title,
      description,
      author: user!,
    });

    return {
      data: ArticleDTO.fromDomain(article),
    };
  }

  @Get('/:id')
  async show(@Param('id', ParseStrIntPipe) id: string): Promise<any> {
    const article = await this.articleUseCase.getDetail(id);

    if (!article) {
      throw new NotFoundException();
    }

    return {
      data: ArticleDTO.fromDomain(article),
    };
  }

  @Put('/:id')
  @Auth()
  @ValidSchema({ body: UpdateArticleSchema })
  async update(
    @Body() body: UpdateBody,
    @Param('id', ParseStrIntPipe) id: string,
  ): Promise<any> {
    const article = await this.articleUseCase.getDetail(id);

    if (!article) {
      throw new NotFoundException();
    }

    const updatedArticle = await this.articleUseCase.update(article, body);

    return {
      data: ArticleDTO.fromDomain(updatedArticle),
    };
  }

  @Delete('/:id')
  @Auth()
  async delete(@Param('id', ParseStrIntPipe) id: string): Promise<any> {
    const article = await this.articleUseCase.getDetail(id);

    if (!article) {
      throw new NotFoundException();
    }

    await this.articleUseCase.delete(article);

    return {
      data: ArticleDTO.fromDomain(article),
    };
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
