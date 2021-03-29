import { Article } from '@/domain';
import { ORMArticle } from './entity';

export class ORMArticleMapper {
  static toDomain(model: ORMArticle): Article {
    const article = new Article(model);

    return article;
  }
}
