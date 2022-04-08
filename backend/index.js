const express = require("express");
const cors = require("cors");
const goalRoutes = require("./routes/goals");

const app = express();

// Middleware
app.use(cors());

// Goal routes
app.use("/goals", goalRoutes);

const port = process.env.PORT || 3000;

app.listen(port, () => {
	console.log(`Server is listening on port ${port}`);
});
