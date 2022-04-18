const UpcomingMeal = require("../models/upcoming-meal");
const mongoose = require("mongoose");

// get all meals 
exports.allUpcomingMeals = async (req, res) => {
    try {
        const upcomingMeals = await UpcomingMeal.find({});
        res.send(upcomingMeals);
    }
    catch(err) {
        console.log(`Error while trying to retrieve all meals: ${err}`);
    }
}

// get all meals for a day
exports.allUpcomingMealsForDay = async (req, res) => {
    try {
        const dayOfWeek = req.params.dayOfWeek;
        const meals = await UpcomingMeal.find({ dayOfWeek });
        console.log(meals);
        res.send(meals);
    }
    catch(err) {
        console.log(`Error while trying to get all the meals for the day: ${err}`);
    }
}

// add a new meal for a day
exports.addUpcomingMeal = async (req, res) => {
    try {
        const newUpcomingMeal = new UpcomingMeal(req.body);
        if('_id' in req.body) {
            newUpcomingMeal._id = mongoose.Types.ObjectId();
            newUpcomingMeal.isNew = true;
        }
        const savedNewUpcomingMeal = await newUpcomingMeal.save();
        res.send(savedNewUpcomingMeal);
    }
    catch(err) {
        console.log(`Error while trying to add a upcoming meal: ${err}`);
    }
}

// edit a meal by id
exports.editUpcomingMeal = async (req, res) => {
    try {
        const id = req.params.id;
        console.log(req.body);
        const updatedUpcomingMeal = await UpcomingMeal.findByIdAndUpdate(id, req.body, { runValidators: true, new: true});
        res.send(updatedUpcomingMeal);
    }
    catch(err) {
        console.log(`Error trying to update a upcoming meal: ${err}`);
    }
}

// delete a meal by id
exports.deleteUpcomingMeal = async (req, res) => {
    try {
        const id = req.params.id;
        const upcomingMealToDelete = await UpcomingMeal.findByIdAndDelete(id);
        res.send(upcomingMealToDelete);
    }
    catch(err) {
        console.log(`Error while trying to delete an upcoming meal: ${err}`);
    }
}