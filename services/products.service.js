const Product = require("../models/product");

class ProductsService {
  static async findAll() {
    try {
      const products = await Product.find();
      return products;
    } catch (error) {
      throw error;
    }
  }

  static async findById(id) {
    try {
      const product = await Product.findOne({ id: id });
      return product;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = ProductsService;
