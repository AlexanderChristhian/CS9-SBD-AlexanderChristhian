import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const { currentUser, logout } = useAuth();

  const handleLogout = () => {
    logout();
    window.location.href = '/';
  };

  return (
    <nav className="bg-red-800 text-white shadow-md w-full">
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0 flex items-center">
              <img 
                src="mie_babi_logo.jpg" 
                alt="Mie Babi Rodotua Logo" 
                className="h-10 w-10 rounded-full object-cover border-2 border-amber-300 mr-2" 
              />
              <a href="/" className="font-bold text-xl flex items-center">
                <span className="text-amber-300">Mie Babi</span>
                <span className="ml-1 text-white">Rodotua</span>
              </a>
            </div>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <a href="/" className="px-3 py-2 rounded-md text-sm font-medium text-white hover:bg-red-700 hover:text-amber-200 transition-colors">Beranda</a>
              <a href="/menu" className="px-3 py-2 rounded-md text-sm font-medium text-white hover:bg-red-700 hover:text-amber-200 transition-colors">Menu</a>
              {currentUser && (
                <a href="/orders" className="px-3 py-2 rounded-md text-sm font-medium text-white hover:bg-red-700 hover:text-amber-200 transition-colors">Pesanan</a>
              )}
              <a href="/location" className="px-3 py-2 rounded-md text-sm font-medium text-white hover:bg-red-700 hover:text-amber-200 transition-colors">Lokasi</a>
              <a href="/about" className="px-3 py-2 rounded-md text-sm font-medium text-white hover:bg-red-700 hover:text-amber-200 transition-colors">Tentang Kami</a>
              
              {currentUser ? (
                <div className="relative ml-4">
                  <button 
                    onClick={() => setShowProfileMenu(!showProfileMenu)}
                    className="flex items-center text-sm focus:outline-none"
                  >
                    <span className="mr-2 text-white">{currentUser.name}</span>
                    <img
                      src={currentUser.avatar || "https://ui-avatars.com/api/?name=" + encodeURIComponent(currentUser.name) + "&background=FB7185&color=ffffff"}
                      alt={`${currentUser.name}'s avatar`}
                      className="h-8 w-8 rounded-full border-2 border-amber-300"
                    />
                  </button>
                  
                  {/* Profile dropdown menu */}
                  {showProfileMenu && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10">
                      <a href="/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Profil Saya</a>
                      <a href="/orders" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Pesanan Saya</a>
                      <div className="border-t border-gray-200"></div>
                      <button
                        onClick={handleLogout}
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <a href="/login" className="ml-4 px-4 py-2 rounded-full text-sm font-medium bg-amber-400 text-red-900 hover:bg-amber-300 transition-colors">Login</a>
              )}
            </div>
          </div>
          
          {/* Mobile menu button */}
          <div className="md:hidden">
            <button 
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-white hover:bg-red-700 hover:text-amber-200 focus:outline-none"
            >
              <svg 
                className={`${isOpen ? 'hidden' : 'block'} h-6 w-6`} 
                xmlns="http://www.w3.org/2000/svg" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
              <svg 
                className={`${isOpen ? 'block' : 'hidden'} h-6 w-6`} 
                xmlns="http://www.w3.org/2000/svg" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu, show/hide based on menu state */}
      <div className={`${isOpen ? 'block' : 'hidden'} md:hidden bg-red-900`}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          <a href="/" className="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-red-700 hover:text-amber-200">Beranda</a>
          <a href="/menu" className="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-red-700 hover:text-amber-200">Menu</a>
          {currentUser && (
            <a href="/orders" className="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-red-700 hover:text-amber-200">Pesanan</a>
          )}
          <a href="/location" className="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-red-700 hover:text-amber-200">Lokasi</a>
          <a href="/about" className="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-red-700 hover:text-amber-200">Tentang Kami</a>
          
          {currentUser ? (
            <div className="pt-4 pb-3 border-t border-red-700">
              <div className="flex items-center px-3">
                <div className="flex-shrink-0">
                  <img
                    src={currentUser.avatar || "https://ui-avatars.com/api/?name=" + encodeURIComponent(currentUser.name) + "&background=FB7185&color=ffffff"}
                    alt={`${currentUser.name}'s avatar`}
                    className="h-10 w-10 rounded-full border-2 border-amber-300"
                  />
                </div>
                <div className="ml-3">
                  <div className="text-base font-medium text-white">{currentUser.name}</div>
                  <div className="text-sm font-medium text-gray-300">{currentUser.email}</div>
                </div>
              </div>
              <div className="mt-3 space-y-1 px-2">
                <a href="/profile" className="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-red-700 hover:text-amber-200">Profil Saya</a>
                <a href="/orders" className="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-red-700 hover:text-amber-200">Pesanan Saya</a>
                <button
                  onClick={handleLogout}
                  className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-white hover:bg-red-700 hover:text-amber-200"
                >
                  Logout
                </button>
              </div>
            </div>
          ) : (
            <a href="/login" className="block px-3 py-2 mt-4 rounded-md text-base font-medium bg-amber-400 text-red-900">Login</a>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
