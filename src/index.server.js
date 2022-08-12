const express = require("express");
const env = require("dotenv");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");

// Environment variable
env.config();

// Mongodb connection
mongoose
  .connect(
    `mongodb+srv://${process.env.MONGO_DB_USER}:${process.env.MONGO_DB_PASSWORD}@cluster0.4ew9zi7.mongodb.net/?retryWrites=true&w=majority`
  )
  .then(() => {
    console.log("Database connected");
  });

// Routes
const userRoutes = require("./routes/user-routes");
const noteRoutes = require("./routes/note-routes");

app.use(cors());
app.use(express.json());

app.use("/api", userRoutes);
app.use("/api/", noteRoutes);

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
