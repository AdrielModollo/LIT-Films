import dotenv from 'dotenv';

dotenv.config();

export default {
  type: "postgres",
  host: process.env.DB_HOST || "node_db",
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  synchronize: true,
  logging: false,
  entities: [
    "./src/entities/*.ts",
    "./src/modules/**/infra/typeorm/entities/*.ts"
  ],
  migrations: [
    "./src/database/migrations/*.ts"
  ],
  cli: {
    migrationsDir: "./src/database/migrations"
  }
};
