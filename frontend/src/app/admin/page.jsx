'use client';
import React, { useEffect, useState } from 'react';
import { IconTool, IconUsers, IconStar } from '@tabler/icons-react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { jwtDecode } from 'jwt-decode';

const AdminDashboard = () => {
    const [stats, setStats] = useState({
        tools: 0,
        users: 0,
        reviews: 0
    });
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [admin, setAdmin] = useState(null);

     
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

    

    const fetchStats = async () => {
        try {
            const [toolsRes, usersRes, reviewsRes] = await Promise.all([
                axios.get('http://localhost:5000/tool/count'),
                axios.get('http://localhost:5000/user/count'),
                axios.get('http://localhost:5000/rating/count')
            ]);

            setStats({
                tools: toolsRes.data.count,
                users: usersRes.data.count,
                reviews: reviewsRes.data.count
            });
        } catch (error) {
            console.error('Error fetching stats:', error);
            toast.error('Failed to fetch dashboard stats');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchStats();
    }, []);

    const statCards = [
        { title: 'Total Tools', value: stats.tools, icon: IconTool },
        { title: 'Active Users', value: stats.users, icon: IconUsers },
        { title: 'Reviews', value: stats.reviews, icon: IconStar }
    ];

    return (
        <div>
            <h1 className="text-3xl font-bold text-white mb-8">Dashboard Overview</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                {loading ? (
                    // Loading skeleton
                    [...Array(3)].map((_, index) => (
                        <div key={index} className="bg-[#1A1625] rounded-xl p-6 border border-[#2A2438] animate-pulse">
                            <div className="h-12 bg-gray-700 rounded mb-2"></div>
                            <div className="h-8 bg-gray-700 rounded w-24"></div>
                        </div>
                    ))
                ) : (
                    statCards.map((stat, index) => {
                        const Icon = stat.icon;
                        return (
                            <div
                                key={index}
                                className="bg-[#1A1625] rounded-xl p-6 border border-[#2A2438] hover:border-pink-500/20 transition-all duration-300"
                            >
                                <div className="flex justify-between items-start">
                                    <div>
                                        <p className="text-gray-400 text-sm">{stat.title}</p>
                                        <h3 className="text-2xl font-bold text-white mt-1">
                                            {stat.value.toLocaleString()}
                                        </h3>
                                    </div>
                                    <div className="p-2 bg-pink-500/10 rounded-lg">
                                        <Icon size={24} className="text-pink-500" />
                                    </div>
                                </div>
                            </div>
                        );
                    })
                )}
            </div>
        </div>
    );
};

export default AdminDashboard;