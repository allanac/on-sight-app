const express = require('express')
const bcrpyt = require('bcrypt')
const passport = require('passport')

const UserModel = require('../models/user-model')

const router = express.Router()

// --- /API/GUEST  ---

//  ---- /API/SIGNUP
router.post('/signup', (req, res, next) => {
  if(!req.body.signupUsername || !req.body.signupPassword){
    res.status(400).json({errorMessage: 'Username & Password Required'})
    return;
  }

  UserModel.findOne(
    {username: req.body.signupUsername},
    (err, userFromDb) => {
      if(err){
        res.status(500).json({errorMessage:'Error finding username'})
        return
      }
      if(userFromDb){
        res.status(400).json({errorMessage:'Sorry! That username is taken'})
        return
      }
      const salt = bcrypt.genSaltSync(10)
      const hashPassword = bcrpyt.hashSync(req.body.signupPassword, salt)

      const theUser = new UserModel({
        username: req.body.signupUsername,
        encryptedPassword: hashPassword
      })

      theUser.save((err) => {
        if(err){
          res.status(500).json({errorMessage: 'Error saving user'})
          return
        }
        // log user in after sign up
        req.login(theUser, (err) => {
          if(err){
            res.status(500).json({ errorMessage: 'Error logging user in'})
            return
          }
          // clear out password from info sent
          theUser.encryptedPassword = undefined;
          res.status(200).json(theUser)
        })
      })
    }
  )
}) // --- POST api/signup

// ---- /API/LOGIN
router.post('/login', (req,res,next) => {
  const customAuthCallback =
    passport.authenticate('local', (err, theUser, extraInfo) => {
      if(err){
        res.status(500).json({errorMessage: 'Login failed'})
        return
      }
      if(!theUser){
        res.status(401).json({errorMessage: extraInfo.message})
        return
      }
      req.login(theUser, (err) => {
        if(err){
          res.status(500).json({errorMessage:'Login failed'})
          return
        }
        theUser.encrpytedPassword = undefined
        res.status(200).json(theUser)
      })
    })
    customAuthCallback(req, res, next)
}) // POST /api/login

//  --- /API/CHECKLOGIN
router.get('/checklogin', (req,res, next) => {
  let amIloggedIn = false

  if(req.user){
    req.user.encryptedPassword = undefined
    amIloggedIn = true
  }
  res.status(200).json(
    {
      isLoggedIn: amIloggedIn, userInfo: req.user
    }
  )
}) // -- GET /API/CHECKLOGIN

// ---- /API/LOGOUT
router.delete('/logout', (req, res, next) => {
  req.logout()
  res.status(200).json({successMessage:'Log out success!'})
})



module.exports = router
