import React, { useEffect, useState } from 'react';
import { ThumbsUp, MessageSquare, Share2, Send } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { formatDistanceToNow } from 'date-fns';

interface Post {
  id: string;
  content: string;
  created_at: string;
  profiles: {
    full_name: string;
    headline: string;
    avatar_url: string;
  };
  likes: { id: string }[];
  comments: { id: string }[];
}

export function Feed() {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    const { data, error } = await supabase
      .from('posts')
      .select(`
        *,
        profiles (
          full_name,
          headline,
          avatar_url
        ),
        likes ( id ),
        comments ( id )
      `)
      .order('created_at', { ascending: false });

    if (!error && data) {
      setPosts(data);
    }
  };

  const handleLike = async (postId: string) => {
    const user = (await supabase.auth.getUser()).data.user;
    if (!user) return;

    const { error } = await supabase
      .from('likes')
      .insert([{ post_id: postId, user_id: user.id }]);

    if (!error) {
      fetchPosts();
    }
  };

  return (
    <div className="space-y-4">
      {posts.map((post) => (
        <div key={post.id} className="bg-white rounded-lg shadow p-4">
          <div className="flex items-start mb-4">
            <img
              src={post.profiles.avatar_url || "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"}
              alt={post.profiles.full_name}
              className="w-12 h-12 rounded-full"
            />
            <div className="ml-3">
              <h3 className="font-semibold">{post.profiles.full_name}</h3>
              <p className="text-sm text-gray-500">{post.profiles.headline}</p>
              <p className="text-xs text-gray-400">
                {formatDistanceToNow(new Date(post.created_at), { addSuffix: true })}
              </p>
            </div>
          </div>

          <p className="text-gray-800 mb-4">{post.content}</p>

          <div className="flex items-center justify-between pt-4 border-t">
            <button
              onClick={() => handleLike(post.id)}
              className="flex items-center text-gray-600 hover:text-blue-600"
            >
              <ThumbsUp className="w-5 h-5 mr-1" />
              <span>{post.likes.length}</span>
            </button>
            
            <button className="flex items-center text-gray-600 hover:text-blue-600">
              <MessageSquare className="w-5 h-5 mr-1" />
              <span>{post.comments.length}</span>
            </button>
            
            <button className="flex items-center text-gray-600 hover:text-blue-600">
              <Share2 className="w-5 h-5 mr-1" />
              <span>Share</span>
            </button>
            
            <button className="flex items-center text-gray-600 hover:text-blue-600">
              <Send className="w-5 h-5 mr-1" />
              <span>Send</span>
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}