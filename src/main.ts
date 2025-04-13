import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import { ValidationFilter } from './infra/validation/validation-filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['log', 'debug'],
  });
  app.use(cookieParser());
  app.enableCors({
    credentials: true,
    origin: 'http://localhost:3000', // Frontend origin
  });
  app.useGlobalFilters(new ValidationFilter());
  await app.listen(process.env.PORT ?? 3000);
}

bootstrap();
