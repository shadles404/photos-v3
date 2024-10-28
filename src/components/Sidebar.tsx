import React from 'react';
import { Image as ImageIcon, Heart, Clock, Folder, Star, Tag, LogOut } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export function Sidebar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const menuItems = [
    { icon: <ImageIcon size={20} />, label: 'All Photos' },
    { icon: <Heart size={20} />, label: 'Favorites' },
    { icon: <Clock size={20} />, label: 'Recent' },
    { icon: <Folder size={20} />, label: 'Albums' },
    { icon: <Star size={20} />, label: 'Highlights' },
    { icon: <Tag size={20} />, label: 'Tags' },
  ];

  return (
    <div className="w-64 bg-white border-r border-gray-200 h-full flex flex-col">
      <div className="p-4">
        <h1 className="text-xl font-bold text-gray-800 flex items-center gap-2">
          <ImageIcon className="text-blue-500" />
          Local Photos
        </h1>
        {user && (
          <p className="mt-2 text-sm text-gray-600">
            Welcome, {user.name}
          </p>
        )}
      </div>
      
      <nav className="flex-1 mt-4">
        {menuItems.map((item, index) => (
          <button
            key={index}
            className="w-full flex items-center gap-3 px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors"
          >
            {item.icon}
            <span>{item.label}</span>
          </button>
        ))}
      </nav>

      <div className="p-4 border-t border-gray-200">
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
        >
          <LogOut size={20} />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
}