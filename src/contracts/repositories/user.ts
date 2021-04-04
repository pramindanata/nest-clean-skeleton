import { User, UserRole } from '@/domain';

export interface UserRepositoryContract {
  create(props: CreateUserProps): Promise<User>;
  getDetail(id: string): Promise<User | undefined>;
  getDetailByEmail(email: string): Promise<User | undefined>;
}

export interface CreateUserProps {
  name: string;
  email: string;
  password: string;
  role: UserRole;
}
