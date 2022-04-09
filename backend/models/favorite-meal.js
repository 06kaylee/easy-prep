const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const favoriteMealSchema = new Schema({
    title: {
        type: String,
        minLength: 2,
        maxLength: 100,
        trim: true,
        required: true
    },
    img: {
        type: String,
        required: true
    },
    recipeInformation: {
        servings: {
            type: Number,
        },
        readyTime: {
            type: Number
        },
        nutritionStats: {
            type: Array
        },
        ingredientList: {
            type: Array
        },
        recipeUrl: {
            type: String
        }
    }
});

const FavoriteMeal = mongoose.model('FavoriteMeal', favoriteMealSchema);

module.exports = FavoriteMeal;