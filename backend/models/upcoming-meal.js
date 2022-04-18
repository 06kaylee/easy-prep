const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const upcomingMealSchema = new Schema({
    dayOfWeek: {
        type: String,
        enum: ['Mon', 'Tues', 'Wed', 'Thurs', 'Fri', 'Sat', 'Sun'],
        required: true
    },
    itemName: {
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
    servings: {
        type: Number,
        required: true
    },
    readyTime: {
        type: Number,
        required: true
    },
    nutritionFacts: {
        calories: {
            type: Number,
            min: 0,
            required: true
        },
        totalFat: {
            type: Number,
            min: 0,
            required: true
        },
        cholesterol: {
            type: Number,
            min: 0,
            required: true
        },
        sodium: {
            type: Number,
            min: 0,
            required: true
        },
        totalCarbs: {
            type: Number,
            min: 0,
            required: true
        },
        protein: {
            type: Number,
            min: 0,
            required: true
        },
    },
    ingredients: {
        type: Array,
        required: true
    },
    steps: {
        type: Array,
        required: true
    },
    notes: {
        type: Array
    },
    recipeUrl: {
        type: String,
        required: function () {
            return !this.userInput;
        }
    },
    userInput: {
        type: Boolean,
        default: false,
        required: function () {
            return this.recipeUrl === '';
        }
    }
})

const UpcomingMeal = mongoose.model("UpcomingMeal", upcomingMealSchema);

module.exports = UpcomingMeal;