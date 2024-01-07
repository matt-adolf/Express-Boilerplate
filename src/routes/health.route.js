const express = require('express')
const router = express.Router();

router.route('/')
    .get((req, res, next) => {
        const healthcheck = {
            update: process.uptime(),
            message: 'OK',
            timestamp: Date.now()
        }
        try {
            res.status(200).send(healthcheck);
        }
        catch (err) {
            healthcheck.message = err;
            res.status(503).send();
        }

    });

module.exports = router