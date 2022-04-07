const express = require("express");
const mongoose = require("mongoose");
const Campground = require("./models/campground");

mongoose.connect("mongodb://localhost:27017/CampgroundApp")
    .then(() => {
        console.log("database is connected");
    })
    .catch(err => {
        console.log(err);
    })

const app = express();

app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.get("/", (req, res) => {
    res.send("home page");
})

// index
app.get("/campgrounds", async (req, res) => {
    const campgrounds = await Campground.find({});
    res.send(campgrounds);
})

//show
app.get("/campgrounds/:id", async (req, res) => {
    const campground = await Campground.findById(req.params.id);
    console.log(campground);
    res.send(campground);
})

// create
app.post("/campgrounds", async (req, res) => {
    const campground = new Campground(req.body);
    await campground.save();
    res.send(campground);
})

//update
app.patch("/campgrounds/:id", async (req, res) => {
    const campground = await Campground.findByIdAndUpdate(req.params.id, {...req.body}, {new : true})
    res.send(campground);
})

//delete
app.delete("/campgrounds/:id", async (req, res) => {
    const campground = await Campground.findByIdAndDelete(req.params.id);
    res.send(`${campground.title} was deleted!`);
})

app.listen(3000, () => {
    console.log("Listening on port 3000");
})