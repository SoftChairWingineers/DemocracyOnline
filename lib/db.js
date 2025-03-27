import { Sequelize } from '@sequelize/core';
import { PostgresDialect } from '@sequelize/postgres';

const sequelize = new Sequelize({
  dialect: PostgresDialect,
  database: 'postgres',
  user: 'postgres',
  password: 'sudo',
  host: 'localhost',
  port: 5432,
  ssl: false,
  clientMinMessages: 'notice',
})
try {
  await sequelize.authenticate();
  console.log('Connection has been established successfully.');
  sequelize
  .sync({alter: true})
  .then(() => {
    console.log('synced database')
  }) 
} catch (error) {
  console.error('Unable to connect to the database:', error);
}
export default sequelize