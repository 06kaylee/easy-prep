const express = require("express");
const conn = require("./conn");
const cors = require("cors");
const goalRoutes = require("./routes/goals");
const favoriteMealRoutes = require("./routes/favorite-meals");
const upcomingMealRoutes = require("./routes/upcoming-meals");
const searchRoutes = require("./routes/search");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Goal routes
app.use('/api/goals', goalRoutes);

// Favorite meal routes
app.use('/api/favorite-meals', favoriteMealRoutes);

// Upcoming meal routes
app.use('/api/upcoming-meals', upcomingMealRoutes);

// Search routes
app.use('/api/search', searchRoutes);

// handle production
if(process.env.NODE_ENV === "production") {
	// static folder 
	app.use(express.static(__dirname + '/public'));

	// spa
	app.get(/.*/, (req, res) => res.sendFile(__dirname + '/public/index.html'));
}

const port = process.env.PORT || 3000;

app.listen(port, () => {
	console.log(`Server is listening on port ${port}`);
});