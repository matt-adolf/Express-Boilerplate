const express = require('express');
const router = express.Router();
const apiRoute = require('./routes/api')

const app = express();
const port = 3000;

app.get('/', (req, res) => {
    res.send('Hello World!')
});

app.use('/api', apiRoute);

app.listen(port, () => {
    console.log(`Server listening on port ${port}...`)
});