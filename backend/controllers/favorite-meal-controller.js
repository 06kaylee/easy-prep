const FavoriteMeal = require("../models/favorite-meal");

// get all favorite meals
exports.allFavoriteMeals = async (req, res) => {
    try {
        const favoriteMeals = await FavoriteMeal.find({});
        res.send(favoriteMeals);
    }
    catch(err) {
        console.log(`Error trying to get all of the favorite meals: ${err}`);
    }
}

// get a favorite meal by id
exports.getFavoriteMeal = async (req, res) => {
    try {
        const id = req.params.id;
        const favoriteMeal = await FavoriteMeal.findById(id);
        res.send(favoriteMeal);
    }
    catch(err) {
        console.log(`Error trying to find the favorite meal: ${err}`);
    }
}

// delete a favorite meal by id
exports.deleteFavoriteMeal = async (req, res) => {
    try {
        const id = req.params.id;
        const favoriteMealToDelete = await FavoriteMeal.findByIdAndDelete(id);
        res.redirect('/favorite-meals');
    }
    catch(err) {
        console.log(`Error trying to delete a favorite meal: ${err}`);
    }
}

// add a favorite meal
exports.addFavoriteMeal = async (req, res) => {
    try {
        const newFavoriteMeal = new FavoriteMeal({
            title: 'Burrito',
            img: 'some link here',
            recipeInformation: {
                servings: 2,
                readyTime: 60,
                nutritionStats: ['vitamin C', 'iron', 'protein'],
                ingredientList: ['pasta', 'chicken', 'sauce', 'cheese'],
                recipeUrl: 'url goes here'
            }
        });
        const newFavoriteMealSaved = await newFavoriteMeal.save();
        res.send(newFavoriteMealSaved);
    }
    catch(err) {
        console.log(`Error while trying to save a new favorite meal: ${err}`);
    }
}