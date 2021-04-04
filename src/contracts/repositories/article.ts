import {
  Article,
  CreateArticleProps,
  PaginateArticleProps,
  Paginator,
} from '@/domain';

export interface ArticleRepositoryContract {
  paginate(props: PaginateArticleProps): Promise<Paginator<Article>>;
  create(props: CreateArticleProps): Promise<Article>;
  getDetail(id: string): Promise<Article | undefined>;
  update(article: Article): Promise<void>;
  delete(article: Article): Promise<void>;
}
