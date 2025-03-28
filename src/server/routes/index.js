const { Router } = require('express');

const authRouter = require('./auth');
const politicalPhilosophyRouter = require('./politicalPhilosophy');
const adminRouter = require('./admin');
const aiRouter = require('./ai');
const messageRouter = require('./message');
const suggestRouter = require('./suggest');
const topicRouter = require('./topic');
const articlesRouter = require('./articles');

const apiRouter = Router();

apiRouter.use('/auth', authRouter);
apiRouter.use('/politicalPhilosophy', politicalPhilosophyRouter);
apiRouter.use('/admin', adminRouter);
apiRouter.use('/ai', aiRouter);
apiRouter.use('/message', messageRouter);
apiRouter.use('/suggest', suggestRouter);
apiRouter.use('/topic', topicRouter);
apiRouter.use('/articles', articlesRouter);

module.exports = apiRouter;
