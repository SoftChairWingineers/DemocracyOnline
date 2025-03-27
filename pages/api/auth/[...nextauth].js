import NextAuth from 'next-auth'
// import AppleProvider from 'next-auth/providers/apple'
// import FacebookProvider from 'next-auth/providers/facebook'
import GoogleProvider from 'next-auth/providers/google'
// import EmailProvider from 'next-auth/providers/email'
import sequelize from '../../../lib/db';
import User from '../../../models/User';

export default NextAuth({
  providers: [
    // OAuth authentication providers...
    // AppleProvider({
    //   clientId: process.env.APPLE_ID,
    //   clientSecret: process.env.APPLE_SECRET
    // }),
    // FacebookProvider({
    //   clientId: process.env.FACEBOOK_ID,
    //   clientSecret: process.env.FACEBOOK_SECRET
    // }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET
    }),
    // Passwordless / email sign in
    // EmailProvider({
    //   server: process.env.MAIL_SERVER,
    //   from: 'NextAuth.js <no-reply@example.com>'
    // }),
  ],
  callbacks: {
    async signIn({ account, profile }) {
      if (account.provider === "google") {
        console.log('aaaaaaaaaaaayyyyyyyyye')
        console.log(profile)
        User.findOrCreate({
          where: {
            firstName: profile.given_name,
          },
          defaults: {
            firstName: profile.given_name,
            email: profile.email,
            lastName: profile.family_name,
            picture: profile.picture,
          },
        }).then((value) => {
          console.log(value, 'WE GOT UR ANSWER');
        }).catch((err) => {
          console.error('nopeee', err)
        })
      }
      return true // Do different verification for other providers that don't have `email_verified`
    },
  },

  // pages: {
  //   signIn: '/auth/login',
  //   signOut: '/auth/signout',
  //   error: '/auth/error', // Error code passed in query string as ?error=
  //   verifyRequest: '/auth/verify-request', // (used for check email message)
  //   newUser: '/auth/new-user' // New users will be directed here on first sign in (leave the property out if not of interest)
  // }
})