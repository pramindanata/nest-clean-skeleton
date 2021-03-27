import { User } from '@/domain';
import { ORMUser } from './entity';

export class ORMUserMapper {
  static toDomain(model: ORMUser): User {
    const user = new User(model);

    return user;
  }
}
