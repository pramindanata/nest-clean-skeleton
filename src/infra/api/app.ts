import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { ArticleModule, UserModule } from '@/domain';
import { createConfig } from '@/core/config';
import { RepositoryModule, UtilModule } from '../di';
import { AuthController } from './controller';

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
  controllers: [AuthController],
})
export class AppModule {}
