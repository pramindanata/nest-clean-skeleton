import { Article } from '@/domain';
import { UserDTO, UserDTOProps } from '../user';

export class ArticleDTO {
  id: string;
  title: string;
  description: string;
  createdAt: string;
  author?: UserDTO;

  constructor(props: ArticleDTOProps) {
    this.id = props.id;
    this.title = props.title;
    this.description = props.description;
    this.createdAt = props.createdAt;

    if (props.author) {
      this.author = props.author;
    }
  }

  static fromDomain(domain: Article): ArticleDTO {
    return new ArticleDTO({
      id: domain.id,
      title: domain.title,
      description: domain.description,
      createdAt: domain.createdAt.toISOString(),
      author: domain.author && UserDTO.fromDomain(domain.author),
    });
  }
}

export interface ArticleDTOProps {
  id: string;
  title: string;
  description: string;
  createdAt: string;
  author?: UserDTOProps;
}
