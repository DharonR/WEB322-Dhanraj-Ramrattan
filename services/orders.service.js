const Order = require('../models/order');
const User = require('../models/user')

class OrdersService {
  static async findAll() {
    try {
      const orders = await Order.find();
      return orders;
    } catch (error) {
      throw error;
    }
  }

  static async findByUserId(id) {
    try {
      const user = await User.findOne({ id });
      if (!user) {
        return [];
      }
      const orders = await Order.find({ userId: user._id });
      return orders;
    } catch (error) {
      throw error;
    }
  }


  static async findById(id) {
    try {
      const order = await Order.findById(id);
      return order;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = OrdersService;
