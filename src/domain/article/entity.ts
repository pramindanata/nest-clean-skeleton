import { User, UserProps } from '../user';

export class Article {
  id: string;
  title: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
  authorId: string;
  author?: User;

  constructor(props: ArticleProps) {
    this.id = props.id;
    this.title = props.title;
    this.description = props.description;
    this.createdAt = props.createdAt;
    this.updatedAt = props.updatedAt;
    this.authorId = props.authorId;

    if (props.author) {
      this.author = props.author;
    }
  }
}

export interface ArticleProps {
  id: string;
  title: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
  authorId: string;
  author?: UserProps;
}
