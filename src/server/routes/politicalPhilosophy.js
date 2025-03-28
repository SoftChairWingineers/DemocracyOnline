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

politicalPhilosophyRouter.post('/UpdateView', (req, res) => {
  const { body } = req.body;
  const { topic, views } = body;
  console.log(topic)
  console.log(views)
  const stringViews = JSON.stringify(views);
  PoliticalView.findOrCreate(
    {
      where: {
        email: req.user.dataValues.email,
      }
    },
  ).then((value) => {
    console.log(topic);
    value[0].update({ [topic]: stringViews})
    .then((updated) => {
      console.log(updated, 'Successfully updated politicalView Table from PhilosophyRouter UpdateView Route')
      res.sendStatus(201)
    }).catch((error) => {
      console.error('FAIL PoliticalPhilosophyRouter, UpdateView Route')
      res.sendStatus(500);
    }).catch((error) => {
      console.error('FAIL to findOrCreate Political View w/ matching email')
      res.sendStatus(500);
    })
  })
})

module.exports = politicalPhilosophyRouter;