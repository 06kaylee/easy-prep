const mongoose = require("mongoose");
require("dotenv").config();

const url = `mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@cluster1.pzfrv.mongodb.net/mealPlannerDb?retryWrites=true&w=majority`;
const conn = mongoose.connect(url)
  .then(() => {
    console.log("MongoDB connection open");
  })
  .catch((err) => {
    console.log(`MongoDB error: ${err}`);
  });

module.exports = conn;