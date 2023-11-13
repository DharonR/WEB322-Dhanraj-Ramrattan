const express = require("express");
const pageRoutes = express.Router();
const itemsPerPage = 25;
const UsersService = require("../services/users.service");
const AuthenticationService = require("../services/authentication.service");

// Sample data from fakeUsers.json
const userData = UsersService.findAll();

// // Function to check find user credentials based on inputs.
// function authenticate(username, password) {
//   return userData.find(
//     (user) => user.email === username && user.password === password
//   );
// }

pageRoutes.get("/", (req, res) => {
  res.render("home");
});

pageRoutes.get("/login", (req, res) => {
  res.render("login");
});

pageRoutes.post("/login", (req, res) => {
  const { username, password } = req.body;
  const user = AuthenticationService.authenticate(username, password);
  if (user) {
    res.redirect("/list");
  } else {
    res.redirect("/login"); //Stay on login page until successful login
  }
});

pageRoutes.get("/list", (req, res) => {
  const page = req.query.page || 1;
  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, userData.length);
  const currentPageData = userData.slice(startIndex, endIndex);
  res.render("list", { users: currentPageData });
});

pageRoutes.get("/user/:id", (req, res) => {
  const user = UsersService.findById(req.params.id);

  if (user) {
    res.render("detail", { user });
  } else {
    res.status(404).send("User not found");
  }
});

module.exports = pageRoutes;
