const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const User = require('../model/user');

passport.use(new LocalStrategy({
    usernameField: 'email',
    passReqToCallback: true
},
    function (req, email, password, done) {
        User.findOne({ email: email }, (err, user) => {
            if (err)
                return done(err);

            if (!user || user.password != password) {
                return done(null, false);
            }
            return done(null, user);
        });
    }
));

passport.serializeUser(function (user, done) {
    // console.log("serializing the cookie");
    done(null, user.id);
})

passport.deserializeUser((id, done) => {
    // console.log("Deserializing the cookie")
    User.findById(id, (err, user) => {
        if (err)
            return done(err);

        return done(null, user);
    })
})

// a custome middleware for checking authentication

passport.CheckAuth = function (req, res, next) {
    if (req.isAuthenticated()) {
        // console.log("Authenticated");
        return next();
    }

    return res.redirect('/login');
}

// a custome middleware for settin up the info of the user available to all ejs file where needed

passport.SetAuthUserInfo = function (req, res, next) {

    if (req.isAuthenticated()) {
        res.locals.user = req.user;
    }
    return next();
}

module.exports = passport;