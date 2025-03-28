const { Router } = require('express');

const suggestRouter = Router();

/*
  POST /api/suggest/topic
    - Send suggested topic in request body { suggestedTopic }
    - Store the topic in the SuggestedTopic table
    - Respond with 201 status
*/

suggestRouter.post('/topic', (req, res) => {
  res.sendStatus(201);
});

module.exports = suggestRouter;