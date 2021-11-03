const express = require('express');
const app = express();
const expressLayouts = require('express-ejs-layouts');
const path = require('path');
const port = 8000
const db = require('./config/mongoose');
const passport = require('passport');
const passportLocal = require('./config/passport');
const passportGoogle=require('./config/passport-google');
var bodyParser = require('body-parser');
const session = require('express-session');
const bidServer=require('http').Server(app);
const bidsocket=require('./config/socket').bidSocket(bidServer);
bidServer.listen(5000);
// this is a comment by sujay
// this is a comment by gaurav
// this is a comment by sujay
// this is a comment by jatin

// for the req.body
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true }));
app.use(expressLayouts)
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);

app.use(express.static(path.join(__dirname, '/assets')));
app.use('/css', express.static(path.join(__dirname, "node_modules/mdb-ui-kit/css")));
app.use('/js', express.static(path.join(__dirname, "node_modules/mdb-ui-kit/js")));

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
            maxAge: (10000 * 60 * 60)
        },
        
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

// 729677899083-21p08k4ll0orlp8gpe1trg5342c7cahe.apps.googleusercontent.com
// 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