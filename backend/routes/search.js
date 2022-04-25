require("dotenv").config();
const express = require("express");
const router = express.Router();
const axios = require("axios");
const moment = require("moment");
const RandomRecipe = require("../models/random-recipe");
const API_URL_COMPLEX = process.env.API_URL_COMPLEX;
const API_URL_INFO = process.env.API_URL_INFO;
const API_URL_RANDOM = process.env.API_URL_RANDOM;
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

// GET random recipes
router.get("/random", async(req, res) => {
	try {
		// await axios.get(`${API_URL_RANDOM}?number=3&apiKey=${API_KEY}`)
		// 	.then((response) => {
		// 		res.send(response.data);
		// 	})
		// get all random recipes
		const randomRecipes = await RandomRecipe.find({});

		// if there are random recipes
		if(randomRecipes.length !== 0) {
			const testRecipeDate = randomRecipes[0].date;
			const testDateMoment = moment(testRecipeDate, 'MM-DD-YYYY');
			console.log(testRecipeDate);
			let today = moment().subtract(1, 'd');
			if(today.isAfter(testDateMoment)) {
				// get new recipes
				const newRecipesRes = await axios.get(`${API_URL_RANDOM}?number=3&apiKey=${API_KEY}`);
				const newRecipes = [];
				for(const recipe of newRecipesRes.data.recipes) {
					const newRecipe = {};
					newRecipe._id = recipe.id;
					newRecipe.title = recipe.title;
					newRecipe.image = recipe.image;
					const date = new Date();
					const newDate = moment(date).format('MM-DD-YYYY');
					newRecipe.date = newDate;
					newRecipes.push(newRecipe);
				}
				console.log("day expired");	
				console.log(newRecipes);
				// save to db
				const savedNewRecipes = await RandomRecipe.insertMany(newRecipes);
				res.send(savedNewRecipes);
			}
			else {
				console.log("sending old recipes");
				res.send(randomRecipes);
			}
		}
		else {
			// get new recipes
			const newRecipesRes = await axios.get(`${API_URL_RANDOM}?number=3&apiKey=${API_KEY}`);
			const newRecipes = [];
			for(const recipe of newRecipesRes.data.recipes) {
				const newRecipe = {};
				newRecipe._id = recipe.id;
				newRecipe.title = recipe.title;
				newRecipe.image = recipe.image;
				const date = new Date();
				const newDate = moment(date).format('MM-DD-YYYY');
				newRecipe.date = newDate;
				newRecipes.push(newRecipe);
			}
			console.log("saving new recipes for first time");
			console.log(newRecipes);
			// save to db
			const savedNewRecipes = await RandomRecipe.insertMany(newRecipes);
			res.send(savedNewRecipes);
		}
	}
	catch(err) {
		console.log(`Error while trying to get random recipes: ${err}`);
	}
})

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
