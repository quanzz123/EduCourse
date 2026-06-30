const express = require('express');
const router = express.Router();
const courseController = require('../controllers/courseController')


router.get('/:id', courseController.getById)
router.get('/', courseController.getAll)
router.post('/', courseController.create)

module.exports = router