const mongoose = require("mongoose");
const Campground = require("./models/campground");

mongoose
	.connect("mongodb://localhost:27017/CampgroundApp", {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then(() => {
		console.log("mongo connection open");
	})
	.catch((err) => {
		console.log(err);
	});

const seedCampgrounds = [
    {
        title: "Sweetwater",
        price: "$9/night",
        description: "cool campground", 
        location: "california"
    },
    {
        title: "Some lake",
        price: "$10/night",
        description: "cool campground", 
        location: "california"
    },
    {
        title: "Alpine pond",
        price: "$11/night",
        description: "cool campground", 
        location: "california"
    },
];

Campground.insertMany(seedCampgrounds)
.then(res => {
    console.log(res);
})
.catch(e => {
    console.log(err);
})