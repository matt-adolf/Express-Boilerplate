const express = require('express');
const router = express.Router();
const usersRoute = require('./users.route');

router.route('/')
    .get((req, res) => {
        res.status(200).send('APIs');
    })
    .post((req, res) => {
        const body = req.body;
        if (!body || Object.keys(body).length === 0) {
            res.status(400).send({
                status: 400,
                message: "Bad Request",
                details: "POST Data Missing"
            })
        }
        else {
            res.status(200).send(body);
        }
    });

router.use('/users', usersRoute);

router.route('/:id')
    .get((req, res) => {
        const { id } = (req.params); // {id: 'test'}
        res.status(200).send(`Parameter Provided: ${id}`);
    });

module.exports = router