const passport=require('passport');
const googleStrategy=require('passport-google-oauth').OAuth2Strategy;
const crypto=require('crypto');

const User=require('../model/user');

passport.use(new googleStrategy({
clientID:'281491999650-on62btf8mcamtkgr1m2h4cde5k2p2h57.apps.googleusercontent.com',
clientSecret:'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',
callbackURL:'http://localhost:8000/callback'
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