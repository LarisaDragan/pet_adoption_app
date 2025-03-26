const express = require("express");
const configureCors = require("./cors");
const connectDB = require("./initDb");

const app = express();

configureCors(app);

app.use(express.json());

connectDB();

const usersRoutes = require("../routes/usersRoutes");
const animalsRoutes = require("../routes/animalsRoutes");

app.use("/", usersRoutes);
app.use("/", animalsRoutes);

module.exports = app;
