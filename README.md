# 🎓 EduCourse - Hệ thống Quản lý Khóa học

Dự án **EduCourse** là một ứng dụng quản lý khóa học và học viên Fullstack hoàn chỉnh, được xây dựng bằng cách chia tách rõ ràng hai phần: **Backend (Express API)** và **Frontend (ReactJS Client)**.

---

## 🏗️ Kiến trúc dự án

Dự án được tổ chức theo mô hình Client-Server:
* **Backend (`courses_Server`):** Node.js, Express, Sequelize ORM, MySQL.
* **Frontend (`client`):** ReactJS, Vite, Tailwind CSS v4, React Router.

### Cấu trúc thư mục chính:
```text
courses_Server/                # THƯ MỤC GỐC (BACKEND)
├── client/                    # Mã nguồn của ứng dụng Frontend (ReactJS)
│   ├── src/
│   │   ├── components/        # Component UI dùng chung (NavBar, UserCard, CourseCard...)
│   │   ├── pages/             # Các trang (Courses, CourseDetail, CreateCourse...)
│   │   ├── services/          # Các cấu hình API gọi lên Server (api.js)
│   │   ├── App.jsx            # Cấu hình Routing chính của client
│   │   └── main.jsx           # Khởi tạo React & import CSS
├── config/                    # Cấu hình database kết nối MySQL
├── controllers/               # Xử lý logic API (UserController, CourseController)
├── models/                    # Khai báo cấu trúc bảng cơ sở dữ liệu (Sequelize Models)
├── routes/                    # Quản lý các tuyến đường Endpoint (User routes, Course routes)
├── services/                  # Các truy vấn Database nghiệp vụ (UserServices, CourseServices)
├── index.js                   # Điểm khởi chạy của Server Node.js
└── package.json               # Các thư viện phụ thuộc của server
```

---

## 🚀 Hướng dẫn cài đặt & Khởi chạy

### 1. Chuẩn bị môi trường
* Đảm bảo máy tính đã cài đặt **Node.js** (LTS khuyến nghị) và cơ sở dữ liệu **MySQL**.

### 2. Thiết lập Backend Server (Chạy tại thư mục gốc `courses_Server/`)
1. Tạo một cơ sở dữ liệu trống trong MySQL (Ví dụ: `courses_db`).
2. Tạo file cấu hình môi trường `.env` ở thư mục gốc (nếu chưa có) và khai báo cổng chạy cùng thông tin database:
   ```env
   PORT=3001
   DB_USER=root
   DB_PASSWORD=yourpassword
   DB_NAME=courses_db
   ```
3. Cài đặt các thư viện backend:
   ```bash
   npm install
   ```
4. Chạy migrations để tự động tạo các bảng dữ liệu trong MySQL:
   ```bash
   npx sequelize-cli db:migrate
   ```
5. Khởi chạy Server Backend ở chế độ phát triển:
   ```bash
   npm run dev
   ```
   *Server sẽ hoạt động tại địa chỉ: `http://localhost:3001`*

### 3. Thiết lập Frontend Client (Chạy tại thư mục `client/`)
1. Di chuyển vào thư mục client:
   ```bash
   cd client
   ```
2. Cài đặt các thư viện frontend:
   ```bash
   npm install
   ```
3. Khởi chạy Client ở chế độ phát triển:
   ```bash
   npm run dev
   ```
   *Giao diện người dùng sẽ chạy tại địa chỉ: `http://localhost:5173`*

---

## 📡 Danh sách API Endpoints chính (Backend)

| Phương thức | Endpoint | Chức năng | Dữ liệu gửi lên (Body) |
|---|---|---|---|
| **GET** | `/api/users` | Lấy danh sách toàn bộ học viên | Không |
| **GET** | `/api/course` | Lấy danh sách toàn bộ khóa học | Không |
| **GET** | `/api/course/:id` | Lấy chi tiết một khóa học theo ID | Không |
| **POST** | `/api/course` | Tạo mới một khóa học | JSON chứa `title`, `description`, `videoId`, `imageUrl` |

---

## 🎨 Các tính năng đã hoàn thiện ở Client (Frontend)

1. **Thanh điều hướng cao cấp (NavBar):**
   * Hiệu ứng kính mờ (Glassmorphism), bám dính đầu trang khi cuộn.
   * Menu chuyển trang linh hoạt (Home, Tin tức, Khóa học).
   * Dropdown Avatar hiển thị thông tin tài khoản cá nhân, cài đặt và nút đăng xuất (Tự động đóng khi click chuột ra ngoài vùng menu).
   * Nút tác vụ nhanh **"Đăng khóa học"** thông minh tự thu gọn icon trên di động.
2. **Trang danh sách khóa học (Grid layout):**
   * Lưới đáp ứng (Responsive Grid) chia 1-2-3 cột linh hoạt.
   * Thẻ khóa học hiển thị hình ảnh tự co giãn, tính toán và hiển thị % giảm giá động.
   * Hiệu ứng Skeleton Loading nhấp nháy chuyển động khi chờ API tải dữ liệu.
3. **Trang chi tiết khóa học (Detail View):**
   * Bố cục hiện đại chia 2/3 (trình phát video giới thiệu nhúng trực tiếp từ YouTube, tiêu đề, mô tả chi tiết) và 1/3 (ảnh thu nhỏ, các thông số học phí, số bài giảng và nút đăng ký).
4. **Trang đăng ký khóa học mới (Form):**
   * Form nhập liệu kiểm soát chặt chẽ (Controlled Component) đồng bộ State tức thì.
   * Cơ chế kiểm tra validation chống bỏ trống các trường bắt buộc trước khi gửi.
   * Tự động phản hồi kết quả gửi lên bằng thông báo thành công/thất bại và chuyển hướng trang mượt mà.
