import React from 'react';
import { Camera, Edit, MapPin } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';

export function ProfileHeader() {
  const { user, profile } = useAuth();

  if (!user || !profile) return null;

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden mb-4">
      <div className="h-32 bg-gradient-to-r from-blue-600 to-blue-800 relative">
        <button className="absolute bottom-2 right-2 bg-white p-2 rounded-full">
          <Camera className="w-5 h-5 text-gray-600" />
        </button>
      </div>
      
      <div className="px-6 pb-6">
        <div className="relative">
          <img
            src={profile.avatar_url || `https://ui-avatars.com/api/?name=${encodeURIComponent(profile.full_name)}`}
            alt={profile.full_name}
            className="w-32 h-32 rounded-full border-4 border-white absolute -top-16"
          />
          <button className="absolute top-0 right-0 bg-white p-2 rounded-full shadow hover:shadow-md">
            <Edit className="w-5 h-5 text-gray-600" />
          </button>
        </div>
        
        <div className="mt-20">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-2xl font-bold">{profile.full_name}</h1>
              <p className="text-lg text-gray-600">{profile.headline || 'Add a headline'}</p>
              {profile.location && (
                <p className="text-gray-600 flex items-center mt-1">
                  <MapPin className="w-4 h-4 mr-1" />
                  {profile.location}
                </p>
              )}
            </div>
            <button className="bg-blue-600 text-white px-4 py-1.5 rounded-full hover:bg-blue-700">
              Edit profile
            </button>
          </div>
          
          {profile.about && (
            <div className="mt-4">
              <h2 className="font-semibold mb-2">About</h2>
              <p className="text-gray-600">{profile.about}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}