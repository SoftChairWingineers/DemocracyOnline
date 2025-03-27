const { Router } = require('express');

const messageRouter = Router();

/*
  POST /api/message
    - Send fact checked and neutralized message in request body with topic ID: { post: { message, topicId, replyId? } }
    - Store message in database with topic ID and user ID
      - If the message is replying to a specific message, include the id of the message being replied to
    - Send status 201 for successful POST
*/
messageRouter.post('/', (req, res) => {
  res.sendStatus(201);
});

/*
  GET /api/message/:topicId
    - Include the id of the topic in the path parameters
    - Search for messages from the topic
      - Order messages from newest to oldest
    - Set status 200
    - Send back the array of message objects
*/
messageRouter.get('/:topicId', (req, res) => {
  res.sendStatus(200);
});

module.exports = messageRouter;