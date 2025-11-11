'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';
import { IconLogout, IconMenu2, IconX, IconSearch, IconBookmark, IconChartBar, IconUser, IconHome } from '@tabler/icons-react';

const Navbar = () => {
  const [userName, setUserName] = useState('');
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem('token');
        if (token) {
          const decodedToken = jwtDecode(token);
          
          // First, try to use the user's email from the token as a fallback
          setUserName(decodedToken.email);
          
          // Then fetch the user's full profile to get their name
          if (decodedToken._id) {
            const response = await axios.get(`http://localhost:5000/user/getbyid/${decodedToken._id}`);
            if (response.data && response.data.name) {
              setUserName(response.data.name);
            }
          }
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.href = '/login';
  };

  const navLinks = [
    { href: '/browse-tools', label: 'Browse', icon: IconSearch },
    { href: '/user/compare-tools', label: 'Compare', icon: IconChartBar },
    { href: '/user/bookmarked-tools', label: 'Bookmarks', icon: IconBookmark },
    { href: '/user/profile', label: 'Profile', icon: IconUser },
  ];

  const isActive = (path) => pathname === path;

  return (
    <nav className="bg-gray-900/95 backdrop-blur-md border-b border-gray-800/50 sticky top-0 z-50 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-pink-500 to-purple-600 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                <IconHome className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-pink-400 via-purple-400 to-blue-400 bg-clip-text text-transparent">
                AI Compass
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center">
            <div className="flex items-center space-x-2">
              {navLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200 flex items-center gap-2 ${
                      isActive(link.href)
                        ? 'bg-gradient-to-r from-pink-500 to-purple-600 text-white shadow-lg shadow-pink-500/30 scale-105'
                        : 'text-gray-300 hover:bg-gray-800/50 hover:text-white hover:scale-105'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    {link.label}
                  </Link>
                );
              })}
            </div>
            <div className="ml-6 flex items-center space-x-3 pl-6 border-l border-gray-700">
              <div className="flex items-center gap-3 bg-gray-800/50 px-4 py-2 rounded-xl border border-gray-700/50">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-pink-500 to-purple-600 flex items-center justify-center text-white font-bold text-sm">
                  {userName.charAt(0).toUpperCase()}
                </div>
                <span className="text-gray-300 text-sm font-medium">
                  {userName || 'User'}
                </span>
              </div>
              <button
                onClick={handleLogout}
                className="px-4 py-2 text-sm font-semibold text-white bg-gradient-to-r from-red-500 to-pink-600 rounded-xl hover:from-red-600 hover:to-pink-700 transition-all shadow-lg hover:shadow-red-500/50 hover:scale-105 flex items-center gap-2"
              >
                <IconLogout className="w-4 h-4" />
                Logout
              </button>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-xl text-gray-300 hover:text-white hover:bg-gray-800/50 focus:outline-none focus:ring-2 focus:ring-pink-500 transition-all"
            >
              <span className="sr-only">Open main menu</span>
              {isMenuOpen ? (
                <IconX className="h-6 w-6" />
              ) : (
                <IconMenu2 className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`${isMenuOpen ? 'block' : 'hidden'} md:hidden bg-gray-800/95 backdrop-blur-md border-t border-gray-700/50`}>
        <div className="px-4 pt-2 pb-3 space-y-2">
          {navLinks.map((link) => {
            const Icon = link.icon;
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsMenuOpen(false)}
                className={`px-4 py-3 rounded-xl text-base font-semibold transition-all flex items-center gap-3 ${
                  isActive(link.href)
                    ? 'bg-gradient-to-r from-pink-500 to-purple-600 text-white shadow-lg'
                    : 'text-gray-300 hover:bg-gray-700/50 hover:text-white'
                }`}
              >
                <Icon className="w-5 h-5" />
                {link.label}
              </Link>
            );
          })}
          <div className="px-4 py-3 flex items-center gap-3 bg-gray-700/30 rounded-xl border border-gray-600/50 mt-4">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-pink-500 to-purple-600 flex items-center justify-center text-white font-bold">
              {userName.charAt(0).toUpperCase()}
            </div>
            <div>
              <div className="text-xs text-gray-400">Welcome back</div>
              <div className="text-white font-semibold">{userName || 'User'}</div>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="w-full text-left px-4 py-3 text-base font-semibold text-white bg-gradient-to-r from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700 rounded-xl transition-all flex items-center gap-3 shadow-lg"
          >
            <IconLogout className="w-5 h-5" />
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;