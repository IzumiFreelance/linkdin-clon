import React from 'react';
import { UserPlus, X } from 'lucide-react';

interface ConnectionCardProps {
  profile: {
    id: string;
    full_name: string;
    headline: string;
    avatar_url: string;
  };
  onConnect: (id: string) => void;
  onIgnore: (id: string) => void;
}

export function ConnectionCard({ profile, onConnect, onIgnore }: ConnectionCardProps) {
  return (
    <div className="bg-white rounded-lg shadow p-4">
      <div className="flex items-center">
        <img
          src={profile.avatar_url || `https://ui-avatars.com/api/?name=${encodeURIComponent(profile.full_name)}`}
          alt={profile.full_name}
          className="w-16 h-16 rounded-full"
        />
        <div className="ml-4">
          <h3 className="font-semibold">{profile.full_name}</h3>
          <p className="text-sm text-gray-600">{profile.headline}</p>
        </div>
      </div>
      
      <div className="mt-4 flex space-x-2">
        <button
          onClick={() => onConnect(profile.id)}
          className="flex-1 flex items-center justify-center bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          <UserPlus className="w-4 h-4 mr-2" />
          Connect
        </button>
        <button
          onClick={() => onIgnore(profile.id)}
          className="flex items-center justify-center px-4 py-2 border border-gray-300 rounded hover:bg-gray-50"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}