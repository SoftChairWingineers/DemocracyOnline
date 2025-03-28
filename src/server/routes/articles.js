const { Router } = require('express');
const dotenv = require('dotenv');
const axios = require('axios');

dotenv.config();

const { GNEWS_API } = process.env;

const articlesRouter = Router();

articlesRouter.get('/', (req, res) => {
  // Make request to GNews API
  axios.get(`https://gnews.io/api/v4/top-headlines?lang=en&country=us&max=10&apikey=${GNEWS_API}`)
  .then((response) => {
    res.status(200).send(response.data);
  })
  .catch((err) => {
    console.error('Error with request to GNews in articles router: ', err);
    res.sendStatus(500);
  });
})

module.exports = articlesRouter;
