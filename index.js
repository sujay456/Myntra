const express = require('express');
const app = express();
const expressLayouts = require('express-ejs-layouts');

const port = 8000

// this is a comment by sujay
// this is a comment by gaurav
// this is a comment by sujay
// this is a comment by jatin

app.set('view engine', 'ejs');
app.set('views', './views');

app.use('/', require('./routes/index'));


app.listen(port, (err) => {

    if (err) {
        console.log("Error in running the server")
    }
    console.log('Runing on port 8000 ..')
})
