const Goal = require("../models/goal");


// get all goals
exports.getAllGoals = async (req, res) => {
    try {
        const goals = await Goal.find({});
        res.send(goals);
    }
    catch (err) {
        console.log(`Error occurred while retrieving all of the goals: ${err}`);
    }
}

// get a goals
exports.getGoal = async (req, res) => {
    try {
        const id = req.params.id;
        const goal = await Goal.findById(id);
        res.send(goal);
    }
    catch (err) {
        console.log(`Error occurred while retrieving all of the goals: ${err}`);
    }
}


// create a new goal
exports.createGoal = async (req, res) => {
    try {
        const newGoal = new Goal(req.body);
        console.log(newGoal);
        const savedNewGoal = await newGoal.save();
        res.send(savedNewGoal);
    }
    catch(err) {
        console.log(`Error while trying to save a goal: ${err}`);
    }
}


// update a goal
exports.updateGoal = async (req, res) => {
    try {
        const id = req.params.id;
        const goalToUpdate = await Goal.findByIdAndUpdate(id, req.body, {new: true});
        res.send(goalToUpdate);
    }
    catch(err) {
        console.log(`Error while updating the goal: ${err}`);
    }
    
}


//delete a goal
exports.deleteGoal = async (req, res) => {
    try {
        const id = req.params.id;
        const goalToDelete = await Goal.findByIdAndDelete(id);
        res.send(goalToDelete);
    }
    catch(err) {
        console.log(`Error while trying to delete a goal: ${err}`);
    }
}