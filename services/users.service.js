const userData = require("../data/fakeUsers.json");

class UsersService {
  static findAll() {
    return userData;
  }

  static findById(id) {
    const user = userData.find((user) => {
      return user.id === parseInt(id);
    });

    return user;
  }
}

module.exports = UsersService;
