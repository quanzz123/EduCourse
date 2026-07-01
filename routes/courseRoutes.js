const express = require('express');
const router = express.Router();
const courseController = require('../controllers/courseController')

router.put('/:id', courseController.update)
router.get('/:id', courseController.getById)
router.get('/', courseController.getAll)
router.post('/', courseController.create)
router.delete('/:id', courseController.delete)
module.exports = router