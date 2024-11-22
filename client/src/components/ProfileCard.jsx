import React from 'react';

const ProfileCard = ({ name = "John Doe", email="johndoe@gmail.com", institution="SRM", joinedAt="Nov 2024", imageUrl="https://easy-peasy.ai/cdn-cgi/image/quality=80,format=auto,width=700/https://fdczvxmwwjwpwbeeqcth.supabase.co/storage/v1/object/public/images/50dab922-5d48-4c6b-8725-7fd0755d9334/3a3f2d35-8167-4708-9ef0-bdaa980989f9.png", role = "Student" }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md w-64 border border-gray-200">
      <div className="flex flex-col items-center">
        <div className="w-20 h-20 mb-3 rounded-full overflow-hidden">
          <img
            src={imageUrl}
            alt={name}
            className="w-full h-full object-cover"
          />
        </div>
        <h2 className="text-lg font-semibold text-gray-800 mb-1">{name}</h2>
        <p className="text-sm text-gray-600 mb-1">{email}</p>
        <p className="text-sm font-semibold text-gray-600 mb-1">{role}</p>
        <p className="text-sm font-semibold text-gray-600 mb-1">@</p>
        <p className="text-sm text-gray-600 mb-1">{institution}</p>
        <p className="text-xs text-gray-500">Joined {joinedAt}</p>
      </div>
    </div>
  );
};

export default ProfileCard;
