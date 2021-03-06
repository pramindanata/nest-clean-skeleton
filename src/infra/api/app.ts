import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { SharedDomainModule, UserDomainModule } from '@/domain';
import { createConfig } from '@/core/config';
import { RepositoryModule, UtilModule } from '../di';
import { ArticleAPIModule, AuthAPIModule, StateBuilder } from './modules';

@Module({
  imports: [
    /**
     * Global
     */
    ConfigModule.forRoot({
      load: [createConfig],
      isGlobal: true,
    }),
    TypeOrmModule.forRoot(),
    RepositoryModule,
    UtilModule,

    /**
     * Domain
     * StateBuilder need UserDomainModule
     */
    SharedDomainModule,
    UserDomainModule,

    /**
     * API
     */
    AuthAPIModule,
    ArticleAPIModule,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(StateBuilder)
      .forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}
