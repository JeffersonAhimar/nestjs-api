import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';

import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';
import { RolesGuard } from './auth/guards/roles.guard';
import { ConfigType } from '@nestjs/config';
import config from './config';
import { Mysql1451ExceptionFilter } from './common/filters/typeorm/mysql/mysql-1451-exception.filter';
import { Mysql1062ExceptionFilter } from './common/filters/typeorm/mysql/mysql-1062-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Global Pipes
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // ignore
      forbidNonWhitelisted: true, // alert extra properties
      transformOptions: {
        enableImplicitConversion: true, // query param -> int if it's a number
      },
    }),
  );

  // Global Interceptors
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector))); // to transform data before return, eg. exclude

  // Global Guards (execute in order from left to right) JwtAuthGuard -> RolesGuard -> ...
  app.useGlobalGuards(
    app.get(JwtAuthGuard), // authentication for all controllers - @Public() to pass
    app.get(RolesGuard), // role-based access control
  );

  // Global Exception Filter
  // app.useGlobalFilters(new TypeormExceptionFilter());
  app.useGlobalFilters(
    new Mysql1451ExceptionFilter(),
    new Mysql1062ExceptionFilter(),
  );

  // Swagger Config
  const swaggerConfig = new DocumentBuilder()
    .setTitle('API')
    .setDescription('JeffersonAhimar')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('docs', app, document);

  // Port with env variables
  const configService = app.get<ConfigType<typeof config>>(config.KEY);
  await app.listen(configService.port);
}
bootstrap();
