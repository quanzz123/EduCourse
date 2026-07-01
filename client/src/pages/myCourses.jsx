import React, { useState, useEffect } from 'react';
import {getCourses, updateCourse, deleteCourse} from '../services/api';
function MyCourses() {

    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [editingCourse, setEditingCourse] = useState(null);// state to hold the course being edited
    const [editTitle, setEditTitle] = useState('');
    const [editDesc, setEditDesc] = useState('');
    const [editVideoId, setEditVideoId] = useState('');
    const [editImageUrl, setEditImageUrl] = useState('');

    //delete state
    const [deleteCourseState, setDeleteCourseState] = useState(null);

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

    const handleEditClick = (course) => {
        setEditingCourse(course);// lưu thông tin khóa học để modal mở ra
        setEditTitle(course.title || '');
        setEditDesc(course.description || '');
        setEditVideoId(course.videoId || '');
        setEditImageUrl(course.imageUrl || '');
        
    }

    const handleUpdateSubmit = async (e) => {
        e.preventDefault();
        const updateData = {
            title: editTitle,
            description: editDesc,
            videoId: editVideoId,
            imageUrl: editImageUrl
        };

        updateCourse(editingCourse.id, updateData)
            .then(updatedCourse => {
                const updateList = courses.map((course) =>
                course.id === editingCourse.id ? {...course, ...updateData} : course
                );
                setCourses(updateList);
                setEditingCourse(null); // đóng modal
            })
            .catch((err) => {
                console.error('Error updating course:', err);
                alert('Có lỗi xảy ra khi cập nhật khóa học.');
            })
    }

    const handleDeleteClick = async (courseId) => {
        setDeleteCourseState(courseId);
    }
    const handleConfirmDelete = async () => {
        if(!deleteCourseState) return;

        try {
            // gọi API để xóa khóa học
            await deleteCourse(deleteCourseState);
            // sau khi xóa thành công, cập nhật lại danh sách khóa học
            setCourses(courses.filter(course => course.id !== deleteCourseState));
            setDeleteCourseState(null);
        } catch (error) {
            console.error('Error deleting course:', error);
            alert('Có lỗi xảy ra khi xóa khóa học.');
        }
    }

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
                {/* Modal for deleting course */}
                {deleteCourseState && (
                    <div  className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto overflow-x-hidden bg-[rgba(0,0,0,0.4)] backdrop-blur-xs p-4">
                        <div className="relative p-4 w-full max-w-md max-h-full">
                            <div className="relative bg-neutral-primary-soft border border-default rounded-base shadow-sm p-4 md:p-6">
                                    <button onClick={() => setDeleteCourseState(null)} type="button" className="absolute top-3 end-2.5 text-body bg-transparent hover:bg-neutral-tertiary hover:text-heading rounded-base text-sm w-9 h-9 ms-auto inline-flex justify-center items-center" data-modal-hide="popup-modal">
                                        <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18 17.94 6M18 18 6.06 6"/></svg>
                                        <span className="sr-only">Close modal</span>
                                    </button>
                                <div className="p-4 md:p-5 text-center">
                                    <svg className="mx-auto mb-4 text-fg-disabled w-12 h-12" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 13V8m0 8h.01M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/></svg>
                                    <h3 className="mb-6 text-body">Bạn có chắc chắn muốn xóa khóa học này không?</h3>
                                    <div className="flex items-center space-x-4 justify-center">
                                        <button onClick={handleConfirmDelete} data-modal-hide="popup-modal" type="button" className="text-white bg-danger box-border border border-transparent hover:bg-danger-strong focus:ring-4 focus:ring-danger-medium shadow-xs font-medium leading-5 rounded-base text-sm px-4 py-2.5 focus:outline-none">
                                        Đồng ý
                                        </button>
                                        <button onClick={() => setDeleteCourseState(null)} data-modal-hide="popup-modal" type="button" className="text-body bg-neutral-secondary-medium box-border border border-default-medium hover:bg-neutral-tertiary-medium hover:text-heading focus:ring-4 focus:ring-neutral-tertiary shadow-xs font-medium leading-5 rounded-base text-sm px-4 py-2.5 focus:outline-none">Hủy</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
                {/* Modal for editing course */}
                {editingCourse && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto overflow-x-hidden bg-[rgba(0,0,0,0.4)] backdrop-blur-xs p-4">
                        <div class="relative p-4 w-full max-w-md max-h-full">
                            {/* {<!-- Modal content -->} */}
                            <div class="relative bg-neutral-primary-soft border border-default rounded-base shadow-sm p-4 md:p-6">
                                {/* <!-- Modal header --> */}
                                <div className="flex items-center justify-between border-b border-default pb-4 md:pb-5">
                                    <h3 className="text-lg font-medium text-heading">
                                        Create new product
                                    </h3>
                                    <button onClick={() => setEditingCourse(null)} type="button" className="text-body bg-transparent hover:bg-neutral-tertiary hover:text-heading rounded-base text-sm w-9 h-9 ms-auto inline-flex justify-center items-center" data-modal-hide="crud-modal">
                                        <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18 17.94 6M18 18 6.06 6" /></svg>
                                        <span className="sr-only">Close modal</span>
                                    </button>
                                </div>
                                {/* <!-- Modal body --> */}
                                <form onSubmit={handleUpdateSubmit}>
                                    <div className="grid gap-4 grid-cols-2 py-4 md:py-6">
                                        <div className="col-span-2">
                                            <label for="name" className="block mb-2.5 text-sm font-medium text-heading">Tiêu đề</label>
                                            <input value={editTitle} onChange={(e) => setEditTitle(e.target.value)} type="text" name="name" id="name" className="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body" placeholder="Nhập tiêu đề" required=""/>
                                        </div>
                                        <div className="col-span-2">
                                            <label for="name" className="block mb-2.5 text-sm font-medium text-heading">Video ID</label>
                                            <input value={editVideoId} onChange={(e) => setEditVideoId(e.target.value)} type="text" name="name" id="name" className="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body" placeholder="Nhập Video ID" required=""/>
                                        </div>
                                        <div className="col-span-2">
                                            <label for="name" className="block mb-2.5 text-sm font-medium text-heading">Image URL</label>
                                            <input value={editImageUrl} onChange={(e) => setEditImageUrl(e.target.value)} type="text" name="name" id="name" className="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body" placeholder="Nhập Image URL" required=""/>
                                        </div>
                                        <div className="col-span-2">
                                            <label for="description" className="block mb-2.5 text-sm font-medium text-heading">Mô tả</label>
                                            <textarea value={editDesc} onChange={(e) => setEditDesc(e.target.value)} id="description" rows="4" className="block bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full p-3.5 shadow-xs placeholder:text-body" placeholder="Viết mô tả khóa học"></textarea>
                                        </div>
                                    </div>
                                    <div className="flex items-center space-x-4 border-t border-default pt-4 md:pt-6">
                                        <button type="submit" className="inline-flex items-center  text-white bg-brand hover:bg-brand-strong box-border border border-transparent focus:ring-4 focus:ring-brand-medium shadow-xs font-medium leading-5 rounded-base text-sm px-4 py-2.5 focus:outline-none">
                                            <svg className="w-4 h-4 me-1.5 -ms-0.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h14m-7 7V5" /></svg>
                                            Lưu thay đổi
                                        </button>
                                        <button onClick={() => setEditingCourse(null)} type="button" className="text-body bg-neutral-secondary-medium box-border border border-default-medium hover:bg-neutral-tertiary-medium hover:text-heading focus:ring-4 focus:ring-neutral-tertiary shadow-xs font-medium leading-5 rounded-base text-sm px-4 py-2.5 focus:outline-none">Cancel</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div> 
                )}



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
                                        <div className='flex items-center gap-2'>

                                            <button onClick={() => handleEditClick(course)} type="button"  className="text-white bg-brand box-border border border-transparent hover:bg-brand-strong focus:ring-4 focus:ring-brand-medium shadow-xs font-medium leading-5 rounded-base text-sm px-4 py-2.5 focus:outline-none">Sửa</button>
                                            <button onClick={() => handleDeleteClick(course.id)} className='text-white bg-danger box-border border border-transparent hover:bg-danger-strong focus:ring-4 focus:ring-danger-medium shadow-xs font-medium leading-5 rounded-base text-sm px-4 py-2.5 focus:outline-none'>Xóa</button>
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

export default MyCourses;