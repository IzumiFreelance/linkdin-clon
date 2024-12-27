import React from 'react';
import { Link } from 'react-router-dom';
import { Home, Users, Bell, MessageSquare, Briefcase, Search } from 'lucide-react';

export function Navbar() {
  return (
    <nav className="fixed top-0 w-full bg-white border-b border-gray-200 z-50">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="text-blue-600">
              <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
              </svg>
            </Link>
            
            <div className="ml-4 relative">
              <div className="flex items-center bg-gray-100 px-3 py-2 rounded">
                <Search className="w-5 h-5 text-gray-500" />
                <input
                  type="text"
                  placeholder="Search"
                  className="ml-2 bg-transparent outline-none"
                />
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-6">
            <NavItem to="/" icon={<Home />} label="Home" />
            <NavItem to="/network" icon={<Users />} label="Network" />
            <NavItem to="/jobs" icon={<Briefcase />} label="Jobs" />
            <NavItem to="/messaging" icon={<MessageSquare />} label="Messaging" />
            <NavItem to="/notifications" icon={<Bell />} label="Notifications" />
            <Link
              to="/profile"
              className="flex flex-col items-center text-gray-500 hover:text-black"
            >
              <img
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                alt="Profile"
                className="w-6 h-6 rounded-full"
              />
              <span className="text-xs mt-1">Me</span>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

function NavItem({ to, icon, label }: { to: string; icon: React.ReactNode; label: string }) {
  return (
    <Link to={to} className="flex flex-col items-center text-gray-500 hover:text-black">
      {icon}
      <span className="text-xs mt-1">{label}</span>
    </Link>
  );
}