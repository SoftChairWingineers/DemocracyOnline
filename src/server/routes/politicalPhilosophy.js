const { Router } = require('express');
const User = require('../db/models/User');

const politicalPhilosophyRouter = Router();

politicalPhilosophyRouter.get('/getTopics', (req, res) => {
  res.status(200).send('great job');
})

module.exports = politicalPhilosophyRouter;