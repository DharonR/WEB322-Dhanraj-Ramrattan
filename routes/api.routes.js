const express = require("express");
const apiRoutes = express.Router();
const itemsPerPage = 25;
const UsersService = require("../services/users.service");
const ProductsService = require("../services/products.service");
const OrdersService = require("../services/orders.service");
const AuthenticationService = require("../services/authentication.service");

// User Routes
apiRoutes.get("/users", async (req, res) => {
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

apiRoutes.get("/users/:id", async (req, res) => {
  try {
    const userId = req.params.id;
    console.log("DISPLAYING USER ID:", userId);
    const user = await UsersService.findById(userId);

    if (user) {
      console.log("User found:", user);
      const orders = await OrdersService.findByUserId(userId);
      console.log("Orders:", orders);
      res.render("detail", { user: { ...user.toObject(), orders } });
    } else {
      console.log("User not found");
      res.status(404).send("User not Found");
    }
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});


apiRoutes.delete("/users/:id", async (req, res) => {
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

apiRoutes.post("/users", async (req, res) => {
  try {
    const userData = req.body;
    const newUser = await User.create(userData);

    res.render("detail", { user: await UsersService.findById(userData.id) });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

//Product Routes
apiRoutes.get("/products", async (req, res) => {
  try {
    const products = await ProductsService.findAll();
    if (products.length === 0) {
      res.render("productList", { products: [] });
      return;
    }
    const page = req.query.page || 1;
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = Math.min(startIndex + itemsPerPage, products.length);
    const currentPageData = products.slice(startIndex, endIndex);
    res.render("productList", { products: currentPageData });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

apiRoutes.get("/products/:id", async (req, res) => {
  try {
    const productId = req.params.id;
    const product = await ProductsService.findById(productId);

    if (product) {
      res.render("product", { product: product });
    } else {
      res.status(404).send("Product not Found");
    }
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

apiRoutes.delete("/products/:id", async (req, res) => {
  try {
    const productId = req.params.id;
    const product = await ProductsService.findById(productId);

    if (product) {
      res.json({ success: true, message: "Productr deleted successfully" });
    } else {
      res.status(404).json({ error: "Product not Found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

apiRoutes.post("/products", async (req, res) => {
  try {
    const { name, isbm, price, description } = req.body;
    const newProduct = new Product({
      name,
      isbm,
      price,
      description,
    });
    const savedProduct = await newProduct.save();
    res.status(201).render("product", { product: savedProduct });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Login Routes

apiRoutes.get("/login", (req, res) => {
  res.render("login");
});

apiRoutes.post("/login", async (req, res) => {
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

// Order Routes

apiRoutes.get("/orders", async (req, res) => {
  try {
    const orders = await OrdersService.findAll();
    const populatedOrders = await Promise.all(
      orders.map(async (order) => ({
        ...order.toObject(),
        userId: await UsersService.findById(order.userId),
        productId: await ProductsService.findById(order.productId),
      }))
    );
    if (populatedOrders.length === 0) {
      res.render("orderList", { orders: [] });
      return;
    }
    const page = req.query.page || 1;
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = Math.min(
      startIndex + itemsPerPage,
      populatedOrders.length
    );
    const currentPageData = populatedOrders.slice(startIndex, endIndex);
    res.render("orderList", { orders: currentPageData });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

apiRoutes.get("/orders/:id", async (req, res) => {
  try {
    const orderId = req.params.id;
    const order = await OrdersService.findById(orderId).map(async (order) => ({
      ...order.toObject(),
      userId: await User.findById(order.userId).select("id"),
      productId: await Product.findById(order.productId).select("id"),
    }));
    if (order) {
      res.json({ order });
    } else {
      res.status(404).send("Order not Found");
    }
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

apiRoutes.delete("/orders/:id", async (req, res) => {
  try {
    const orderId = req.params.id;
    const order = await OrdersService.findById(orderId);

    if (order) {
      res.json({ success: true, message: "Order deleted successfully" });
    } else {
      res.status(404).json({ error: "Order not Found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

apiRoutes.post("/orders", async (req, res) => {});

module.exports = apiRoutes;
