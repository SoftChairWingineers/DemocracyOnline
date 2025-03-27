const { Router } = require('express');

const authRouter = require('./auth');
const politicalPhilosophyRouter = require('./politicalPhilosophy');

const apiRouter = Router();

apiRouter.use('/auth', authRouter);
politicalPhilosophyRouter.use('/politicalPhilosophy', politicalPhilosophyRouter);

module.exports = apiRouter;
