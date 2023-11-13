const express = require("express");
const apiRoutes = express.Router();
const UsersService = require("../services/users.service");

apiRoutes.get("/users", (req, res) => {
  res.json(UsersService.findAll());
});

apiRoutes.get("/users/:id", (req, res) => {
  const userId = req.params.id;
  const user = UsersService.findById(userId);

  if (user) {
    res.render("detail", { user });
  } else {
    res.status(404).send("User not found");
  }
});

module.exports = apiRoutes;
