const express = require('express');
const app = express();
const port = 8000

// this is a comment by sujay
// this is a comment by gaurav
// this is a comment by jatin
app.get('/', (req, res) => {
    res.send('Hello');
})

app.listen(port, () => {
    console.log('Runing..')
})
