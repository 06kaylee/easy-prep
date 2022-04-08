const express = require("express");
const router = express.Router();

// GET all goals
router.get("/", (req, res) => {
	res.send("All goals here");
});

// PATCH a goal by id
router.patch("/:id", (req, res) => {
	res.send(`Patching a goal with the id of ${req.params.id}`);
});

// DELETE a goal by id
router.delete("/:id", (req, res) => {
	res.send(`Deleting a goal with the id of ${req.params.id}`);
});

// POST a new goal
router.post("/", (req, res) => {
	res.send("Creating a new goal");
});

module.exports = router;
