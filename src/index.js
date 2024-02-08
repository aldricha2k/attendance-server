require("./models/User");
require("./models/Attendance");

const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const authRoutes = require("./routes/authRoutes");
const requireAuth = require("./middlewares/requireAuth");
const accountRoutes = require('./routes/accountRoutes');
const attendanceRoutes = require('./routes/attendanceRoutes');
const app = express();

app.use(bodyParser.json());
app.use(authRoutes);
app.use(accountRoutes);
app.use(attendanceRoutes);

const mongoUri = "mongodb+srv://Aldrich:passwordpassword@cluster0.6tkkc1r.mongodb.net/";


mongoose.set("strictQuery", true);
// resolves future deprecation issue with Mongoose v7

mongoose.connect(mongoUri);
mongoose.connection.on("connected", () => {
  console.log("Connected to attendance database");
});
mongoose.connection.on("error", (err) => {
  console.error("Error connecting to mongo", err);
});

app.get("/", requireAuth, (req, res) => {
  res.send(`Your email: ${req.user.email}`);
});
app.listen(3000, () => {
  console.log("Listening on port 3000");
});
