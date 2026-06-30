import React from 'react';
import { Link } from 'react-router-dom';

function CourseCard({ course }) {
  if (!course) return null;

  return (
    <div className="group bg-white rounded-3xl border border-slate-100 shadow-xs hover:shadow-lg hover:-translate-y-1 transition-all duration-300 overflow-hidden flex flex-col h-full">
      {/* Ảnh khóa học */}
      <div className="relative overflow-hidden aspect-video bg-slate-100">
        <Link to={`/courses/${course.id}`}>
          <img
            src={course.imageUrl || 'https://images.unsplash.com/photo-1510915228340-29c85a43dcfe?w=600'}
            alt={course.title || 'Course image'}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        </Link>
        {course.category && (
          <span className="absolute top-3 left-3 bg-white/95 backdrop-blur-xs text-xs font-bold px-3 py-1 rounded-full text-indigo-600 shadow-xs">
            {course.category}
          </span>
        )}
      </div>

      {/* Nội dung chi tiết */}
      <div className="p-5 flex flex-col justify-between flex-grow">
        <div>
          {/* Giảng viên & Thời lượng */}
          <div className="flex justify-between items-center text-xs text-slate-400 mb-2">
            {course.instructor ? (
              <span className="flex items-center space-x-1.5">
                <div className="w-5 h-5 rounded-full bg-slate-100 flex items-center justify-center font-bold text-[10px] text-slate-600">
                  {course.instructor[0]?.toUpperCase()}
                </div>
                <span>{course.instructor}</span>
              </span>
            ) : (
              <span>Khóa học</span>
            )}
            {course.duration && <span>{course.duration}</span>}
          </div>

          {/* Tiêu đề */}
          <Link to={`/courses/${course.id}`}>
            <h3 className="text-base font-bold text-slate-800 group-hover:text-indigo-600 transition-colors duration-200 line-clamp-2 min-h-[3rem] mb-2">
              {course.title}
            </h3>
          </Link>

          {/* Mô tả */}
          <p className="text-xs text-slate-500 line-clamp-2 mb-4 leading-relaxed">
            {course.description || 'Chưa có mô tả chi tiết cho khóa học này.'}
          </p>
        </div>

        {/* Chân thẻ: Giá cả & Nút bấm */}
        <div className="mt-auto pt-4 border-t border-slate-100">
          <div className="flex justify-between items-center mb-4">
            <div className="flex flex-col">
              {course.originalPrice && (
                <span className="text-[10px] text-slate-400 line-through">
                  {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(course.originalPrice)}
                </span>
              )}
              <span className="text-base font-black text-indigo-600">
                {course.price 
                  ? new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(course.price)
                  : 'Liên hệ'}
              </span>
            </div>
            {course.originalPrice && course.price && (
              <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md">
                -{Math.round(((course.originalPrice - course.price) / course.originalPrice) * 100)}%
              </span>
            )}
          </div>

          <Link
            to={`/courses/${course.id}`}
            className="w-full inline-flex items-center justify-center bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2.5 px-4 rounded-xl transition-all duration-300 shadow-sm shadow-indigo-100 hover:shadow-md hover:shadow-indigo-200 text-xs text-center"
          >
            <span>Xem chi tiết</span>
            <svg
              className="w-3.5 h-3.5 ms-1.5 transition-transform duration-300 group-hover:translate-x-0.5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2.5}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default CourseCard;