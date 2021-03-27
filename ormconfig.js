const env = process.env;

module.exports = {
  type: 'postgres',
  host: env.DB_HOST || 'localhost',
  port: (env.DB_PORT && parseInt(env.DB_PORT)) || 5432,
  database: env.DB_NAME || 'backup_reporter',
  username: env.DB_USER || 'postgres',
  password: env.DB_PASSWORD || '',
  logging: ['error'],
  entities: [`./dist/infra/persistence/db/entities/*/entity.js`],
  migrations: ['./src/infra/persistence/db/migrations/*.ts'],
  cli: {
    migrationsDir: `./src/infra/persistence/db/migrations`,
  },
};
