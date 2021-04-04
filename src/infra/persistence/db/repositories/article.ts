import { EntityRepository, AbstractRepository } from 'typeorm';
import {
  Article,
  CreateArticleProps,
  PaginateArticleProps,
  Paginator,
} from '@/domain';
import { ArticleRepositoryContract } from '@/contracts';
import { ORMArticle, ORMArticleMapper } from '../entities';

@EntityRepository(ORMArticle)
export class ORMArticleRepository extends AbstractRepository<ORMArticle>
  implements ArticleRepositoryContract {
  async paginate(props: PaginateArticleProps): Promise<Paginator<Article>> {
    const { order, page, perPage, search, sort } = props;
    const qb = this.repository
      .createQueryBuilder('article')
      .select([
        'article.id',
        'article.title',
        'article.description',
        'article.createdAt',
      ])
      .leftJoinAndSelect('article.author', 'author')
      .orderBy(`article.${order}`, sort)
      .take(perPage)
      .skip((page - 1) * perPage);

    if (search) {
      qb.where('article.title ILIKE :search').orWhere(
        'author.name ILIKE :search',
      );
    }

    const [data, total] = await qb
      .setParameters({ search: `${search}%` })
      .getManyAndCount();

    return {
      data: data.map(ORMArticleMapper.toDomain),
      page,
      perPage,
      total,
    };
  }

  async create(props: CreateArticleProps): Promise<Article> {
    const article = await this.repository.save(props);

    return ORMArticleMapper.toDomain(article);
  }

  async getDetail(id: string): Promise<Article | undefined> {
    const article = await this.repository.findOne(id, {
      select: ['id', 'title', 'description', 'authorId', 'createdAt'],
      relations: ['author'],
    });

    return article && ORMArticleMapper.toDomain(article);
  }

  async update(article: Article): Promise<void> {
    const { title, description } = article;

    await this.repository.update({ id: article.id }, { title, description });
  }

  async delete(article: Article): Promise<void> {
    await this.repository.delete({ id: article.id });
  }
}
