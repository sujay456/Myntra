const passport=require('passport');
const googleStrategy=require('passport-google-oauth').OAuth2Strategy;
const crypto=require('crypto');
const env=require('./environment');
const User=require('../model/user');

passport.use(new googleStrategy({
clientID:env.google_clientID,
clientSecret:env.google_clientSecret,
callbackURL:env.google_callbackURL,
},
    function(accessToken,refreshToken,profile,done){
        User.findOne({email:profile.emails[0].value}).exec(function(err,user){
            if(err)
            {
                console.log("Error in google oath",err);
                return;
            }

            if(user)
                return done(null,user);
            else
            {
                User.create({
                    name:profile.displayName,
                    email:profile.emails[0].value,
                    password:crypto.randomBytes(20).toString('hex'),
                    points:0
                },function(err,user){
                    if(err)
                    {
                        console.log('Error in google passport',err);
                        return;
                    }
                    return done(null,user);
                })
            }
        })
    }
))

module.exports=passport;