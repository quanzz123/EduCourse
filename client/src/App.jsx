import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import NavBar from './components/NavBar';
import Users from './pages/Users';
import Courses from './pages/courses';
import CourseDetail from './pages/courseDetail';
import CreateCourse from './pages/createCourse';
import MyCourses from './pages/myCourses';
import DeletedCourses from './pages/deletedCourses';

function App() {
  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hiển thị NavBar ở trên đầu tất cả các trang */}
      <NavBar />
      
      <Routes>
        {/* Tự động chuyển hướng từ trang chủ sang trang danh sách khóa học */}
        <Route path="/" element={<Navigate to="/courses" replace />} />
        
        {/* Trang danh sách khóa học */}
        <Route path="/courses" element={<Courses />} />
        
        {/* Trang chi tiết khóa học */}
        <Route path="/courses/:id" element={<CourseDetail />} />
        <Route path="/courses/create" element={<CreateCourse />} />
        <Route path="/courses/my-courses" element={<MyCourses />} />
        <Route path="/courses/deleted" element={<DeletedCourses />} />
        
        {/* Trang danh sách học viên */}
        <Route path="/users" element={<Users />} />
        
        {/* Trang tin tức placeholder */}
        <Route 
          path="/news" 
          element={
            <div className="max-w-4xl mx-auto p-10 text-center">
              <h1 className="text-3xl font-extrabold text-slate-800 mb-2">Tin Tức Giáo Dục</h1>
              <p className="text-slate-500">Trang tin tức đang được hoàn thiện. Hãy quay lại sau!</p>
            </div>
          } 
        />
      </Routes>
    </div>
  );
}

export default App;
