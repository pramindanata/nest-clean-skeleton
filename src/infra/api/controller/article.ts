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
import { Auth, User, ValidSchema } from '../decorators';
import {
  CreateArticleBodySchema,
  GetArticleListQuerySchema,
  UpdateArticleBodySchema,
} from '../schemas';

@Controller('/articles')
export class ArticleController {
  constructor(private articleUseCase: ArticleUseCase) {}

  @Get('/')
  @ValidSchema({ query: GetArticleListQuerySchema })
  async index(@Query() query: IndexQuery): Promise<Paginator<any>> {
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

  @Post('/')
  @Auth()
  @ValidSchema({ body: CreateArticleBodySchema })
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

    return article;
  }

  @Get('/:id')
  async show(@Param('id') id: string): Promise<any> {
    const article = await this.articleUseCase.getDetail(id);

    if (!article) {
      throw new NotFoundException();
    }

    return article;
  }

  @Put('/:id')
  @Auth()
  @ValidSchema({ body: UpdateArticleBodySchema })
  async update(
    @Body() body: UpdateBody,
    @Param('id') id: string,
  ): Promise<any> {
    const article = await this.articleUseCase.getDetail(id);

    if (!article) {
      throw new NotFoundException();
    }

    const updatedArticle = await this.articleUseCase.update(article, body);

    return updatedArticle;
  }

  @Delete('/:id')
  @Auth()
  async delete(@Param('id') id: string): Promise<any> {
    const article = await this.articleUseCase.getDetail(id);

    if (!article) {
      throw new NotFoundException();
    }

    await this.articleUseCase.delete(article);

    return article;
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
