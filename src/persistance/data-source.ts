import { DataSource } from 'typeorm';

const connection = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'postgres',
  database: 'demo',
  entities: ['src/entities/*.ts'],
  migrations: ['src/migrations/*.ts']
});

export default connection;
