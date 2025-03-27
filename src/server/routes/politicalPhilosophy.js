const { Router } = require('express');
const User = require('../db/models/User');
const PoliticalView = require('../db/models/PoliticalViews');

const politicalPhilosophyRouter = Router();

politicalPhilosophyRouter.get('/getTopics', (req, res) => {
  console.log(req.user.dataValues.email, 'on the req')
  PoliticalView.findOrCreate(
    {
      where: {
        email: req.user.dataValues.email,
      },
    }
  ).then((value) => {
    console.log(value)
    console.log('success getting poliview')
    res.status(200).send(value);
  }).catch((err) => {
    console.error('failed getting poliview', error)
    res.sendStatus(404);
  })
})

module.exports = politicalPhilosophyRouter;