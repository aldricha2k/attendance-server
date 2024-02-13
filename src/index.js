require("./models/User");
require("./models/Attendance");

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const attendanceRoutes = require('./routes/attendanceRoutes');
const authRoutes = require("./routes/authRoutes");
const requireAuth = require("./middlewares/requireAuth");

const app = express();

app.use(bodyParser.json());
app.use(authRoutes);
app.use(attendanceRoutes);

const mongoUri = 'mongodb+srv://Aldrich:passwordpassword@cluster0.6tkkc1r.mongodb.net/';

mongoose.set("strictQuery", true);

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
