const dotenv = require('dotenv');
dotenv.config();

const database = require('./db');
require('./db/models');

const app = require('./app');

const PORT = process.env.PORT || 3000;

app.listen(PORT, async () => {
  await database.sync({ alter: true });
  console.log(`Server listening at http://localhost:${PORT}`);
});
