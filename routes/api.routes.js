const express = require("express");
const apiRoutes = express.Router();
const itemsPerPage = 25;
const UsersService = require("../services/users.service");
const ProductsService = require("../services/products.service");
const OrdersService = require("../services/orders.service");




// User Routes
apiRoutes.get("/users", (req, res) => {
  const page = req.query.page || 1;
  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = Math.min(
    startIndex + itemsPerPage,
    UsersService.findAll().length
  );
  const currentPageData = UsersService.findAll().slice(startIndex, endIndex);
  res.json({ currentPageData });
});

apiRoutes.get("/users/:id", (req, res) => {
  const userId = req.params.id;
  const user = UsersService.findById(userId);

  if (user) {
    res.json({ user });
  } else {
    res.status(404).send("User not found");
  }
});

apiRoutes.delete("/users/:id", (req, res) => {
  const userId = req.params.id;
  const user = UsersService.findById(userId);

  if (user) {
    res.json({ success: true, message: "User deleted successfully" });
  } else {
    res.status(404).json({ error: "User not found" });
  }
});

apiRoutes.post("/users", (req, res) => {});





//Product Routes
apiRoutes.get("/products", (req, res) => {
  const page = req.query.page || 1;
  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = Math.min(
    startIndex + itemsPerPage,
    ProductsService.findAll().length
  );
  const currentPageData = ProductsService.findAll().slice(startIndex, endIndex);
  res.json({ products: currentPageData });
  //res.json(ProductsService.findAll());
});

apiRoutes.get("/products/:id", (req, res) => {
  const productId = req.params.id;
  const product = ProductsService.findById(productId);

  if (product) {
    res.json({ product });
  } else {
    res.status(404).send("User not found");
  }
});

apiRoutes.delete("/products/:id", (req, res) => {
  const productId = req.params.id;
  const product = ProductsService.findById(productId);

  if (product) {
    res.json({ success: true, message: "User deleted successfully" });
  } else {
    res.status(404).json({ error: "User not found" });
  }
});

apiRoutes.post("/products", (req, res) => {});





// Login Routes

apiRoutes.get("/login", (req, res) => {
  res.render("login");
});

apiRoutes.post("/login", (req, res) => {
  const { username, password } = req.body;
  const user = AuthenticationService.authenticate(username, password);
  if (user) {
    res.json({ isAuthenticated: true});
  } else {
    res.status(404).json({ isAuthenticated: true});
  }
});


// Order Routes

apiRoutes.get('/orders', (req, res) => {
  res.json({orders});
});

apiRoutes.get("/orders/:id", (req, res) => {
  const orderId = req.params.id;
  const order = OrdersService.findById(orderId);

  if (order) {
    res.json({ order });
  } else {
    res.status(404).send("Order not found");
  }
});

apiRoutes.delete("/orders/:id", (req, res) => {
  const orderId = req.params.id;
  const order = OrdersService.findById(orderId);

  if (order) {
    res.json({ success: true, message: "Order deleted successfully" });
  } else {
    res.status(404).json({ error: "Order not found" });
  }
});

apiRoutes.post("/orders", (req, res) => {});

module.exports = apiRoutes;
