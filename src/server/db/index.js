const { Sequelize } =  require('@sequelize/core');
const { PostgresDialect } = require('@sequelize/postgres');


const database = new Sequelize({
  dialect: PostgresDialect,
  database: 'postgres',
  user: 'postgres',
  password: 'sudo',
  host: 'localhost',
  port: 5432,
  ssl: false,
  clientMinMessages: 'notice',
})



database.authenticate()
  .then(async () => {
    console.log('Connection to the database has been established.');
  })
  .catch((error) => {
    console.error('Unable to connect to the database:', error);
  });

module.exports = database