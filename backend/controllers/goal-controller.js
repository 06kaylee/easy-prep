const Goal = require("../models/goal");


// get all goals
exports.allGoals = async (req, res) => {
    try {
        const goals = await Goal.find({});
        res.send(goals);
    }
    catch (err) {
        console.log(`Error occurred while retrieving all of the goals: ${err}`);
    }
}


// create a new goal
exports.createGoal = async (req, res) => {
    try {
        const newGoal = new Goal({
            title: 'blah3', 
            category: 'other', 
            startDate: '04/19/22', 
            endDate: '05/10/22'
        });
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
        res.redirect('/goals');
    }
    catch(err) {
        console.log(`Error while trying to delete a goal: ${err}`);
    }
}