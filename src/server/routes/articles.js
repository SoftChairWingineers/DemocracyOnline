const { Router } = require('express');
const dotenv = require('dotenv');
const axios = require('axios');

dotenv.config();

const { GNews_API } = process.env;

const articlesRouter = Router();

articlesRouter.get('/articles', (res, req) => {
  // Make request to GNews API
  axios.get(`https://gnews.io/api/v4/top-headlines?lang=en&country=us&max=10&apikey=${GNews_API}`)
  .then((articles) => {
    console.log(articles);
    res.statusCode(200).send(articles);
  })
  .catch((err) => {
    console.error('Error with request to GNews in articles router: ', err);
  });
})

module.exports = articlesRouter;
