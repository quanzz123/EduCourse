import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createCourse } from '../services/api';

function CreateCourse() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    videoId: '',
    imageUrl: '',
  });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  // Xử lý khi người dùng nhập liệu (Đã sửa lỗi destructuring và biến name)
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Xử lý form khi ấn submit (Đã sửa lỗi tham chiếu biến và tên biến catch block)
  const handleSubmit = async (e) => {
    e.preventDefault(); // Ngăn trình duyệt reload lại trang
    setSubmitting(true);
    setError(null);

    // Kiểm tra dữ liệu (Đã sửa: dùng formData.title và formData.description)
    if (!formData.title || !formData.description) {
      setError('Vui lòng nhập đầy đủ Tiêu đề và Mô tả khóa học.');
      setSubmitting(false);
      return;
    }

    try {
      await createCourse(formData);
      setSuccess(true);

      // Chuyển hướng về trang danh sách
      setTimeout(() => {
        navigate('/courses');
      }, 1500);
    } catch (err) {
      // Đã sửa: dùng đúng biến err nhận được từ catch block
      setError(err.response?.data?.error || err.message || 'Lỗi khi tạo khóa học');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-xl mx-auto bg-white p-8 rounded-3xl border border-slate-100 shadow-sm">
        {/* Tiêu đề trang */}
        <header className="text-center mb-8">
          <h1 className="text-2xl font-black text-slate-800">Tạo Khóa Học Mới</h1>
          <p className="text-slate-400 text-xs mt-1.5">
            Nhập đầy đủ thông tin để xuất bản khóa học lên hệ thống
          </p>
        </header>

        {/* Thông báo lỗi */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-xl text-xs mb-6">
            {error}
          </div>
        )}
        {/* Thông báo thành công */}
        {success && (
          <div className="bg-emerald-50 border border-emerald-200 text-emerald-700 p-4 rounded-xl text-center text-xs font-semibold mb-6">
            🎉 Tạo khóa học thành công! Đang chuyển hướng...
          </div>
        )}

        {/* Form nhập thông tin */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Tiêu đề - Thêm name="title" và đổi sang class Tailwind chuẩn */}
          <div>
            <label htmlFor="title" className="block mb-2 text-xs font-bold text-slate-500 uppercase tracking-wider">
              Tiêu đề <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Nhập tiêu đề khóa học"
              className="bg-slate-50 border border-slate-200 text-slate-800 text-sm rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 block w-full px-4 py-3 focus:outline-none transition-all duration-200"
              required
            />
          </div>

          {/* Mô tả - Thêm name="description" */}
          <div>
            <label htmlFor="description" className="block mb-2 text-xs font-bold text-slate-500 uppercase tracking-wider">
              Mô tả <span className="text-red-500">*</span>
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="4"
              placeholder="Nhập mô tả khóa học..."
              className="bg-slate-50 border border-slate-200 text-slate-800 text-sm rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 block w-full p-4 focus:outline-none transition-all duration-200 resize-none"
              required
            ></textarea>
          </div>

          {/* VideoId - Thêm name="videoId" */}
          <div>
            <label htmlFor="videoId" className="block mb-2 text-xs font-bold text-slate-500 uppercase tracking-wider">
              Video ID
            </label>
            <input
              type="text"
              id="videoId"
              name="videoId"
              value={formData.videoId}
              onChange={handleChange}
              placeholder="Nhập ID video Youtube (ví dụ: Q3ixb1w-QaY)"
              className="bg-slate-50 border border-slate-200 text-slate-800 text-sm rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 block w-full px-4 py-3 focus:outline-none transition-all duration-200"
            />
          </div>

          {/* Hình ảnh - Thêm name="imageUrl" */}
          <div>
            <label htmlFor="imageUrl" className="block mb-2 text-xs font-bold text-slate-500 uppercase tracking-wider">
              Hình ảnh (URL)
            </label>
            <input
              type="url"
              id="imageUrl"
              name="imageUrl"
              value={formData.imageUrl}
              onChange={handleChange}
              placeholder="Nhập link ảnh đại diện khóa học"
              className="bg-slate-50 border border-slate-200 text-slate-800 text-sm rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 block w-full px-4 py-3 focus:outline-none transition-all duration-200"
            />
          </div>

          {/* Nút gửi Form */}
          <button
            type="submit"
            disabled={submitting || success}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3.5 px-4 rounded-xl transition-all duration-300 shadow-md shadow-indigo-100 hover:shadow-lg disabled:bg-indigo-400 disabled:cursor-not-allowed text-sm mt-2 focus:outline-none"
          >
            {submitting ? 'Đang gửi dữ liệu...' : 'Đăng Ký Khóa Học'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default CreateCourse;