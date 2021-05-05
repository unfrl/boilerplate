import { ConnectionOptions } from 'typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

// TODO: this is only for dev
export const dbConfig: ConnectionOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'local',
  password: 'local',
  database: 'dev-database',
  synchronize: true,
  namingStrategy: new SnakeNamingStrategy(),
};
