import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as session from 'express-session';
import * as passport from 'passport';
import { ValidationPipe } from '@nestjs/common';
import { join } from 'path';
import { NestExpressApplication } from '@nestjs/platform-express';
import { Reflector } from '@nestjs/core';

async function bootstrap() {
  // Create the app as a NestExpressApplication to use Express-specific features
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.enableCors({
    origin: 'http://localhost:3000', 
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
   });

  app.useGlobalPipes(new ValidationPipe());
  // app.useGlobalGuards(new RolesGuard(app.get(Reflector)));
  app.useStaticAssets(join(__dirname, '..', 'src', 'Image'), {
    prefix: '/images/',
  });

  await app.listen(8080);
}
bootstrap();
