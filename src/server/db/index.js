const { Sequelize } = require('sequelize');

const database = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'postgres',
  logging: false, // Set to `true` if you want to see queries
});

database.authenticate()
  .then(async () => {
    await database.sync({ alter: true });
    console.log('Connection to the database has been established.');
  })
  .catch((error) => {
    console.error('Unable to connect to the database:', error);
  });

module.exports = database;
