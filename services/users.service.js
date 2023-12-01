const User = require('../models/user');

class UsersService {
  static async findAll() {
    try {
      const users = await User.find();
      return users;
    } catch (error) {
      console.error('Error fetching users:', error);
      throw error;
    }
  }

  static async findById(id) {
    try {
      const user = await User.findById(id);
      return user;
    } catch (error) {
      console.error(`Error fetching user with id ${id}:`, error);
      throw error;
    }
  }
}

module.exports = UsersService;
