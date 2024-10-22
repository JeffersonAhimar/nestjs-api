import { registerAs } from '@nestjs/config';

export default registerAs('config', () => {
  return {
    apiKey: process.env.API_KEY,
    port: parseInt(process.env.PORT),
    mysql: {
      host: process.env.MYSQL_HOST,
      user: process.env.MYSQL_USER,
      password: process.env.MYSQL_PASSWORD,
      port: parseInt(process.env.MYSQL_PORT),
      dbName: process.env.MYSQL_DB,
    },
    jwtSecret: process.env.JWT_SECRET,
    jwtExpiration: process.env.JWT_EXPIRATION,
    jwtRefreshSecret: process.env.JWT_REFRESH_SECRET,
    jwtRefreshExpiration: process.env.JWT_REFRESH_EXPIRATION,
  };
});
