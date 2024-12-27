import React, { useState } from 'react';
import { Image, Video, Calendar, FileText } from 'lucide-react';
import { supabase } from '../lib/supabase';

export function CreatePost() {
  const [content, setContent] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;

    setIsLoading(true);
    const { error } = await supabase
      .from('posts')
      .insert([{ content, user_id: (await supabase.auth.getUser()).data.user?.id }]);

    if (!error) {
      setContent('');
    }
    setIsLoading(false);
  };

  return (
    <div className="bg-white rounded-lg shadow p-4 mb-4">
      <form onSubmit={handleSubmit}>
        <textarea
          className="w-full p-3 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="What do you want to talk about?"
          rows={3}
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        
        <div className="flex items-center justify-between mt-4">
          <div className="flex space-x-4">
            <button type="button" className="flex items-center text-gray-600 hover:text-gray-900">
              <Image className="w-5 h-5 mr-1" />
              <span>Photo</span>
            </button>
            <button type="button" className="flex items-center text-gray-600 hover:text-gray-900">
              <Video className="w-5 h-5 mr-1" />
              <span>Video</span>
            </button>
            <button type="button" className="flex items-center text-gray-600 hover:text-gray-900">
              <Calendar className="w-5 h-5 mr-1" />
              <span>Event</span>
            </button>
            <button type="button" className="flex items-center text-gray-600 hover:text-gray-900">
              <FileText className="w-5 h-5 mr-1" />
              <span>Article</span>
            </button>
          </div>
          
          <button
            type="submit"
            disabled={!content.trim() || isLoading}
            className="px-4 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 disabled:opacity-50"
          >
            Post
          </button>
        </div>
      </form>
    </div>
  );
}