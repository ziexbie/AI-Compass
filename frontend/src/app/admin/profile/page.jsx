'use client';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { jwtDecode } from 'jwt-decode';

const AdminProfile = () => {
    const [admin, setAdmin] = useState(null);
    const [stats, setStats] = useState({
        totalUsers: 0,
        totalTools: 0,
        totalRatings: 0,
        totalBookmarks: 0
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchAdminData = async () => {
            try {
                // Get token from localStorage
                const token = localStorage.getItem('token');
                if (!token) {
                    toast.error('Authentication required');
                    // Redirect logic here if needed
                    return;
                }

                // Decode token to get admin ID
                const decodedToken = jwtDecode(token);
                const adminId = decodedToken._id;

                // Check if user has admin role
                if (decodedToken.role !== 'admin') {
                    toast.error('Unauthorized: Admin access only');
                    // Redirect logic here
                    return;
                }

                // Fetch admin user data
                const adminResponse = await axios.get(`http://localhost:5000/user/getbyid/${adminId}`);
                setAdmin(adminResponse.data);

                // Fetch statistics
                const usersResponse = await axios.get('http://localhost:5000/user/getall');
                const toolsResponse = await axios.get('http://localhost:5000/tool/getall');
                const ratingsResponse = await axios.get('http://localhost:5000/rating/getall');
                const bookmarksResponse = await axios.get('http://localhost:5000/bookmark/getall');

                setStats({
                    totalUsers: usersResponse.data.length,
                    totalTools: toolsResponse.data.length,
                    totalRatings: ratingsResponse.data.length,
                    totalBookmarks: bookmarksResponse.data.length
                });
            } catch (error) {
                console.error('Error fetching admin data:', error);
                toast.error('Failed to load admin profile data');
            } finally {
                setLoading(false);
            }
        };

        fetchAdminData();
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
            <div className="max-w-7xl mx-auto">
                {/* Admin Profile Section */}
                <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
                    <h2 className="text-3xl font-bold text-gray-900 mb-6">Admin Profile</h2>
                    <div className="space-y-4">
                        <div>
                            <p className="text-sm font-medium text-gray-500">Name</p>
                            <p className="text-lg text-gray-900">{admin?.name}</p>
                        </div>
                        <div>
                            <p className="text-sm font-medium text-gray-500">Email</p>
                            <p className="text-lg text-gray-900">{admin?.email}</p>
                        </div>
                        <div>
                            <p className="text-sm font-medium text-gray-500">Role</p>
                            <p className="text-lg capitalize font-bold text-indigo-600">{admin?.role}</p>
                        </div>
                        <div>
                            <p className="text-sm font-medium text-gray-500">Member Since</p>
                            <p className="text-lg text-gray-900">
                                {admin?.createdAt ? new Date(admin.createdAt).toLocaleDateString() : 'N/A'}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Dashboard Stats */}
                <div className="bg-white rounded-lg shadow-lg p-6">
                    <h2 className="text-3xl font-bold text-gray-900 mb-6">Dashboard Statistics</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {/* Users Stat */}
                        <div className="bg-gradient-to-r from-blue-400 to-blue-600 rounded-lg p-6 text-white shadow-md">
                            <div className="flex justify-between items-center">
                                <div>
                                    <p className="text-sm font-medium opacity-75">Total Users</p>
                                    <p className="text-3xl font-bold mt-1">{stats.totalUsers}</p>
                                </div>
                                <div className="bg-white bg-opacity-30 p-3 rounded-full">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                                    </svg>
                                </div>
                            </div>
                        </div>

                        {/* Tools Stat */}
                        <div className="bg-gradient-to-r from-green-400 to-green-600 rounded-lg p-6 text-white shadow-md">
                            <div className="flex justify-between items-center">
                                <div>
                                    <p className="text-sm font-medium opacity-75">Total Tools</p>
                                    <p className="text-3xl font-bold mt-1">{stats.totalTools}</p>
                                </div>
                                <div className="bg-white bg-opacity-30 p-3 rounded-full">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
                                    </svg>
                                </div>
                            </div>
                        </div>

                        {/* Ratings Stat */}
                        <div className="bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-lg p-6 text-white shadow-md">
                            <div className="flex justify-between items-center">
                                <div>
                                    <p className="text-sm font-medium opacity-75">Total Ratings</p>
                                    <p className="text-3xl font-bold mt-1">{stats.totalRatings}</p>
                                </div>
                                <div className="bg-white bg-opacity-30 p-3 rounded-full">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                                    </svg>
                                </div>
                            </div>
                        </div>

                        {/* Bookmarks Stat */}
                        <div className="bg-gradient-to-r from-purple-400 to-purple-600 rounded-lg p-6 text-white shadow-md">
                            <div className="flex justify-between items-center">
                                <div>
                                    <p className="text-sm font-medium opacity-75">Total Bookmarks</p>
                                    <p className="text-3xl font-bold mt-1">{stats.totalBookmarks}</p>
                                </div>
                                <div className="bg-white bg-opacity-30 p-3 rounded-full">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                                    </svg>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminProfile;