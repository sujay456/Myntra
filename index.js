const express = require('express');
const app = express();
const expressLayouts = require('express-ejs-layouts');
const path = require('path');
const port = 8000
const db = require('./config/mongoose');
const passport = require('passport');
const passportLocal = require('./config/passport');
const session = require('express-session');
// this is a comment by sujay
// this is a comment by gaurav
// this is a comment by sujay
// this is a comment by jatin

// for the req.body
app.use(express.urlencoded({ extended: false }));

app.use(expressLayouts)
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);

app.use(express.static(path.join(__dirname, '/assets')));
app.use(expressLayouts);

app.set('view engine', 'ejs');
app.set('views', './views');

app.use(session(
    {
        name: 'myntra',
        secret: 'GauravisProCoder',
        saveUninitialized: false,
        resave: true,
        cookie: {
            maxAge: (1000 * 60 * 60)
        }
    }
))

//passport stuff
app.use(passport.initialize());
app.use(passport.session());
app.use(passport.SetAuthUserInfo);

app.use('/', require('./routes/index'));

app.listen(port, (err) => {

    if (err) {
        console.log("Error in running the server")
    }
    console.log('Runing on port 8000 ..')
})
