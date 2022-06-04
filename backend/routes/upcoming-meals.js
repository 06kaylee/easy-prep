const express = require("express");
const upcomingMealController = require("../controllers/upcoming-meal-controller");
const router = express.Router();

router
    .route('/')
    .get(upcomingMealController.allUpcomingMeals)
    .post(upcomingMealController.addUpcomingMeal);

router
    .route('/:id')
    .patch(upcomingMealController.editUpcomingMeal)
    .delete(upcomingMealController.deleteUpcomingMeal);

router
    .route('/:dayOfWeek')
    .get(upcomingMealController.allUpcomingMealsForDay);

module.exports = router;