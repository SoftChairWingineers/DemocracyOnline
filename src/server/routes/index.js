const { Router } = require('express');

const authRouter = require('./auth');

const apiRouter = Router();

apiRouter.use('/auth', authRouter);

module.exports = apiRouter;
