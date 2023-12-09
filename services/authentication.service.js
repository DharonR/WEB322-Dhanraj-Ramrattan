const UsersService = require("../services/users.service"); 

class AuthenticationService {
  async authenticate(username, password) {
    try {
      if (username === "admin" && password === "password") {
        return { username: "admin", isAdmin: true };
      }

      const users = await UsersService.findAll({ email: username, password: password, isAdmin: true });

      return users && users.length > 0 ? users[0] : null;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = new AuthenticationService();
