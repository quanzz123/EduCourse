const db = require('../models')

class UserServices {
    // get all users
    async  getAllUsers() {
        return await db.User.findAll();
    }
}

module.exports = new UserServices();