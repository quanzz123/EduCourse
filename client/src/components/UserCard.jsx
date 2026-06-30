import React from 'react';

function UserCard({ user }) {
  return (
    <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 flex items-center space-x-4">
      {/* Avatar */}
      <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-full flex items-center justify-center font-bold text-lg shrink-0">
        {user.firstName?.[0]?.toUpperCase() || 'U'}
      </div>

      {/* User Info */}
      <div className="overflow-hidden">
        <h3 className="text-lg font-semibold text-slate-800 truncate">
          {user.firstName} {user.lastName}
        </h3>
        <p className="text-sm text-slate-500 truncate">{user.email}</p>
      </div>
    </div>
  );
}

export default UserCard;
