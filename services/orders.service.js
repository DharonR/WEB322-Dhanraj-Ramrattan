const Order = require('../models/order');

class OrdersService {
  static async findAll() {
    try {
      const orders = await Order.find();
      return orders;
    } catch (error) {
      console.error('Orders not Found', error);
      throw error;
    }
  }

  static async findById(id) {
    try {
      const order = await Order.findById(id);
      return order;
    } catch (error) {
      console.error(`Order not Found.`, error);
      throw error;
    }
  }
}

module.exports = OrdersService;
