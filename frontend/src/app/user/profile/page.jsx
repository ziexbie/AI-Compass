'use client';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { jwt_decode } from 'jwt-decode';

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

        const decodedToken = jwt_decode(token);
        const userId = decodedToken._id;

        // Fetch user data
        const userResponse = await axios.get(`http://localhost:5000/user/${userId}`);
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
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      {/* User Profile Section */}
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Profile Information</h2>
          <div className="space-y-4">
            <div>
              <p className="text-sm font-medium text-gray-500">Name</p>
              <p className="text-lg text-gray-900">{user?.name}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Email</p>
              <p className="text-lg text-gray-900">{user?.email}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Member Since</p>
              <p className="text-lg text-gray-900">
                {new Date(user?.createdAt).toLocaleDateString()}
              </p>
            </div>
          </div>
        </div>

        {/* Bookmarked Tools Section */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Bookmarked Tools</h2>
          {bookmarkedTools.length === 0 ? (
            <p className="text-gray-500">No bookmarked tools yet.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {bookmarkedTools.map((tool) => (
                <div key={tool._id} className="border rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="p-4">
                    <div className="flex items-center mb-4">
                      {tool.logo && (
                        <img
                          src={`http://localhost:5000/${tool.logo}`}
                          alt={tool.name}
                          className="w-12 h-12 object-cover rounded-full"
                        />
                      )}
                      <h3 className="ml-3 text-xl font-semibold text-gray-900">{tool.name}</h3>
                    </div>
                    <p className="text-gray-600 mb-4 line-clamp-2">{tool.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                        {tool.category}
                      </span>
                      <div className="flex items-center">
                        <span className="text-yellow-400 mr-1">★</span>
                        <span>{tool.rating?.toFixed(1) || 'N/A'}</span>
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