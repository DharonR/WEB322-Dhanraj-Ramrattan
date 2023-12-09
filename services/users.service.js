const User = require('../models/user');

class UsersService {
  static async findAll() {
    try {
      const users = await User.find();
      return users;
    } catch (error) {
      throw error;
    }
  }

  static async findById(id) {
    try {
      const user = await User.findOne({ id: id });
      return user;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = UsersService;
