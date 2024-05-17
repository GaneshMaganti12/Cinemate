const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const color = require("colors");
const app = express();
const errorHandling = require("./Middlewares/ErrorHandling");
const userRoute = require("./Routes/UserRoute");
const moviesRoute = require("./Routes/MoviesRoute");
const watchlistRoute = require("./Routes/WatchlistRoute");
const commentsRoute = require("./Routes/CommentsRoute");
require("dotenv").config();

const port = process.env.PORT || 4001;
const mongoURL = process.env.MONGO_URL;

app.use(cors());
app.use(express.json());

const connectToDatabase = async () => {
  try {
    await mongoose.connect(mongoURL);
    console.log("backend connected to database".yellow.bold);
  } catch (error) {
    console.log(error);
  }
};

connectToDatabase();

app.use("/", userRoute);
app.use("/", moviesRoute);
app.use("/", watchlistRoute);
app.use("/", commentsRoute);

app.use(errorHandling);

app.listen(port, () => console.log(`server is running in port ${port}`));
