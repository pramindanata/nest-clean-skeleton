import { Connection, getCustomRepository } from 'typeorm';
import { Global, Module } from '@nestjs/common';
import { RepositoryDIToken } from '@/domain';
import { ORMArticleRepository, ORMUserRepository } from '../persistence/db';

const { ArticleRepositoryContract, UserRepositoryContract } = RepositoryDIToken;

@Global()
@Module({
  providers: [
    {
      provide: ArticleRepositoryContract,
      useFactory: () => getCustomRepository(ORMArticleRepository),
      inject: [Connection],
    },
    {
      provide: UserRepositoryContract,
      useFactory: () => getCustomRepository(ORMUserRepository),
      inject: [Connection],
    },
  ],
  exports: [ArticleRepositoryContract, UserRepositoryContract],
})
export class RepositoryModule {}
