import React from 'react';
import { useNavigate } from 'react-router-dom';
import { MoreVertical, LogOut, Rocket } from 'lucide-react';
import { useAuthStore } from '../store/authStore';
import { AnimatedBackground } from './AnimatedBackground';
import { FloatingCryptoIcons } from './FloatingCryptoIcons';

export const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      <AnimatedBackground />
      <FloatingCryptoIcons />
      
      <nav className="bg-black/30 backdrop-blur-sm border-b border-gray-700 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center space-x-2">
              <Rocket className="text-red-500 w-8 h-8" />
              <span className="text-white text-xl font-bold">TESLA ELON MUSK</span>
            </div>
            <div className="flex items-center gap-4">
              {user && (
                <>
                  {user.role === 'admin' ? (
                    <div className="relative group">
                      <MoreVertical className="text-gray-400 hover:text-white cursor-pointer" />
                      <div className="absolute right-0 mt-2 w-48 bg-gray-800 rounded-md shadow-lg py-1 hidden group-hover:block">
                        <button
                          onClick={() => navigate('/admin')}
                          className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 w-full text-left"
                        >
                          Admin Dashboard
                        </button>
                      </div>
                    </div>
                  ) : null}
                  <button
                    onClick={handleLogout}
                    className="text-gray-400 hover:text-white"
                  >
                    <LogOut size={20} />
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10">
        {children}
      </main>
    </div>
  );
};