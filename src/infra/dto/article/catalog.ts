import { Article } from '@/domain';
import { UserDTO, UserDTOProps } from '../user';

export class ArticleCatalogDTO {
  id: string;
  title: string;
  createdAt: string;
  author?: UserDTO;

  constructor(props: ArticleCatalogDTOProps) {
    this.id = props.id;
    this.title = props.title;
    this.createdAt = props.createdAt;

    if (props.author) {
      this.author = props.author;
    }
  }

  static fromDomain(domain: Article): ArticleCatalogDTO {
    return new ArticleCatalogDTO({
      id: domain.id,
      title: domain.title,
      createdAt: domain.createdAt.toISOString(),
      author: domain.author && UserDTO.fromDomain(domain.author),
    });
  }
}

export interface ArticleCatalogDTOProps {
  id: string;
  title: string;
  createdAt: string;
  author?: UserDTOProps;
}
