import React, { useState, useEffect } from 'react';
import {getCourses} from '../services/api';
function MyCourses() {

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
            })
    },[])
    if (loading) {
        return (
            <div className="flex justify-center items-center py-20">
                <p className="text-slate-500">Đang tải...</p>
            </div>
        );
    }
    if(error) {
        return (
            <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-xl text-center mb-6">
                <p>{error}</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-50 py-10 px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto" >
                <header className="mb-10 flex flex-col md:flex-row md:items-end md:justify-between gap-4">
                    <div>
                        <h1 className="text-3xl font-extrabold text-slate-800 tracking-tight">
                            Khóa Học Của Tôi
                        </h1>
                        <p className="text-slate-500 mt-1.5 text-sm">
                            Quản lý và theo dõi các khóa học mà bạn đã đăng.
                        </p>
                    </div>
                </header>




                <div className="relative overflow-x-auto bg-neutral-primary-soft shadow-xs rounded-base border border-default">
                    <table className="w-full text-sm text-left rtl:text-right text-body">
                        <thead className="bg-neutral-secondary-soft border-b border-default">
                            <tr>
                                <th scope="col" className="px-6 py-3 font-medium">
                                    Tên khóa học
                                </th>
                                <th scope="col" className="px-6 py-3 font-medium">
                                    Video ID
                                </th>
                                <th scope="col" className="px-6 py-3 font-medium">
                                    Image URL
                                </th>
                                <th scope="col" className="px-6 py-3 font-medium">
                                    Action
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {courses.length === 0 ? (
                                <tr className="odd:bg-neutral-primary even:bg-neutral-secondary-soft border-b border-default">
                                    <td className='px-6 py-4'> không có khóa học nào</td>
                                </tr>
                            ) : (
                                courses.map((course) => (

                                <tr key={course.id} className="odd:bg-neutral-primary even:bg-neutral-secondary-soft border-b border-default">
                                    <th scope="row" className="px-6 py-4 font-medium text-heading whitespace-nowrap">
                                        {course.title}
                                    </th>
                                    <td className="px-6 py-4">
                                        {course.videoId}
                                    </td>
                                    <td className="px-6 py-4">
                                        {course.imageUrl}
                                    </td>     
                                    <td className="px-6 py-4">
                                        <a href="#" className="font-medium text-fg-brand hover:underline">Edit</a>
                                    </td>
                                </tr>
                                ))
                            )}
                            
                        </tbody>
                    </table>
                </div>

            </div>
        </div>
    )
}

export default MyCourses;