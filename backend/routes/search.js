require("dotenv").config();
const express = require("express");
const router = express.Router();
const axios = require("axios");
const API_URL_COMPLEX = process.env.API_URL_COMPLEX;
const API_URL_INFO = process.env.API_URL_INFO;
const API_KEY = process.env.API_KEY;

// GET all results of searching by name
router.get("/", async (req, res) => {
	try {
		await axios
			.get(`${API_URL_COMPLEX}?query=${req.query.q}&number=3&apiKey=${API_KEY}`)
			.then((response) => {
				res.send(response.data);
			});
	} catch (err) {
		console.log(`Error while trying to search by name: ${err}`);
	}
});

// GET more info about recipe
router.get("/:id", async (req, res) => {
	try {
		const id = req.params.id;
		await axios
			.get(
				`${API_URL_INFO}/${id}/information?&includeNutrition=true&apiKey=${API_KEY}`
			)
			.then((response) => {
				res.send(response.data);
			});
	} catch (err) {
		console.log(`Error while trying to search by name: ${err}`);
	}
});

module.exports = router;
