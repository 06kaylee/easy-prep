const mongoose = require("mongoose");
const Product = require("./models/product");

mongoose
	.connect("mongodb://localhost:27017/farmStand", {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then(() => {
		console.log("mongo connection open");
	})
	.catch((err) => {
		console.log(err);
	});

const seedProducts = [
    {
        name: "Tomato",
        price: 1.99,
        category: "fruit"
    },
    {
        name: "Banana",
        price: 3.99,
        category: "fruit"
    },
    {
        name: "Celery",
        price: 0.99,
        category: "vegetable"
    },
];

Product.insertMany(seedProducts)
.then(res => {
    console.log(res);
})
.catch(e => {
    console.log(err);
})