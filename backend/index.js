const express = require("express");
const mongoose = require("mongoose");
mongoose
	.connect("mongodb://localhost:27017/movieApp", {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then(() => {
		console.log("connection open");
	})
	.catch((err) => {
		console.log(err);
	});
const app = express();

// mongoose is a object data/document mapper (ODM)
// ODMs map documents coming from a database into usuable JS objects
// Mongoose provides ways to model out application data and define a schema
// easy to validate data and build complex queries from the comfort of JS

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.listen(3000, () => {
	console.log("Listening on port 3000");
});
