import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { createConfig } from '@/core/config';
import { UtilModule } from '../utils';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [createConfig],
      isGlobal: true,
    }),
    UtilModule,
  ],
})
export class AppModule {}
