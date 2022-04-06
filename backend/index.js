const express = require("express");
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

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());


// products index -> GET /products
app.get('/products', async (req, res) => {
	const products = await Product.find({});
	console.log(products);
	res.send("all products will be here");
})

// product details -> GET /products/:id
app.get('/products/:id', async (req, res) => {
	const product = await Product.findById(req.params.id);
	console.log(product);
	res.send(`product for id ${req.params.id}`);
})

// creating products 

// serve the form with this route
app.get('/products/new', (req, res) => {
	// render the form
})

// route the form posts to
app.post('/products', async (req, res) => {
	const newProduct = new Product(req.body);
	await newProduct.save();
	res.redirect('/products');
})

app.put("/products/:id", async (req, res) => {
	Product.findByIdAndUpdate(id, req.body, { runValidators: true });
})

app.delete("/products/:id", async (req, res) => {
	const product = await Product.findByIdAndDelete(id);
	console.log(product);
})


app.listen(3000, () => {
	console.log("Listening on port 3000");
});
