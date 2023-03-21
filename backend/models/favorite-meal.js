const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const favoriteMealSchema = new Schema({
	itemName: {
		type: String,
		minLength: 2,
		maxLength: 100,
		trim: true,
		required: true,
	},
	mealType: {
		type: String,
		enum: ["breakfast", "lunch", "dinner"],
		required: true,
	},
	img: {
		type: String,
		default: "../frontend/src/assets/default.jpg",
	},
	servings: {
		type: Number,
		required: true,
	},
	readyTime: {
		type: Number,
		required: true,
	},
	rating: {
		type: Array,
		required: true,
	},
	label: {
		type: String,
		required: true,
	},
	nutritionFacts: {
		calories: {
			type: Number,
			min: 0,
			required: true,
		},
		fat: {
			type: Number,
			min: 0,
			required: true,
		},
		cholesterol: {
			type: Number,
			min: 0,
			required: true,
		},
		sodium: {
			type: Number,
			min: 0,
			required: true,
		},
		carbohydrates: {
			type: Number,
			min: 0,
			required: true,
		},
		protein: {
			type: Number,
			min: 0,
			required: true,
		},
	},
	ingredients: {
		type: Array,
		required: true,
	},
	steps: {
		type: Array,
		required: true,
	},
	notes: {
		type: Array,
	},
	recipeUrl: {
		type: String,
		required: function () {
			return !this.userInput;
		},
	},
	userInput: {
		type: Boolean,
		default: false,
		required: function () {
			return this.recipeUrl === "";
		},
	},
});

const FavoriteMeal = mongoose.model("FavoriteMeal", favoriteMealSchema);

module.exports = FavoriteMeal;
