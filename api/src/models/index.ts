import Sequelize from 'sequelize';
import config from 'config';
import { dbConfig } from '@interfaces/db.interface';

import Users from './users.ts'

const { host, user, password, database }: dbConfig = config.get('dbConfig');

const sequelize = new Sequelize.Sequelize(database, user, password, {
  host: host,
  dialect: 'postgres',
  timezone: '-05:00',
});

sequelize.authenticate();

module.exports = {
  sequelize,
  Sequelize,
  Users: Users(sequelize),
};
