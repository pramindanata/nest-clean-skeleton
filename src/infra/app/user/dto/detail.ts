import { User } from '@/domain';

export class UserDTO {
  id: string;
  name: string;
  email: string;
  createdAt: string;
  role: string;

  constructor(props: UserDTOProps) {
    this.id = props.id;
    this.name = props.name;
    this.email = props.email;
    this.createdAt = props.createdAt;
    this.role = props.role;
  }

  static fromDomain(domain: User): UserDTO {
    return new UserDTO({
      id: domain.id,
      name: domain.name,
      email: domain.email,
      createdAt: domain.createdAt.toISOString(),
      role: domain.role,
    });
  }
}

export interface UserDTOProps {
  id: string;
  name: string;
  email: string;
  createdAt: string;
  role: string;
}
