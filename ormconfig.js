const env = process.env;

module.exports = {
  type: 'postgres',
  host: env.DB_HOST || 'localhost',
  port: (env.DB_PORT && parseInt(env.DB_PORT)) || 5432,
  database: 'nest_clean',
  username: env.DB_USER || 'postgres',
  password: env.DB_PASSWORD || '',
  logging: ['error'],
  entities: [`./dist/infra/persistence/db/entities/*/entity.js`],
  migrations: ['./dist/infra/persistence/db/migrations/*.js'],
  cli: {
    migrationsDir: `./dist/infra/persistence/db/migrations`,
  },
};
