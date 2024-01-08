const express = require('express');
const router = express.Router();
const Model = require('../models/model');

router.route('/')
    .get(async (req, res) => {
        try {
            const data = await Model.find();
            res.status(200).json(data);
        }
        catch (err) {
            next(err);
        }
    })
    .post(async (req, res) => {
        const data = new Model({
            name: req.body.name,
            age: req.body.age
        })

        try {
            const dataToSave = await data.save();
            res.status(200).json(dataToSave)
        }
        catch (err) {
            next(err);
        }
    });

router.route('/:id')
    .get(async (req, res) => {
        try {
            const data = await Model.findById(req.params.id);
            res.status(200).json(data);
        }
        catch (err) {
            next(err);
        }
    })
    .patch(async (req, res) => {
        try {
            const id = req.params.id;
            const updatedData = req.body;
            const options = { new: true };

            const result = await Model.findByIdAndUpdate(id, updatedData, options);

            res.send(result);
        }
        catch (err) {
            next(err);
        }
    })
    .delete(async (req, res) => {
        try {
            const id = req.params.id;
            const data = await Model.findByIdAndDelete(id)
            res.send(`Document with ${data.name} has been deleted..`)
        }
        catch (err) {
            next(err);
        }
    });

module.exports = router