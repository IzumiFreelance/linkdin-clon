import React from 'react';
import { Search, MoreVertical } from 'lucide-react';

interface Chat {
  id: string;
  user: {
    full_name: string;
    avatar_url: string;
    headline: string;
  };
  last_message: string;
  last_message_time: string;
  unread: boolean;
}

export function ChatList({ chats, onSelect }: { chats: Chat[]; onSelect: (id: string) => void }) {
  return (
    <div className="w-80 border-r h-[calc(100vh-4rem)]">
      <div className="p-4 border-b">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">Messaging</h2>
          <MoreVertical className="w-5 h-5 text-gray-500" />
        </div>
        
        <div className="relative">
          <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search messages"
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-full"
          />
        </div>
      </div>
      
      <div className="overflow-y-auto h-[calc(100%-5rem)]">
        {chats.map((chat) => (
          <button
            key={chat.id}
            onClick={() => onSelect(chat.id)}
            className="w-full p-4 flex items-start hover:bg-gray-50 border-b"
          >
            <img
              src={chat.user.avatar_url}
              alt={chat.user.full_name}
              className="w-12 h-12 rounded-full"
            />
            <div className="ml-3 flex-1 text-left">
              <div className="flex justify-between items-start">
                <h3 className="font-semibold">{chat.user.full_name}</h3>
                <span className="text-xs text-gray-500">{chat.last_message_time}</span>
              </div>
              <p className="text-sm text-gray-600 truncate">{chat.last_message}</p>
            </div>
            {chat.unread && (
              <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}