import { NestFactory } from '@nestjs/core';
import { AppModule, AllExceptionFilter } from './infra/api';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalFilters(new AllExceptionFilter());

  await app.listen(3000);
}

bootstrap();
