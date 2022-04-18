const express = require("express");
const upcomingMealController = require("../controllers/upcoming-meal-controller");
const router = express.Router();

// get all meals
router.get("/", upcomingMealController.allUpcomingMeals);

// get all meals for a day
router.get("/:dayOfWeek", upcomingMealController.allUpcomingMealsForDay);

// add a new meal
router.post("/", upcomingMealController.addUpcomingMeal);

// edit a meal by id
router.patch("/:id", upcomingMealController.editUpcomingMeal);

// delete a meal by id
router.delete("/:id", upcomingMealController.deleteUpcomingMeal);

module.exports = router;