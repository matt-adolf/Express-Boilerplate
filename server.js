const express = require('express');
const router = express.Router();
const apiRoute = require('./routes/api');
const cors = require('cors');

const app = express();
app.use(express.json()); // body parser
const PORT = process.env.PORT || 3000;
/*app.use(cors({
    origin: true, //included origin as true
    credentials: true,
}));*/

if (process.env.NODE_ENV === "development") {
    console.log("Mode: Development")
    app.use(
        cors({
            origin: `http://localhost:9000`,
            credentials: true,
        })
    );
}
else {
    console.log("Mode: Production")
    app.use(
        cors({
            origin: "",
            credentials: true,
        })
    );
}

app.use('/api', apiRoute);

// Invalid route handler
app.get('*', function (req, res) {
    res.status(404).send('Invalid route detected.');
})

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}...`)
});