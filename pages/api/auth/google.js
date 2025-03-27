import passport from 'passport';
import '../../../lib/passport'; // Ensure Passport.js is initialized
import nextConnect from 'next-connect';

const handler = nextConnect()
  .use(passport.initialize())
  .get(passport.authenticate('google', { scope: ['profile', 'email'] }));

export default handler;