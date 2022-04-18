require("dotenv").config();
const express = require("express");
const router = express.Router();
const axios = require("axios");
const API_URL = process.env.API_URL;
const API_KEY = process.env.API_KEY;

// GET all results of searching by name
router.get("/", async (req, res) => {
    try {
        await axios.get(`${API_URL}?query=${req.query.q}&number=3&apiKey=${API_KEY}`)
            .then(response => {
                res.send(response.data);
            })
    }
    catch(err) {
        console.log(`Error while trying to search by name: ${err}`);
    }
});

module.exports = router;
