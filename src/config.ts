import { registerAs } from '@nestjs/config';

export default registerAs('config', () => {
  return {
    // database: {
    //   name: process.env.DATABASE_NAME,
    //   port: parseInt(process.env.DATABASE_PORT),
    // },
    // postgres: {
    //   host: process.env.POSTGRES_HOST,
    //   user: process.env.POSTGRES_USER,
    //   password: process.env.POSTGRES_PASSWORD,
    //   port: parseInt(process.env.POSTGRES_PORT),
    //   dbName: process.env.POSTGRES_DB,
    // },
    mysql: {
      host: process.env.MYSQL_HOST,
      user: process.env.MYSQL_USER,
      password: process.env.MYSQL_PASSWORD,
      port: parseInt(process.env.MYSQL_PORT),
      dbName: process.env.MYSQL_DB,
    },
    apiKey: process.env.API_KEY,
    jwtSecret: process.env.JWT_SECRET,
    jwtExpiration: process.env.JWT_EXPIRATION,
    jwtRefreshSecret: process.env.JWT_REFRESH_SECRET,
    jwtRefreshExpiration: process.env.JWT_REFRESH_EXPIRATION,
  };
});
