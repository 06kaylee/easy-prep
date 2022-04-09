const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");


const goalRoutes = require("./routes/goals");
const favoriteMealRoutes = require("./routes/favorite-meals");

const app = express();

const port = process.env.PORT || 3000;

mongoose.connect('mongodb://localhost:27017/MealPlanner')
    .then(() => {
        console.log("MongoDB connection open");
    })
    .catch(err => {
        console.log(`MongoDB error: ${err}`);
    })

// Middleware
app.use(cors());
app.use(express.json());

// Goal routes
app.use('/goals', goalRoutes);

// Favorite meal routes
app.use('/favorite-meals', favoriteMealRoutes);


app.listen(port, () => {
	console.log(`Server is listening on port ${port}`);
});