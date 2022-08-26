const express = require('express');
const router = express.Router();
const apiRoute = require('./routes/api')

const app = express();
const port = 3000;

app.use('/api', apiRoute);

// Invalid route handler
app.get('*', function (req, res) {
    res.status(404).send('Invalid route detected.');
})

app.listen(port, () => {
    console.log(`Server listening on port ${port}...`)
});