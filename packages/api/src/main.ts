import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

import { AppModule } from './app.module';

const port = process.env.PORT || 1337;
const corsOptions = {
  origin: ['http://localhost:3000'],
};

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const options = new DocumentBuilder().setTitle('API').setVersion('1.0').addBearerAuth().build();
  const document = SwaggerModule.createDocument(app, options);

  SwaggerModule.setup('swagger', app, document);

  // Bind all endpoints to be automatically checked for incorrect data
  // https://docs.nestjs.com/techniques/validation#auto-validation
  app.useGlobalPipes(new ValidationPipe());

  app.enableCors(corsOptions);

  await app.listen(port);
}
bootstrap();
