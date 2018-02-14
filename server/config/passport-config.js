const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcrypt')

const UserModel = require('../models/user-model')

// Serialize User to determine what to save in the session
passport.serializeUser((userFromDb, done) => {
  done(null, userFromDb._id)
})

// Determines what will be come "req.user" on every request
passport.deserializeUser((idFromSession, done) => {
  UserModel.findById(
    idFromSession, (err, userFromDb) => {
      if(err){
        done(err)
        return
      }
      done(null, userFromDb)
    }
  )
})

// LocalStrategy from Passport-Local
passport.use(
  new LocalStrategy(
    {
      usernameField: 'loginUsername',
      passwordField: 'loginPassword'
    },
    (sentUsername, sentPassword, done) => {
      UserModel.findOne(
        {username: sentUsername},
        (err, userFromDb) => {
          if(err){
            done(err);
            return;
          }
          if(!userFromDb){
            done(null, false, {message:'Thats not the right username'})
            return;
          }
          const isPasswordGood = bcrypt.compareSync(sentPassword, userFromDb.encryptedPassword)

          if(!isPasswordGood){
            done(null, false, {message:'thats not the right password'})
            return;
          }
          done(null, userFromDb)
        }
      )
    }
  ) // local strategy
)

// IG user login
const IgStrategy = require('passport-instgram').Strategy;

passport.use(
  new IgStrategy(
    {
      clientID: process.env.ig_app_id,
      clientSecret: process.env.ig_app_secret,
      callbackURL: '/auth/instagram/callback'
    },
    (accessToken, refreshToken, profile, done) => {
      UserModel.findOne(
        {instagramID: profile.id},

        (err, userFromDb) => {
          if(err){
            done(err);
            return;
          }

          if (userFromDb) {
            done(null, userFromDb);
            return;
          }

          const theUser = new UserModel({
            instagramID: profile.id
          });
          theUser.save((err) => {
            if(err) {
              done(err);
              return;
            }
            done(null, theUser);
          })
        }
      );
    }
  )
);

// start FB Stratagy

const FbStrategy = require('passport-facebook').Strategy;

passport.use(new FbStrategy(
  {
  clientID: process.env.fb_app_id,
  clientSecret: process.env.fb_app_secret,
  callbackURL: '/auth/facebook/callback'
  },
  (accessToken, refreshToken, profile, done) => {
    UserModel.findOne(
      {facebookID: profile.id},

      (err, userFromDb) => {
        if(err){
          done(err);
          return;
        }

        const theUser = new UserModel ({
          facebookID: profile.id,
          email: profile.displayName
        })
        theUser.save((err) => {
          if(err) {
            done(err);
            return;
          }
          done(null, theUser);
        })
      }
    )
  }
)
)
