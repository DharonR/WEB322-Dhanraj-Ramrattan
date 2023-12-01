const express = require("express");
const apiRoutes = express.Router();
const UsersService = require("../services/users.service");
const ProductsService = require("../services/products.service");
const OrdersService = require("../services/orders.service");




// User Routes
apiRoutes.get("/users", async (req, res) => {
  try {
    res.json({ users: await UsersService.findAll() });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

apiRoutes.get("/users/:id", async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await UsersService.findById(userId)
    .map(async (user) => ({
      ...user.toObject(),
      orders: await Order.findByUserId(userId),
    }))
    ;

    if (user) {
      res.json({ user });
    } else {
      res.status(404).send("User not Found");
    }
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
}
);

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

apiRoutes.post("/users", (req, res) => {});





//Product Routes
apiRoutes.get("/products", async (req, res) => {
  try {
    res.json({ products: await ProductsService.findAll() });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

apiRoutes.get("/products/:id", async (req, res) => {
  try {
    const productId = req.params.id;
    const product = await ProductsService.findById(productId);

    if (product) {
      res.json({ product });
    } else {
      res.status(404).send("Product not Found");
    }
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
}
);

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

apiRoutes.get("/orders", async (req, res) => {
  try {
    const orders = await OrdersService.findAll();
    const populatedOrders = await Promise.all(
      orders.map(async (order) => ({
        ...order.toObject(),
        userId: await User.findById(order.userId).select('id'),
        productId: await Product.findById(order.productId).select('id'),
      }))
    );
    res.json({ orders: populatedOrders });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});



apiRoutes.get("/orders/:id", async (req, res) => {
  try {
    const orderId = req.params.id;
    const order = await OrdersService.findById(orderId)
    .map(async (order) => ({
      ...order.toObject(),
      userId: await User.findById(order.userId).select('id'),
      productId: await Product.findById(order.productId).select('id'),
    }))
    ;

    if (order) {
      res.json({ order });
    } else {
      res.status(404).send("Order not Found");
    }
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
}
);

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
