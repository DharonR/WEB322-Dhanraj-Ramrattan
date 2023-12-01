const productData = require("../models/product");

class ProductsService {
  static findAll() {
    return productData;
  }

  static findById(id) {
    const product = productData.find((product) => {
      return product.id === parseInt(id);
    });

    return product;
  }
}

module.exports = ProductsService;
