const express = require("express");
const router = express.Router();
const goalController = require("../controllers/goal-controller");

// GET all goals
router.get("/", goalController.getAllGoals);

// GET a goal
router.get("/:id", goalController.getGoal);

// POST a new goal
router.post("/", goalController.createGoal);

// PATCH a goal by id
router.patch("/:id", goalController.updateGoal);

// DELETE a goal by id
router.delete("/:id", goalController.deleteGoal);


module.exports = router;
