import { Module, Global } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import config from './../config';

@Global()
@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      inject: [config.KEY],
      useFactory: (configService: ConfigType<typeof config>) => {
        const { user, host, dbName, password, port } = configService.mysql;
        return {
          type: 'mysql',
          host,
          port,
          username: user,
          database: dbName,
          password,
          synchronize: false,
          autoLoadEntities: true,
        };
      },
    }),
  ],
  providers: [
    {
      provide: 'API_KEY',
      // useValue: process.env.API_KEY,
      inject: [config.KEY],
      useFactory: (configService: ConfigType<typeof config>) =>
        configService.apiKey,
    },
  ],
  exports: ['API_KEY', TypeOrmModule],
})
export class DatabaseModule {}
