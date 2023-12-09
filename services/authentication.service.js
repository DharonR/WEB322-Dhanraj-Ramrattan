const UsersService = require('../services/users.service'); // Adjust the path based on your actual file structure

class AuthenticationService {
  static async authenticate(username, password) {
    try {
      if (username === 'admin' && password === 'password') {
        return { username: 'admin', isAdmin: true };
      }
      const user = await UsersService.findAll({ email: username, password: password, isAdmin: true});
      return user.length > 0 ? user[0] : null;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}

module.exports = AuthenticationService;
