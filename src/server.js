require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const apiRoute = require('./routes/api.route');
const healthRoute = require('./routes/health.route');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const ErrorHandler = require('./middleware/ErrorHandler');
const mongoString = process.env.DATABASE_URL || 'mongodb://localhost:27017';

mongoose.connect(mongoString);
const database = mongoose.connection;

database.on('error', (error) => {
    console.log(error)
})

database.once('connected', () => {
    console.log('Database Connected');
})

const app = express();
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

app.use(express.json()); // support json encoded bodies
app.use(express.urlencoded({ extended: true })); // support encoded bodies
app.use(cookieParser());

app.use('/api', apiRoute);
app.use('/health', healthRoute);

app.use(ErrorHandler); // Error handler middleware

// Invalid route handler
app.get('*', function (req, res) {
    res.status(404).send('Invalid route detected.');
})

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}...`)
});