'use client';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { jwtDecode } from 'jwt-decode';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [bookmarkedTools, setBookmarkedTools] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          toast.error('Please login first');
          return;
        }

        const decodedToken = jwtDecode(token);
        const userId = decodedToken._id;

        // Fetch user data
        const userResponse = await axios.get(`http://localhost:5000/user/getbyid/${userId}`);
        setUser(userResponse.data);

        // Fetch bookmarked tools
        const bookmarksResponse = await axios.get(`http://localhost:5000/bookmark/user/${userId}`);
        setBookmarkedTools(bookmarksResponse.data);
      } catch (error) {
        console.error('Error fetching data:', error);
        toast.error('Failed to load profile data');
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#121212]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-cyan-300"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#121212] py-12 px-4 sm:px-6 lg:px-8">
      {/* User Profile Section */}
      <div className="max-w-7xl mx-auto">
        <div className="bg-[#1E1E1E] rounded-lg shadow-lg p-6 mb-8 border border-gray-800">
          <h2 className="text-3xl font-bold mb-6" style={{
            background: 'linear-gradient(90deg, #00FFFF 0%, #FF00FF 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>Profile Information</h2>
          <div className="space-y-4">
            <div>
              <p className="text-sm font-medium text-gray-400">Name</p>
              <p className="text-lg text-gray-200">{user?.name}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-400">Email</p>
              <p className="text-lg text-gray-200">{user?.email}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-400">Role</p>
              <p className="text-lg text-gray-200 capitalize">{user?.role || 'user'}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-400">Member Since</p>
              <p className="text-lg text-gray-200">
                {new Date(user?.createdAt).toLocaleDateString()}
              </p>
            </div>
          </div>
        </div>

        {/* Bookmarked Tools Section */}
        <div className="bg-[#1E1E1E] rounded-lg shadow-lg p-6 border border-gray-800">
          <h2 className="text-3xl font-bold mb-6" style={{
            background: 'linear-gradient(90deg, #00FFFF 0%, #FF00FF 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>Bookmarked Tools</h2>
          {bookmarkedTools.length === 0 ? (
            <p className="text-gray-400">No bookmarked tools yet.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {bookmarkedTools.map((tool) => (
                <div key={tool._id} className="border border-gray-700 rounded-lg overflow-hidden hover:border-cyan-300/20 transition-all bg-[#2A2438] hover:bg-[#1A1625]">
                  <div className="p-4">
                    <div className="flex items-center mb-4">
                      {tool.logo && (
                        <img
                          src={tool.logo}
                          alt={tool.name}
                          className="w-12 h-12 object-cover rounded-full border-2 border-cyan-300/20"
                        />
                      )}
                      <h3 className="ml-3 text-xl font-semibold text-gray-200">{tool.name}</h3>
                    </div>
                    <p className="text-gray-400 mb-4 line-clamp-2">{tool.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="px-3 py-1 bg-cyan-300/20 text-cyan-300 rounded-full text-sm">
                        {tool.category}
                      </span>
                      <div className="flex items-center">
                        <span className="text-yellow-400 mr-1">★</span>
                        <span className="text-gray-300">{tool.rating?.toFixed(1) || 'N/A'}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;