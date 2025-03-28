const { Router } = require('express');

const topicRouter = Router();

/*
  GET /api/topic
    - Respond with list of topics from database
    - Format: Array
    - Status: 200
*/
topicRouter.get('/', (req, res) => {
  res.sendStatus(200);
});

module.exports = topicRouter;