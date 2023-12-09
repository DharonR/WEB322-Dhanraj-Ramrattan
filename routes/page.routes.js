const express = require("express");
const pageRoutes = express.Router();
const itemsPerPage = 25;
const UsersService = require("../services/users.service");
const AuthenticationService = require("../services/authentication.service");

// const userData = UsersService.findAll();

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

pageRoutes.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await AuthenticationService.authenticate(username, password);

    if (user) {
      res.redirect("/users");
    } else {
      res.redirect("/login?error=authentication");
    }
  } catch (error) {
    console.error("Error during login:", error);
    res.redirect("/login?error=internal");
  }
});

pageRoutes.get("/users", async (req, res) => {
  try {
    const users = await UsersService.findAll();
    if (users.length === 0) {
      res.render("list", { users: [] });
      return;
    }
    const page = req.query.page || 1;
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = Math.min(startIndex + itemsPerPage, users.length);
    const currentPageData = users.slice(startIndex, endIndex);
    res.render("list", { users: currentPageData });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

pageRoutes.get("/users/:id", async (req, res) => {
  try {
    const user = await UsersService.findById(req.params.id).map(
      async (user) => ({
        ...user.toObject(),
        orders: await Order.findByUserId(userId),
      })
    );
    if (user) {
      res.render("detail", { user });
    } else {
      res.status(404).send("User not Found");
    }
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

pageRoutes.delete("/users/:id", async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await UsersService.findById(userId);

    if (user) {
      res.json({ success: true, message: "User deleted successfully" });
    } else {
      res.status(404).json({ error: "User not Found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

pageRoutes.post("/users", async (req, res) => {
  try {
    const userData = req.body;
    const newUser = await User.create(userData);

    res.render("detail", { user: await UsersService.findById(userData.id) });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = pageRoutes;
