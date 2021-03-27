import { AbstractRepository, EntityRepository } from 'typeorm';
import { CreateUserProps, User, UserRepositoryContract } from '@/domain';
import { ORMUser, ORMUserMapper } from '../entities';

@EntityRepository(ORMUser)
export class ORMUserRepository extends AbstractRepository<ORMUser>
  implements UserRepositoryContract {
  async getDetail(id: string): Promise<User | undefined> {
    const user = await this.repository.findOne(id);

    return user && ORMUserMapper.toDomain(user);
  }

  async getDetailByEmail(email: string): Promise<User | undefined> {
    const user = await this.repository.findOne({ email });

    return user && ORMUserMapper.toDomain(user);
  }

  async create(props: CreateUserProps): Promise<User> {
    const { name, email, password, role } = props;
    const user = await this.repository.save({
      name,
      email,
      password,
      role,
    });

    return ORMUserMapper.toDomain(user);
  }
}
