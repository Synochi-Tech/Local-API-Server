import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = app.get(ConfigService);

  app.useGlobalPipes(new ValidationPipe());
  app.enableCors();

  const PORT = config.get('PORT');
  await app.listen(PORT, () => {
    console.log(`Listing on ${PORT}`);
  });
}
bootstrap();
