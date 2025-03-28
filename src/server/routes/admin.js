const { Router } = require('express');

const adminRouter = Router();

/*
  DELETE /api/admin/message/:id
    - Use the message id from path parameter to query and delete message
    - Validate that user is an admin FIRST
    - Respond with 200 status on successful deletion
*/
adminRouter.delete('/message/:id', (req, res) => {
  res.sendStatus(200);
});

/*
  DELETE /api/admin/topic/:id
    - Use the topic id from path parameter to query and delete topic
    - Validate that user is an admin FIRST
    - Respond with 200 status on successful deletion
*/
adminRouter.delete('/topic/:id', (req, res) => {
  res.sendStatus(200);
});

/*
  POST /api/admin/topic
    - Send topic name in request body { topic }
    - Validate that user is an admin FIRST
    - Store new topic in database
    - Respond with 201 status on successful write to database
*/
adminRouter.post('/topic', (req, res) => {
  res.sendStatus(201);
});

module.exports = adminRouter;