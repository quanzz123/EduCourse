import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getCourseDetail } from '../services/api';
import Loader from '../components/Loader';

function CourseDetail() {
  const { id } = useParams(); // Lấy ID của khóa học từ URL router
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getCourseDetail(id)
      .then((data) => {
        setCourse(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching course detail:', err);
        setError(err.message || 'Lỗi kết nối tới Backend');
        setLoading(false);
      });
  }, [id]);

  if (loading) return <Loader />;
  if (error) {
    return (
      <div className="min-h-screen bg-slate-50 py-20 px-4 text-center">
        <div className="max-w-md mx-auto bg-white p-8 rounded-3xl border border-slate-100 shadow-sm">
          <div className="w-16 h-16 bg-red-50 text-red-500 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">!</div>
          <h2 className="text-xl font-bold text-slate-800 mb-2">Lỗi tải khóa học</h2>
          <p className="text-slate-500 text-sm mb-6">{error}</p>
          <a href="/users" className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-6 rounded-xl transition-all duration-300 text-sm">
            Quay lại trang chủ
          </a>
        </div>
      </div>
    );
  }
  if (!course) {
    return (
      <div className="min-h-screen bg-slate-50 py-20 px-4 text-center">
        <div className="max-w-md mx-auto bg-white p-8 rounded-3xl border border-slate-100 shadow-sm">
          <h2 className="text-xl font-bold text-slate-800 mb-2">Không tìm thấy khóa học</h2>
          <p className="text-slate-500 text-sm mb-6">Khóa học này không tồn tại hoặc đã bị xóa khỏi hệ thống.</p>
          <a href="/users" className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-6 rounded-xl transition-all duration-300 text-sm">
            Quay lại trang chủ
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Phần 1: Chiếm 2/3 - Tiêu đề, Video nhúng, Mô tả */}
        <div className="lg:col-span-2 space-y-6">
          {/* Tiêu đề khóa học */}
          <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-xs">
            <span className="bg-indigo-50 text-indigo-600 text-xs font-bold px-3 py-1 rounded-full">
              {course.category || 'Khóa học'}
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-800 mt-3 leading-tight">
              {course.title}
            </h1>
          </div>

          {/* Video nhúng Youtube */}
          {course.videoId ? (
            <div className="aspect-video w-full rounded-3xl overflow-hidden shadow-lg border border-slate-100 bg-slate-900">
              <iframe
                className="w-full h-full"
                src={`https://www.youtube.com/embed/${course.videoId}?rel=0&modestbranding=1`}
                title={course.title}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              ></iframe>
            </div>
          ) : (
            <div className="aspect-video w-full rounded-3xl bg-slate-200 border border-slate-100 flex items-center justify-center text-slate-400">
              Khóa học này chưa cập nhật video giới thiệu.
            </div>
          )}

          {/* Mô tả khóa học */}
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-100 shadow-xs space-y-4">
            <h2 className="text-lg font-bold text-slate-800 border-b border-slate-100 pb-3">
              Mô tả khóa học
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed whitespace-pre-line">
              {course.description || 'Chưa có mô tả chi tiết cho khóa học này.'}
            </p>
          </div>
        </div>

        {/* Phần 2: Chiếm 1/3 - Hình ảnh & Thông tin khóa học */}
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm sticky top-24">
            {/* Ảnh đại diện khóa học */}
            <div className="aspect-video w-full rounded-2xl overflow-hidden mb-6 bg-slate-100 border border-slate-100">
              <img
                src={course.imageUrl || 'https://images.unsplash.com/photo-1510915228340-29c85a43dcfe?w=600'}
                alt={course.title}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Thông tin học phí */}
            <div className="mb-6">
              <span className="text-xs text-slate-400 font-semibold uppercase tracking-wider">Học phí</span>
              <div className="flex items-baseline space-x-2.5 mt-1">
                <span className="text-2xl font-black text-indigo-600">
                  {course.price 
                    ? new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(course.price)
                    : 'Liên hệ'}
                </span>
                {course.originalPrice && (
                  <span className="text-sm text-slate-400 line-through">
                    {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(course.originalPrice)}
                  </span>
                )}
              </div>
            </div>

            {/* Các thông số khóa học */}
            <div className="space-y-4 mb-6 border-t border-slate-50 pt-4 text-sm text-slate-600">
              <div className="flex justify-between items-center">
                <span className="text-slate-400">Giảng viên:</span>
                <span className="font-semibold text-slate-700">{course.instructor || 'Chưa cập nhật'}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-400">Thời lượng:</span>
                <span className="font-semibold text-slate-700">{course.duration || 'Chưa cập nhật'}</span>
              </div>
              {course.lessons && (
                <div className="flex justify-between items-center">
                  <span className="text-slate-400">Số bài giảng:</span>
                  <span className="font-semibold text-slate-700">{course.lessons} bài</span>
                </div>
              )}
              <div className="flex justify-between items-center">
                <span className="text-slate-400">Cấp độ:</span>
                <span className="font-semibold text-indigo-600 bg-indigo-50 px-2.5 py-0.5 rounded-md text-xs">
                  {course.level || 'Tất cả cấp độ'}
                </span>
              </div>
            </div>

            {/* Nút đăng ký */}
            <button
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-4 rounded-xl transition-all duration-300 shadow-md shadow-indigo-100 hover:shadow-lg hover:shadow-indigo-200 text-sm"
            >
              Đăng Ký Khóa Học
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}

export default CourseDetail;