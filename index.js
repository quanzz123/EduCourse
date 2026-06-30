// index.js
const express = require('express');
const app = express();
const rootRoutes = require('./routes')
const cors = require('cors');
const PORT = process.env.PORT || 3001;


// Nhập toàn bộ models đã cấu hình
const db = require('./models'); 
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api', rootRoutes)



// Kiểm tra kết nối DB trước khi khởi động Server
db.sequelize.authenticate()
    .then(() => {
        console.log('Kết nối database thông qua Sequelize thành công.');
        app.listen(PORT, () => {
            console.log(`Server đang chạy tại http://localhost:${PORT}`);
        });
    })
    .catch(err => {
        console.error('Không thể kết nối database:', err);
    });