const db = require('../models')

class courseServices {
    // get all users
    async  getAllCourses() {
        return await db.courses.findAll({
            where: {isDeleted: false}
        });
    }

    // 2. Lấy 1 Course theo ID
    async getCourseById(id) {
        return await db.courses.findByPk(id);
    }

    //3. create course
    async create(data) {
        return  await db.courses.create(data);
        
    }
    async update(id, data) {
        const course = await db.courses.findByPk(id);
        if(course) {
            return await course.update(data);
        }
        return null;
    }
    async delete(id) {
        const course = await db.courses.findByPk(id);
        if(course) {
            await course.update({isDeleted: true});
            return true;
        }
        return false;
    }
    // lấy các khóa học bị xóa
    async getDeletedCourses() {
        return await db.courses.findAll({
            where: {isDeleted: true}
        });
    }
    // khôi phục khóa học
    async restore(id) {
        const course = await db.courses.findByPk(id);
        if(course) {
            await course.update({isDeleted: false});
            return course;
        }
        return null;
    }
}

module.exports = new courseServices();