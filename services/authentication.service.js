const userData = require("../data/fakeUsers.json");

class AuthenticationService {
  static authenticate(username, password) {
    return userData.find(
      (user) => user.email === username && user.password === password && user.isAdmin === true
    );
  }
}

module.exports = AuthenticationService;
