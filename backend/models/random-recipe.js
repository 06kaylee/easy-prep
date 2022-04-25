const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const randomRecipeSchema = new Schema({
	_id: {
		type: Number,
		required: true
	},
	title: {
		type: String,
		minLength: 2,
		maxlength: 100,
		trim: true,
		required: true,
	},
	image: {
        type: String,
        required: true
    },
	date: {
		type: String,
		required: true,
	},
});

const RandomRecipe = mongoose.model("RandomRecipe", randomRecipeSchema);

module.exports = RandomRecipe;
