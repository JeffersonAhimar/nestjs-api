import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';

import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';
import { RolesGuard } from './auth/guards/roles.guard';
import { ConfigType } from '@nestjs/config';
import config from './config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // 1. Global Pipes
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // ignore
      forbidNonWhitelisted: true, // alert extra properties
      transformOptions: {
        enableImplicitConversion: true, // query param -> int if it's a number
      },
    }),
  );

  // 2. Global Interceptors
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector))); // to transform data before return, eg. exclude

  // 3. Global Guards (execute in order from left to right) JwtAuthGuard -> RolesGuard -> ...

  app.useGlobalGuards(
    app.get(JwtAuthGuard), // authentication for all controllers - @Public() to pass
    app.get(RolesGuard), // role-based access control
  );

  // 4. Swagger Config
  const swaggerConfig = new DocumentBuilder()
    .setTitle('API')
    .setDescription('JeffersonAhimar')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('docs', app, document);

  // port with env variables
  const configService = app.get<ConfigType<typeof config>>(config.KEY);
  await app.listen(configService.port);
}
bootstrap();
