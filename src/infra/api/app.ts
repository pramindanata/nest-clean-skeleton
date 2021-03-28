import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { ArticleModule, UserModule } from '@/domain';
import { createConfig } from '@/core/config';
import { RepositoryModule, UtilModule } from '../di';
import { ArticleController, AuthController } from './controller';
import { State } from './middlewares';

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
    UserModule,
    ArticleModule,
  ],
  controllers: [AuthController, ArticleController],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(State).forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}
