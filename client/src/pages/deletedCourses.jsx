import { getDeletedCourses, restoreCourse } from "../services/api";
import React, { useState, useEffect } from 'react';
function DeletedCourses() {
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [deletedCourses, setDeletedCourses] = useState(null);


    useEffect(() => {
        getDeletedCourses()
            .then((data) => {
                setCourses(data || []);
                setLoading(false);
            })
            .catch((err) => {
                console.error('Error fetching deleted courses:', err);
                setError(err.message || 'Lỗi kết nối tới Backend');
                setLoading(false);
            })
    }, [])


    const handleRestoreCick = async (id) => {
        setDeletedCourses(id);
    }

    const handleConfirmRestore = async () => {

        if (!deletedCourses) return;
        
        try {
            await restoreCourse(deletedCourses);
            setCourses(courses.filter(course => course.id !== deletedCourses));
            setDeletedCourses(null);
        } catch (error) {
            console.error('Error restoring course:', error);
            alert('Có lỗi xảy ra khi khôi phục khóa học.');
        }
    }
    if (loading) {
        return (
            <div className="flex justify-center items-center py-20">
                <p className="text-slate-500">Đang tải...</p>
            </div>
        );
    }
    if (error) {
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
                            Thùng rác
                        </h1>
                        <p className="text-slate-500 mt-1.5 text-sm">
                            Quản lý và theo dõi các khóa học đã xóa.
                        </p>

                    </div>
                </header>

                {/* Modal for restore course */}
                {deletedCourses && (
                    <div  className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto overflow-x-hidden bg-[rgba(0,0,0,0.4)] backdrop-blur-xs p-4">
                        <div className="relative p-4 w-full max-w-md max-h-full">
                            <div className="relative bg-neutral-primary-soft border border-default rounded-base shadow-sm p-4 md:p-6">
                                    <button onClick={() => setDeletedCourses(null)} type="button" className="absolute top-3 end-2.5 text-body bg-transparent hover:bg-neutral-tertiary hover:text-heading rounded-base text-sm w-9 h-9 ms-auto inline-flex justify-center items-center" data-modal-hide="popup-modal">
                                        <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18 17.94 6M18 18 6.06 6"/></svg>
                                        <span className="sr-only">Close modal</span>
                                    </button>
                                <div className="p-4 md:p-5 text-center">
                                    <svg className="mx-auto mb-4 text-fg-disabled w-12 h-12" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 13V8m0 8h.01M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/></svg>
                                    <h3 className="mb-6 text-body">Bạn có chắc chắn muốn khôi phục khóa học này không?</h3>
                                    <div className="flex items-center space-x-4 justify-center">
                                        <button onClick={handleConfirmRestore}  data-modal-hide="popup-modal" type="button" className="text-white bg-success box-border border border-transparent hover:bg-success-strong focus:ring-4 focus:ring-success-medium shadow-xs font-medium leading-5 rounded-base text-sm px-4 py-2.5 focus:outline-none">
                                        Đồng ý
                                        </button>
                                        <button onClick={() => setDeletedCourses(null)} data-modal-hide="popup-modal" type="button" className="text-body bg-neutral-secondary-medium box-border border border-default-medium hover:bg-neutral-tertiary-medium hover:text-heading focus:ring-4 focus:ring-neutral-tertiary shadow-xs font-medium leading-5 rounded-base text-sm px-4 py-2.5 focus:outline-none">Hủy</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
                <div className="relative overflow-x-auto bg-neutral-primary-soft shadow-xs rounded-base border border-default">
                    <table className="w-full text-sm text-left rtl:text-right text-body">
                        <thead className="bg-neutral-secondary-soft border-b border-default">
                            <tr>
                                <th scope="col" className="px-6 py-3 font-medium">
                                    STT
                                </th>
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
                                    Hành động
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {courses.length === 0 ? (
                                <tr className="odd:bg-neutral-primary even:bg-neutral-secondary-soft border-b border-default">
                                    <td className='px-6 py-4'> không có khóa học nào</td>
                                </tr>
                            ) : (
                                courses.map((course, index) => (

                                <tr key={course.id} className="odd:bg-neutral-primary even:bg-neutral-secondary-soft border-b border-default">
                                    <th scope="row" className="px-6 py-4 font-medium text-heading whitespace-nowrap">
                                        {index + 1}
                                    </th>
                                    <td className="px-6 py-4">
                                        {course.title}
                                    </td>
                                    <td className="px-6 py-4">
                                        {course.videoId}
                                    </td>
                                    <td className="px-6 py-4">
                                        {course.imageUrl}
                                    </td>     
                                    <td className="px-6 py-4">
                                        <div className='flex items-center gap-2'>

                                            <button onClick={() => handleRestoreCick(course.id)}  type="button"  className="text-white bg-brand box-border border border-transparent hover:bg-brand-strong focus:ring-4 focus:ring-brand-medium shadow-xs font-medium leading-5 rounded-base text-sm px-4 py-2.5 focus:outline-none">Khôi phục</button>
                                            
                                        </div>
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

export default DeletedCourses;