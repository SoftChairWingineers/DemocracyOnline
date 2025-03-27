const { Router } = require('express');
const passport = require('passport');
require('../passport');

const authRouter = Router();

authRouter.get('/google', passport.authenticate('google', {
  scope: ['email', 'profile'],
}));

authRouter.get('/google/callback', passport.authenticate('google', {
  successRedirect: '/api/auth/success',
  failureRedirect: '/api/auth/failure',
}));

authRouter.get('/success', (req, res) => {
  if (!req.user) {
    res.redirect('/api/auth/failure');
  } else {
    res.redirect('/dashboard');
  }
});

authRouter.get('/failure', (req, res) => {
  res.redirect('/');
});

module.exports = authRouter;
