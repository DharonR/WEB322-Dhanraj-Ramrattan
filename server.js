const express = require("express");
const app = express();
const apiRoutes = require("./routes/api.routes");
const pageRoutes = require("./routes/page.routes");
const bodyParser = require("body-parser");
const mongoose = require('mongoose');
// const User = require('../models/user.js');
// const Product = require('../models/product');
// const Order = require('../models/order');

// Mongo DB Connection
mongoose.connect("mongodb+srv://DRamrattan:0LCguphu1grljv7x@web322assignment.6r5oe1u.mongodb.net/?retryWrites=true&w=majority", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on('error', (error) => {
  console.error('MongoDB connection error:', error);
});

db.once('open', () => {
  console.log('Connected to MongoDB');
  
});


app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.set("views", "views");
app.set("view engine", "ejs");

// Routes
app.use(pageRoutes);
app.use("/api", apiRoutes);

// Error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("SERVER ERROR");
});

// Server
app.listen(3000, () => {
  console.log("Server started on http://localhost:3000");
});
