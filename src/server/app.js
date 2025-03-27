const path = require('path');
const express = require('express');
const session = require('express-session');
const passport = require('passport');

const apiRouter = require('./routes');

const DIST_DIR = path.resolve(__dirname, '..', '..', 'dist');

const app = express();

app.use(express.static(DIST_DIR));
app.use(express.json());

app.use(session({
  name: 'google-auth-session',
  secret: process.env.SESSION_SECRET,
  resave: true,
  saveUninitialized: false,
  cookie: {
    maxAge: 60000 * 60,
  },
}));

app.use(passport.initialize());
app.use(passport.session());

app.use('/api', apiRouter);

app.get('/logout', (req, res) => {
  req.logout((error) => {
    if (error) {
      console.error('Failed to logout:', error);
      res.sendStatus(500);
    } else {
      req.session.destroy((err) => {
        if (err) {
          console.error('Error destroying session:', err);
          res.sendStatus(500);
        } else {
          res.clearCookie('google-auth-session');
          res.redirect('/');
        }
      })
    }
  })
});

app.get('*', (req, res) => {
  res.sendFile('index.html', { root: DIST_DIR });
});

module.exports = app;
