const userService = require('../services/userServices');

class userController {
    // [GET] /users
    async getAll(req, res) {
        try {
            const users = await userService.getAllUsers();
            res.status(200).json(users)
        } catch (error) {
            res.status(500).json({error: error.message})
        }
    }
}

module.exports = new userController();