const express = require('express');
const router = express.Router();
const location = require('../models/location.js');

//create
router.post('/', async (req, res) => {
    try {
        const new_data = await location.create(req.body)
        res.json(new_data)
    } catch (error) {
        res.status(400).json(error);
    }
});

module.exports = router;