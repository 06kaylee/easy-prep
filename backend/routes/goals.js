const express = require("express");
const router = express.Router();
const goalController = require("../controllers/goal-controller");

// GET all goals
router
    .route('/')
    .get(goalController.getAllGoals)
    .post(goalController.createGoal);

router
    .route('/:id')
    .get(goalController.getGoal)
    .patch(goalController.updateGoal)
    .delete(goalController.deleteGoal);

module.exports = router;
