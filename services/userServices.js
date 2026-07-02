const db = require('../models')

class UserServices {
    // get all users
    async  getAllUsers() {
        return await db.User.findAll();
    }
    // find user by email
    async findByEmail(email) {
        return await db.User.findOne({ where: { email } });
    }
    
    async create(data) {
        return  await db.User.create(data);
        
    }
}

module.exports = new UserServices();