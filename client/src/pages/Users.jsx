import React, { useState, useEffect } from 'react';
import { getUsers } from '../services/api';
import UserCard from '../components/UserCard';
import Loader from '../components/Loader';

function Users() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        getUsers()
            .then((data) => {
                setUsers(data);
                setLoading(false);
            })
            .catch((err) => {
                setError(err.message || 'Lỗi kết nối tới Backend');
                setLoading(false);
            });
    }, []);

    return (
        <div className="min-h-screen bg-slate-50 py-10 px-4">
            <div className="max-w-4xl mx-auto">
                <header className="text-center mb-10">
                    <h1 className="text-4xl font-extrabold text-slate-800 tracking-tight mb-2">
                        Học Viên Khóa Học
                    </h1>
                    <p className="text-slate-500">
                        Ứng dụng React kết nối với API Express + Sequelize + MySQL
                    </p>
                </header>

                {/* Trạng thái Loading */}
                {loading && <Loader />}

                {/* Trạng thái Lỗi */}
                {error && (
                    <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-xl text-center mb-6">
                        <p className="font-semibold">Lỗi kết nối Backend!</p>
                        <p className="text-sm">{error}</p>
                    </div>
                )}

                {/* Trạng thái Thành Công */}
                {!loading && !error && (
                    <>
                        {users.length === 0 ? (
                            <div className="text-center py-10 bg-white rounded-2xl shadow-sm border border-slate-100">
                                <p className="text-slate-400 font-medium">Chưa có người dùng nào trong database.</p>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {users.map((user) => (
                                    <UserCard key={user.id} user={user} />
                                ))}
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
}
export default Users;