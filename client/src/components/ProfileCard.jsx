import React from 'react';
import { useSelector} from 'react-redux';

const ProfileCard = () => {

  const {user} = useSelector((state) => state.user)
  

  return (
    <div className="bg-white p-4 rounded-lg shadow-md w-64 border border-gray-200">
      <div className="flex flex-col items-center">
        <div className="w-20 h-20 mb-3 rounded-full overflow-hidden">
        <img
            src={user?.profileImage?.url}
            alt={user?.userName || 'Profile'}
            className="w-full h-full object-cover"
          />
        </div>
        <h2 className="text-lg font-semibold text-gray-800 mb-1">{user?.userName}</h2>
        <p className="text-sm text-gray-600 mb-1">{user?.email}</p>
        <p className="text-sm font-semibold text-gray-600 mb-1">{user?.role}</p>
        <p className="text-sm font-semibold text-gray-600 mb-1">@</p>
        <p className="text-sm text-gray-600 mb-1">{user?.institutionName}</p>
        <p className="text-xs text-gray-500">Joined {user?.createdAt}</p>
      </div>
    </div>
  );
};

export default ProfileCard;
