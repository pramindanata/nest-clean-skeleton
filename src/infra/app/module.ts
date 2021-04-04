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
import { StateBuilder } from './shared';
import { AuthAppModule } from './auth';
import { ArticleAppModule } from './article';

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
     */
    SharedDomainModule,
    UserDomainModule,

    /**
     * API
     */
    AuthAppModule,
    ArticleAppModule,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(StateBuilder)
      .forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}
