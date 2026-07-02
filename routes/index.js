// routes/index.js
const express = require('express');
const router = express.Router();


// Import các file route thành phần
const userRoutes = require('./userRoutes');
const courseRoutes = require('./courseRoutes');
const authRoutes = require('./authRoutes'); 
// const productRoutes = require('./productRoutes'); // Ví dụ sau này có thêm bảng khác

// Đăng ký các route thành phần với các tiền tố (prefix) tương ứng
router.use('/users', userRoutes);
// router.use('/products', productRoutes); // Ví dụ cho các thực thể khác
router.use('/course', courseRoutes);
router.use('/auth', authRoutes);


module.exports = router;