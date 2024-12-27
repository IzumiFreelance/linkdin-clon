import React from 'react';
import { CreatePost } from '../components/CreatePost';
import { Feed } from '../components/Feed';

export function Home() {
  return (
    <div className="max-w-6xl mx-auto px-4 pt-20">
      <div className="grid grid-cols-12 gap-4">
        {/* Profile Card */}
        <div className="col-span-3">
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="h-16 bg-gray-100"></div>
            <div className="p-4 text-center -mt-8">
              <img
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                alt="Profile"
                className="w-16 h-16 rounded-full mx-auto border-4 border-white"
              />
              <h2 className="mt-2 font-semibold">John Doe</h2>
              <p className="text-sm text-gray-500">Software Engineer at Tech Co</p>
            </div>
            <div className="border-t px-4 py-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Profile views</span>
                <span className="font-semibold">1,234</span>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="col-span-6">
          <CreatePost />
          <Feed />
        </div>

        {/* News Section */}
        <div className="col-span-3">
          <div className="bg-white rounded-lg shadow p-4">
            <h2 className="font-semibold mb-4">LinkedIn News</h2>
            <ul className="space-y-4">
              <li>
                <h3 className="font-medium">Top news in tech</h3>
                <p className="text-sm text-gray-500">1d ago • 5,432 readers</p>
              </li>
              <li>
                <h3 className="font-medium">The future of work</h3>
                <p className="text-sm text-gray-500">2d ago • 3,211 readers</p>
              </li>
              <li>
                <h3 className="font-medium">Latest in AI developments</h3>
                <p className="text-sm text-gray-500">3d ago • 8,765 readers</p>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}