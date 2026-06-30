const db = require('../models')

class courseServices {
    // get all users
    async  getAllCourses() {
        return await db.courses.findAll();
    }

    // 2. Lấy 1 Course theo ID
    async getCourseById(id) {
        return await db.courses.findByPk(id);
    }

    //3. create course
    async create(data) {
        return  await db.courses.create(data);
        
    }
}

module.exports = new courseServices();