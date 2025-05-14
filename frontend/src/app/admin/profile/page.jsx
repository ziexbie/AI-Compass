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
            </div>
        </div>
    );
};

export default AdminProfile;