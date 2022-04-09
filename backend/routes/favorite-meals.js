const express = require("express");
const router = express.Router();
const favoriteMealController = require("../controllers/favorite-meal-controller");

// get all favorite meals
router.get('/', favoriteMealController.allFavoriteMeals);

// get a favorite meal by id
router.get('/:id', favoriteMealController.getFavoriteMeal);

// delete a favorite meal by id
router.delete('/:id', favoriteMealController.deleteFavoriteMeal);

// create a new favorite meal 
router.post('/', favoriteMealController.addFavoriteMeal);

module.exports = router;