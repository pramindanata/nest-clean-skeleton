export const createConfig = () => {
  const { env } = process;

  return {
    app: {
      host: env.APP_HOST || 'http://localhost',
      port: (env.APP_PORT && parseInt(env.APP_PORT)) || 4000,
      secret: env.APP_SECRET || 'my_secret_key',
    },
    db: {
      host: env.DB_HOST || 'localhost',
      port: (env.DB_PORT && parseInt(env.DB_PORT)) || 6379,
      name: env.DB_NAME || 'nest_clean',
      user: env.DB_USER || 'postgres',
      password: env.DB_PASSWORD || '',
    },
    redis: {
      host: env.REDIS_HOST || 'localhost',
      port: (env.REDIS_PORT && parseInt(env.REDIS_PORT)) || 6379,
      password: env.REDIS_PASSWORD || '',
      prefix: env.REDIS_PREFIX || '',
    },
  };
};

export interface ConfigVariables {
  'app.host': string;
  'app.port': number;
  'app.secret': string;
  'db.host': string;
  'db.port': number;
  'db.name': string;
  'db.user': string;
  'db.password': string;
  'redis.host': string;
  'redis.port': number;
  'redis.password': string;
  'redis.prefix': string;
}
