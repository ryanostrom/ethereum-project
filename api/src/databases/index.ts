import config from 'config';
import Sequelize from 'sequelize';
import { dbConfig } from '@interfaces/db.interface';
import { logger } from '@utils/logger';

const { host, user, password, database }: dbConfig = config.get('dbConfig');

const sequelize = new Sequelize.Sequelize(database, user, password, {
  host: host,
  dialect: 'postgres',
  timezone: '-05:00',
});

sequelize.authenticate();

const DB = {
  sequelize, // connection instance (RAW queries)
  Sequelize, // library
};

export default DB;
