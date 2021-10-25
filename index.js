const express = require('express');
const app = express();
const port = 8000

// this is a comment by gaurav
app.get('/', (req, res) => {
    res.send('Hello');
})

app.listen(port, () => {
    console.log('Runing..')
})