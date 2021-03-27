import { Inject } from '@nestjs/common';
import { ArticleRepositoryContract } from '@/domain/contracts';
import { BasePaginateProps, Paginator, RepositoryDIToken } from '../shared';
import { Article } from './entity';

export class ArticleUseCase {
  constructor(
    @Inject(RepositoryDIToken.ArticleRepositoryContract)
    private articleRepo: ArticleRepositoryContract,
  ) {}

  async paginate(props: PaginateArticleProps): Promise<Paginator<Article>> {
    const paginator = await this.articleRepo.paginate(props);

    return paginator;
  }

  async create(props: CreateArticleProps): Promise<Article> {
    const article = await this.articleRepo.create(props);

    return article;
  }

  async getDetail(id: string): Promise<Article | undefined> {
    const article = await this.articleRepo.getDetail(id);

    return article;
  }

  async update(article: Article, props: UpdateArticleProps): Promise<Article> {
    article.title = props.title;
    article.description = props.description;

    await this.articleRepo.update(article);

    return article;
  }

  async delete(article: Article): Promise<void> {
    await this.articleRepo.delete(article);
  }
}

export interface PaginateArticleProps extends BasePaginateProps {
  search?: string;
  order: 'title' | 'createdAt';
  sort: 'ASC' | 'DESC';
}

export type CreateArticleProps = Required<
  Pick<Article, 'title' | 'description' | 'author'>
>;

export type UpdateArticleProps = Required<
  Pick<Article, 'title' | 'description'>
>;
