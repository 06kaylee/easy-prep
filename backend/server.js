const mongoose = require('mongoose');
const dotenv = require('dotenv');
const app = require('./app.js');

dotenv.config({ path: './.env' });

// setting up mongo connection to db
const url = `mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@cluster1.pzfrv.mongodb.net/mealPlannerDb?retryWrites=true&w=majority`;
const conn = mongoose.connect(url)
  .then(() => {
    console.log("MongoDB connection open");
  })
  .catch((err) => {
    console.log(`MongoDB error: ${err}`);
  });

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Listening to port ${port}`);
})