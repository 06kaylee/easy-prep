const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const goalSchema = new Schema({
	title: {
		type: String,
		minLength: 2,
		maxlength: 50,
		trim: true,
		required: true,
	},
	category: {
		type: String,
		enum: ["fitness", "nutrition", "other"],
		required: true,
	},
	startDate: {
		type: String,
		required: true,
	},
	endDate: {
		type: String,
		required: true,
	},
});

const Goal = mongoose.model("Goal", goalSchema);

module.exports = Goal;
