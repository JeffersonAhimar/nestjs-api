import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';

import { DatabaseModule } from './database/database.module';

import { environments } from './environments';
import { UsersModule } from './users/users.module';
import { PostsModule } from './posts/posts.module';
import { RolesModule } from './roles/roles.module';
import { UsersRolesModule } from './users-roles/users-roles.module';
import { AuthModule } from './auth/auth.module';
import config from './config';

@Module({
  imports: [
    // config
    ConfigModule.forRoot({
      envFilePath: environments[process.env.NODE_ENV] || '.env',
      load: [config],
      isGlobal: true,
      // validationSchema: Joi.object({
      //   API_KEY: Joi.number().required(),
      //   DATABASE_NAME: Joi.string().required(),
      //   DATABASE_PORT: Joi.number().required(),
      // }),
    }),
    DatabaseModule,
    UsersModule,
    PostsModule,
    RolesModule,
    UsersRolesModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
