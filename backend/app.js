const express = require("express");
const cors = require("cors");
const favoriteMealRoutes = require("./routes/favorite-meals");
const upcomingMealRoutes = require("./routes/upcoming-meals");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Favorite meal routes
app.use("/api/favorite-meals", favoriteMealRoutes);

// Upcoming meal routes
app.use("/api/upcoming-meals", upcomingMealRoutes);

// handle production
if (process.env.NODE_ENV === "production") {
	// static folder
	app.use(express.static(`${__dirname}/public`));

	// spa
	app.get(/.*/, (req, res) => res.sendFile(__dirname + "../dist/index.html"));
}

module.exports = app;
