import axios from 'axios';

// Khởi tạo instance axios kết nối tới backend
const api = axios.create({
  baseURL: 'http://localhost:3001/api',
});

// Hàm gọi API lấy danh sách users
export const getUsers = async () => {
  const response = await api.get('/users');
  return response.data;
};
// course
export const getCourses = async () => {
  const res = await api.get('/course');
  return res.data
}

// chi tiet course
export const getCourseDetail = async (id) => {
  const res = await api.get('/course/' + id);
  return res.data;
}

export const createCourse = async (courseData) => {
  const res = await api.post('/course',courseData)
  return res.data
}

export default api;
