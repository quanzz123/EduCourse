const courseService = require('../services/courseServices');

class courseController {
    // [GET] /courses
    async getAll(req, res) {
        try {
            const courses = await courseService.getAllCourses();
            res.status(200).json(courses)
        } catch (error) {
            res.status(500).json({error: error.message})
        }
    }
    //[GET] /courses/:id
    async getById(req, res) {
        try {
            const course = await courseService.getCourseById(req.params.id);
            if(!course){
                return res.status(404).json({message:'không tìm thấy khóa học'})
            } else {
                res.status(200).json(course)
            }
        } catch (error) {
            res.status(500).json({error:error.message})
        }
    }
    //[POST]/courses/
    async create (req, res) {
        try {
            console.log(">>> Dữ liệu nhận được từ client:", req.body); // <-- In ra để kiểm tra
            const newCourse = await courseService.create(req.body)
            res.status(201).json({message: 'Tạo thành công',data: newCourse});
        } catch (error) {
            res.status(500).json({error:error.message})
        }
    }
    //[PUT] /courses/:id
    async update(req, res) {
        try {
            const updatedCourse = await courseService.update(req.params.id, req.body);
            if (!updatedCourse) {
                return res.status(404).json({ message: 'Course not found' });
            }
            res.status(200).json({ message: 'Course updated successfully', data: updatedCourse });
        } catch (error) {
            res.status(500).json({error:error.message})
        }
    }
    //[DELETE] /courses/:id
    async delete(req, res) {
        try {
            const deleted = await courseService.delete(req.params.id);
            if (!deleted) {
                return res.status(404).json({ message: 'Course not found' });
            }
            res.status(200).json({ message: 'Course deleted successfully' });
        } catch (error) {
            res.status(500).json({error:error.message})
        }
    }

    // [GET] /courses/deleted
    async getDeleted(req, res) {
        try {
            const courses = await courseService.getDeletedCourses();
            res.status(200).json(courses)
        } catch (error) {
            res.status(500).json({error: error.message})
        }
    }
    // [POST] /courses/restore/:id
     async restore(req, res) {
        try {
            const restoredCourse = await courseService.restore(req.params.id);
            if (!restoredCourse) {
                return res.status(404).json({ message: 'Course not found' });
            }
            res.status(200).json({ message: 'Course restored successfully', data: restoredCourse });
        } catch (error) {
            res.status(500).json({error:error.message})
        }
    }
}

module.exports = new courseController();