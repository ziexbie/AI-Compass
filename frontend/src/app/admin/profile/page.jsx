'use client';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { jwtDecode } from 'jwt-decode';
import { useRouter } from 'next/navigation';

const AdminProfile = () => {
    const [admin, setAdmin] = useState(null);
    const [stats, setStats] = useState({
        totalUsers: 0,
        totalTools: 0,
        totalRatings: 0,
        totalBookmarks: 0
    });
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    const handleLogout = () => {
        localStorage.removeItem('token');
        router.push('/login');
        toast.success('Logged out successfully');
    };

    useEffect(() => {
        const fetchAdminData = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    toast.error('Authentication required');
                    router.push('/login');
                    return;
                }

                // Decode token to get admin ID
                const decodedToken = jwtDecode(token);
                const adminId = decodedToken._id;

                // Check if user has admin role
                if (decodedToken.role !== 'admin') {
                    toast.error('Unauthorized: Admin access only');
                    router.push('/login');
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
    }, [router]);

    if (loading) {
        return (
            <div className="min-h-screen bg-[#0A0118] flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-pink-500"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#0A0118] py-20 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                {/* Admin Profile Section */}
                <div className="bg-[#1A1625] rounded-xl p-6 mb-8 border border-[#2A2438] shadow-lg hover:border-pink-500/20 transition-all duration-300">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-3xl font-bold text-white">Admin Profile</h2>
                        <button
                            onClick={handleLogout}
                            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-200"
                        >
                            Logout
                        </button>
                    </div>
                    <div className="space-y-4">
                        <div>
                            <p className="text-sm font-medium text-gray-400">Name</p>
                            <p className="text-lg text-white">{admin?.name}</p>
                        </div>
                        <div>
                            <p className="text-sm font-medium text-gray-400">Member Since</p>
                            <p className="text-lg text-white">
                                {admin?.createdAt ? new Date(admin.createdAt).toLocaleDateString() : 'N/A'}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Dashboard Stats */}
                <div className="bg-[#1A1625] rounded-xl p-6 border border-[#2A2438] shadow-lg hover:border-pink-500/20 transition-all duration-300">
                    <h2 className="text-3xl font-bold text-white mb-6">Dashboard Statistics</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {/* Users Stat */}
                        <div className="bg-gradient-to-r from-pink-500 to-purple-600 rounded-xl p-6 text-white shadow-lg">
                            <div className="flex justify-between items-center">
                                <div>
                                    <p className="text-sm font-medium opacity-75">Total Users</p>
                                    <p className="text-3xl font-bold mt-1">{stats.totalUsers}</p>
                                </div>
                                <div className="bg-white/20 p-3 rounded-full">
                                </div>
                            </div>
                        </div>

                        {/* Tools Stat */}
                        <div className="bg-gradient-to-r from-purple-500 to-indigo-600 rounded-xl p-6 text-white shadow-lg">
                            <div className="flex justify-between items-center">
                                <div>
                                    <p className="text-sm font-medium opacity-75">Total Tools</p>
                                    <p className="text-3xl font-bold mt-1">{stats.totalTools}</p>
                                </div>
                                <div className="bg-white/20 p-3 rounded-full">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
                                    </svg>
                                </div>
                            </div>
                        </div>

                        {/* Ratings Stat */}
                        <div className="bg-gradient-to-r from-indigo-500 to-blue-600 rounded-xl p-6 text-white shadow-lg">
                            <div className="flex justify-between items-center">
                                <div>
                                    <p className="text-sm font-medium opacity-75">Total Ratings</p>
                                    <p className="text-3xl font-bold mt-1">{stats.totalRatings}</p>
                                </div>
                                <div className="bg-white/20 p-3 rounded-full">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                                    </svg>
                                </div>
                            </div>
                        </div>

                        {/* Bookmarks Stat */}
                        <div className="bg-gradient-to-r from-blue-500 to-cyan-600 rounded-xl p-6 text-white shadow-lg">
                            <div className="flex justify-between items-center">
                                <div>
                                    <p className="text-sm font-medium opacity-75">Total Bookmarks</p>
                                    <p className="text-3xl font-bold mt-1">{stats.totalBookmarks}</p>
                                </div>
                                <div className="bg-white/20 p-3 rounded-full">
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