import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      // Only allow props through that have been specified in the appropriate DTO
      whitelist: true,
      // Automatically transform validated prop values into their specified types
      transform: true,
    })
  )
  const options = new DocumentBuilder()
    .setTitle("My API")
    .setVersion("1.0")
    .addBearerAuth()
    .build()
  const document = SwaggerModule.createDocument(app, options)
  SwaggerModule.setup("docs", app, document)
  await app.listen(3000);
}
bootstrap();
