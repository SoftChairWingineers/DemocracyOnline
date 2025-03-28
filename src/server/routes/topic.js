const { Router } = require('express');

const Topic = require('../db/models/Topic');

const topicRouter = Router();

/*
  GET /api/topic
    - Respond with list of topics from database
    - Format: Array
    - Status: 200
*/
topicRouter.get('/', async (req, res) => {
  try {
    const topics = await Topic.findAll({
      order: [
        ['name', 'ASC'],
      ],
    });
    res.status(200).send(topics);
  } catch (error) {
    console.error('Failed to GET /api/topic ', error);
    res.sendStatus(500);
  }
  
});

module.exports = topicRouter;