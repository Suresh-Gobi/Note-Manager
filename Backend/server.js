const express = require("express"); // Import Express.js
const mongoose = require("mongoose"); // Import Mongoose for database
const cors = require("cors"); // Import Cors for enabling cross-origin requests
const dotenv = require("dotenv"); // Import dotenv for environment variable configuration
const userRoutes = require("./routes/userRouter"); // Import user routes

// Load environment variables
dotenv.config();
const app = express();

const PORT = process.env.PORT || 5000;

// Retrieve the MongoDB URI from environment variables
const MONGODB_URI = process.env.MONGODB_URI;

// Connect to the MongoDB database using Mongoose
mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(cors());

// Parse incoming JSON data in the request body
app.use(express.json());

// user routes for requests
app.use("/users", userRoutes);

// Start the Express server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
