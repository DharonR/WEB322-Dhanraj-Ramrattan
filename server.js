const express = require("express");
const app = express();
const apiRoutes = require("./routes/api.routes");
const pageRoutes = require("./routes/page.routes");
const bodyParser = require("body-parser");

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
