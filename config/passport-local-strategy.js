 const passport = require('passport');

 const LocalStrategy = require('passport-local').Strategy;

 const User = require('../models/user');

 //authentication using passport
 passport.use(new LocalStrategy({
    usernameField: 'email',
    passReqToCallback: true
    },
    function(req,email,password,done){
            //find user and establish the identity
        User.findOne({email:email},function(err,user){
            if(err){
                req.flash('error',err);
                //console.log('error while finding user--Passport');
                return done(err);
            }
            if(!user || user.password != password){
                //console.log('Invalid username/password');
                req.flash('error','Invalid username/password');
                return done(null, false);
            }
            return done(null,user);
            
        });
    }
 ));

 //serializing the user to decide which key is to be kept in the cookie
 passport.serializeUser(function(user,done){
    done(null,user.id);
 });

 //deserializing the user from the key in the cookie
 passport.deserializeUser(function(id,done){
    User.findById(id, function(err,user){
        if(err){
            console.log('error while finding the user --> passport');
            return done(err);
        }
        return done(null,user);
     });
 });

 //check if the user is authenticated
 passport.checkAuthentication = function(req,res,next){
    //if the user is signed in, then pass on the request to the next function(controller's action)
    if(req.isAuthenticated()){
        return next();
    }
    //if the user is not signed in
    return res.redirect('/users/sign-in');
 }

 passport.setAuthenticatedUser = function(req,res,next){
    if(req.isAuthenticated()){
        // req.user conatins the current signed in user from the signed in cookie
        // and we are just sending for locals to views
        res.locals.user = req.user;
    }
    next();
 }
  

 module.exports = passport;