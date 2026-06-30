import React, { useEffect, useState } from 'react';
import CourseCard from '../components/CourseCard';
import { getCourses } from '../services/api';

function Courses() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getCourses()
      .then((data) => {
        setCourses(data || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching courses:', err);
        setError(err.message || 'Lỗi kết nối tới Backend');
        setLoading(false);
      });
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Tiêu đề & Bộ lọc header */}
        <header className="mb-10 flex flex-col md:flex-row md:items-end md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-extrabold text-slate-800 tracking-tight">
              Khóa Học Nổi Bật
            </h1>
            <p className="text-slate-500 mt-1.5 text-sm">
              Tìm kiếm và nâng cấp kiến thức công nghệ chất lượng cùng đội ngũ chuyên gia.
            </p>
          </div>
          <div className="flex space-x-2 overflow-x-auto pb-2 md:pb-0 scrollbar-none">
            {['Tất cả', 'Frontend', 'Backend', 'Database', 'Mobile', 'Design'].map((tab, idx) => (
              <button
                key={tab}
                className={`px-4 py-2 rounded-full text-xs font-bold transition-all duration-300 shrink-0 ${
                  idx === 0
                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-100'
                    : 'bg-white text-slate-600 border border-slate-100 hover:bg-slate-50'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </header>

        {/* Lưới Khóa Học */}
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
          </div>
        ) : error ? (
          <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-xl text-center mb-6">
            <p className="font-semibold">Lỗi kết nối Backend!</p>
            <p className="text-sm">{error}</p>
          </div>
        ) : courses.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-3xl border border-slate-100">
            <p className="text-slate-400 font-medium">Chưa có khóa học nào trong cơ sở dữ liệu.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Courses;