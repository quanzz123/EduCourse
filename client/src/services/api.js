import axios from 'axios';

// Khởi tạo instance axios kết nối tới backend
const api = axios.create({
  baseURL: 'http://localhost:3001/api',
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
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

export const updateCourse = async (id, courseData) => {
  const res = await api.put('/course/' + id, courseData)
  return res.data
}

export const deleteCourse = async (id) => {
  const res = await api.delete('/course/' + id)
  return res.data
}

// Lấy danh sách khóa học trong thùng rác
export const getDeletedCourses = async () => {
  const res = await api.get('/course/deleted');
  return res.data;
};

// API khôi phục
export const restoreCourse = async (id) => {
  const res = await api.put('/course/restore/' + id);
  return res.data;
};

// auth api
// register
export const register = async (userData) => {
  const res = await api.post('/auth/register', userData);
  return res.data;
};

//login
export const login = async (userData) => {
  const res = await api.post('/auth/login', userData);
  return res.data;
};

export default api;
