import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/app/app.module';
import { ConfigService } from '@nestjs/config';

import { setupSwagger } from './swagger';
import { RedisService } from './modules/shared/redis.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['error', 'warn', 'debug', 'verbose', 'log'],
  });

  app.enableCors();
  const configService = app.get(ConfigService);
  setupSwagger(app);

  const redisApp = await app.get<RedisService>(RedisService);
  await redisApp.connect();

  await app.listen(configService.get<number>('PORT'));
}
bootstrap();
