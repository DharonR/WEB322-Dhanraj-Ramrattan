const orderData = require("../models/order");

class OrdersService {
  static findAll() {
    return orderData;
  }

  static findById(id) {
    const order = orderData.find((order) => {
      return order.id === parseInt(id);
    });

    return order;
  }
}

module.exports = OrdersService;
