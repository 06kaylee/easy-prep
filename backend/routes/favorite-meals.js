const express = require("express");
const router = express.Router();
const favoriteMealController = require("../controllers/favorite-meal-controller");

router
	.route("/")
	.get(favoriteMealController.allFavoriteMeals)
	.post(
		favoriteMealController.uploadFavoriteMealPic,
		favoriteMealController.addFavoriteMeal
	);

router
	.route("/:id")
	.get(favoriteMealController.getFavoriteMeal)
	.patch(
		favoriteMealController.uploadFavoriteMealPic,
		favoriteMealController.editFavoriteMeal
	)
	.delete(favoriteMealController.deleteFavoriteMeal);

//export router
module.exports = router;
