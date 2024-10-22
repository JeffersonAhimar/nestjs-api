import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { environments } from './environments';
import config from './config';

import { DatabaseModule } from './database/database.module';
import { UsersModule } from './users/users.module';
import { PostsModule } from './posts/posts.module';
import { RolesModule } from './roles/roles.module';
import { UsersRolesModule } from './users-roles/users-roles.module';
import { AuthModule } from './auth/auth.module';
import { EnvModule } from './env/env.module';
import { envSchema } from './env/env';

@Module({
  imports: [
    // config
    ConfigModule.forRoot({
      envFilePath: environments[process.env.NODE_ENV] || environments.dev,
      load: [config],
      isGlobal: true,
      validate: (env) => envSchema.parse(env), // using zod
    }),
    EnvModule,
    DatabaseModule,
    UsersModule,
    PostsModule,
    RolesModule,
    UsersRolesModule,
    AuthModule,
    EnvModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
