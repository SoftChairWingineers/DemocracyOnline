const dotenv = require('dotenv');
dotenv.config();

const database = require('./db');
const app = require('./app');

const PORT = process.env.PORT || 3000;

app.listen(PORT, async () => {
  await database.sync({ force: true });
  console.log(`Server listening at http://localhost:${PORT}`);
});
