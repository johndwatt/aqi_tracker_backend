const express = require('express');
const router = express.Router();
const location = require('../models/location.js');
require('dotenv').config({});
const fetch = require('node-fetch');

//show
router.post('/', async (req, res) =>
{
  try {
    const locationData = await location.findOne({ city: req.body.city, state: req.body.state });

    if (!locationData) {
      console.log("NO")
      const URL = `${process.env.IQAIR_URL}&state=${req.body.state}&city=${req.body.city}&key=${process.env.IQAIR_KEY}`;
      const data = await fetch(URL);
      const updatedData = await data.json();

      if (updatedData.status === "success") {
        console.log("SUCCESS")
        const modifiedData =
        {
          city: req.body.city,
          state: req.body.state,
          air_quality: updatedData.data.current.pollution.aqius
        }

        const new_data = await location.create(modifiedData);
        return res.status(201).json(new_data);
      }
      else {
        console.log("FAIL")
        return res.status(400).json(updatedData);
      }
    }
    else {
      console.log("YES")
      return res.status(200).json(locationData);
    }
  }
  catch (error) {
    console.log(error);
    return res.status(400).json(error);
  }
})

module.exports = router;