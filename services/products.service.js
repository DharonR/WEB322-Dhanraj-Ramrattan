const Product = require("../models/product");

class ProductsService {
  static async findAll() {
    try {
      const products = await Product.find();
      return products;
    } catch (error) {
      console.error("Products not Found", error);
      throw error;
    }
  }

  static async findById(id) {
    try {
      const product = await Product.findById(id);
      return product;
    } catch (error) {
      console.error(`Product not Found.`, error);
      throw error;
    }
  }
}

module.exports = ProductsService;
