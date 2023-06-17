import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {PrismaService} from "./prisma.service";
import {ValidationPipe} from "@nestjs/common";
import {DocumentBuilder, SwaggerModule} from "@nestjs/swagger";

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  const prismaService = app.get(PrismaService)
  await prismaService.enableShutdownHooks(app)

  app.setGlobalPrefix('api')
  app.enableCors()
  app.useGlobalPipes(new ValidationPipe())

  const swaggerConfig = new DocumentBuilder()
    .addBearerAuth()
    .setTitle('Online store API with NestJS')
    .setDescription('API developed for online store backend')
    .setVersion('1.0')
    .addTag('Online store')
    .build();

  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('documentation', app, document)

  const PORT = process.env.PORT || 3000
  await app.listen(PORT, () => console.log(`Server has been started on PORT: ${PORT}!`))
}
bootstrap();
