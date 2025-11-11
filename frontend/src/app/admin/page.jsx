'use client';
import React, { useEffect, useState } from 'react';
import { IconTool, IconUsers, IconStar, IconChartBar, IconTrendingUp, IconActivity, IconClock } from '@tabler/icons-react';
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
        { 
            title: 'Total Tools', 
            value: stats.tools, 
            icon: IconTool,
            color: 'from-blue-500 to-cyan-500',
            bgColor: 'bg-blue-500/10',
            borderColor: 'border-blue-500/30',
            iconColor: 'text-blue-400',
            trend: '+12%',
            trendUp: true
        },
        { 
            title: 'Active Users', 
            value: stats.users, 
            icon: IconUsers,
            color: 'from-purple-500 to-pink-500',
            bgColor: 'bg-purple-500/10',
            borderColor: 'border-purple-500/30',
            iconColor: 'text-purple-400',
            trend: '+8%',
            trendUp: true
        },
        { 
            title: 'Total Reviews', 
            value: stats.reviews, 
            icon: IconStar,
            color: 'from-yellow-500 to-orange-500',
            bgColor: 'bg-yellow-500/10',
            borderColor: 'border-yellow-500/30',
            iconColor: 'text-yellow-400',
            trend: '+23%',
            trendUp: true
        }
    ];

    const getCurrentGreeting = () => {
        const hour = new Date().getHours();
        if (hour < 12) return 'Good Morning';
        if (hour < 18) return 'Good Afternoon';
        return 'Good Evening';
    };

    return (
        <div className='min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 py-8 px-4'>
            <div className='container mx-auto max-w-7xl'>
                {/* Welcome Header */}
                <div className='mb-8'>
                    <div className='flex items-center justify-between mb-6'>
                        <div>
                            <h1 className='text-4xl font-bold bg-gradient-to-r from-pink-400 via-purple-400 to-blue-400 bg-clip-text text-transparent mb-2 py-4'>
                                {getCurrentGreeting()}, {admin?.name || 'Admin'}!
                            </h1>
                            <p className='text-gray-400 flex items-center gap-2'>
                                <IconClock className='w-4 h-4' />
                                {new Date().toLocaleDateString('en-US', { 
                                    weekday: 'long', 
                                    year: 'numeric', 
                                    month: 'long', 
                                    day: 'numeric' 
                                })}
                            </p>
                        </div>
                        <div className='bg-gradient-to-br from-pink-500 to-purple-600 p-3 rounded-xl shadow-lg'>
                            <IconChartBar className='w-8 h-8 text-white' />
                        </div>
                    </div>

                    <div className='bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/20 rounded-xl p-4 backdrop-blur-sm'>
                        <p className='text-gray-300 text-sm flex items-center gap-2'>
                            <IconActivity className='w-5 h-5 text-purple-400' />
                            Here's an overview of your platform's performance
                        </p>
                    </div>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                    {loading ? (
                        // Enhanced Loading skeleton
                        [...Array(3)].map((_, index) => (
                            <div key={index} className="bg-gray-800/30 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50 animate-pulse">
                                <div className="flex justify-between items-start mb-4">
                                    <div className="space-y-3 flex-1">
                                        <div className="h-4 bg-gray-700 rounded w-24"></div>
                                        <div className="h-8 bg-gray-700 rounded w-32"></div>
                                    </div>
                                    <div className="w-14 h-14 bg-gray-700 rounded-xl"></div>
                                </div>
                                <div className="h-3 bg-gray-700 rounded w-16"></div>
                            </div>
                        ))
                    ) : (
                        statCards.map((stat, index) => {
                            const Icon = stat.icon;
                            return (
                                <div
                                    key={index}
                                    className="group bg-gray-800/30 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50 hover:border-purple-500/50 transition-all duration-300 hover:shadow-2xl hover:shadow-purple-500/20 hover:scale-105"
                                >
                                    <div className="flex justify-between items-start mb-4">
                                        <div>
                                            <p className="text-gray-400 text-sm font-medium mb-2">{stat.title}</p>
                                            <h3 className="text-4xl font-bold text-white mb-1">
                                                {stat.value.toLocaleString()}
                                            </h3>
                                            <div className='flex items-center gap-1 mt-2'>
                                                <IconTrendingUp className={`w-4 h-4 ${stat.trendUp ? 'text-green-400' : 'text-red-400'}`} />
                                                <span className={`text-sm font-semibold ${stat.trendUp ? 'text-green-400' : 'text-red-400'}`}>
                                                    {stat.trend}
                                                </span>
                                                <span className='text-xs text-gray-500'>vs last month</span>
                                            </div>
                                        </div>
                                        <div className={`p-4 bg-gradient-to-br ${stat.color} rounded-xl shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                                            <Icon className="w-7 h-7 text-white" />
                                        </div>
                                    </div>
                                    
                                    {/* Progress bar */}
                                    <div className='relative w-full h-2 bg-gray-700/50 rounded-full overflow-hidden'>
                                        <div 
                                            className={`h-full bg-gradient-to-r ${stat.color} rounded-full transition-all duration-1000 ease-out`}
                                            style={{ width: `${Math.min((stat.value / Math.max(...statCards.map(s => s.value))) * 100, 100)}%` }}
                                        ></div>
                                    </div>
                                </div>
                            );
                        })
                    )}
                </div>

                {/* Quick Actions Section */}
                <div className='bg-gray-800/30 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50 mb-8'>
                    <h2 className='text-2xl font-bold text-white mb-6 flex items-center gap-3'>
                        <div className='w-1 h-8 bg-gradient-to-b from-pink-500 to-purple-500 rounded-full'></div>
                        Quick Actions
                    </h2>
                    <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
                        <button 
                            onClick={() => router.push('/admin/add-tools')}
                            className='group p-4 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border border-blue-500/30 rounded-xl hover:border-blue-500 transition-all duration-300 text-left hover:scale-105'
                        >
                            <div className='flex items-center gap-3'>
                                <div className='p-3 bg-blue-500/20 rounded-lg group-hover:bg-blue-500/30 transition-colors'>
                                    <IconTool className='w-6 h-6 text-blue-400' />
                                </div>
                                <div>
                                    <h3 className='text-white font-semibold'>Add New Tool</h3>
                                    <p className='text-gray-400 text-sm'>Create a new AI tool listing</p>
                                </div>
                            </div>
                        </button>

                        <button 
                            onClick={() => router.push('/admin/manage-user')}
                            className='group p-4 bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/30 rounded-xl hover:border-purple-500 transition-all duration-300 text-left hover:scale-105'
                        >
                            <div className='flex items-center gap-3'>
                                <div className='p-3 bg-purple-500/20 rounded-lg group-hover:bg-purple-500/30 transition-colors'>
                                    <IconUsers className='w-6 h-6 text-purple-400' />
                                </div>
                                <div>
                                    <h3 className='text-white font-semibold'>Manage Users</h3>
                                    <p className='text-gray-400 text-sm'>View and edit user accounts</p>
                                </div>
                            </div>
                        </button>

                        <button 
                            onClick={() => router.push('/admin/manage-tools')}
                            className='group p-4 bg-gradient-to-br from-yellow-500/10 to-orange-500/10 border border-yellow-500/30 rounded-xl hover:border-yellow-500 transition-all duration-300 text-left hover:scale-105'
                        >
                            <div className='flex items-center gap-3'>
                                <div className='p-3 bg-yellow-500/20 rounded-lg group-hover:bg-yellow-500/30 transition-colors'>
                                    <IconStar className='w-6 h-6 text-yellow-400' />
                                </div>
                                <div>
                                    <h3 className='text-white font-semibold'>Manage Tools</h3>
                                    <p className='text-gray-400 text-sm'>Edit existing tool listings</p>
                                </div>
                            </div>
                        </button>
                    </div>
                </div>

                {/* Recent Activity Section */}
                <div className='bg-gray-800/30 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50'>
                    <h2 className='text-2xl font-bold text-white mb-6 flex items-center gap-3'>
                        <div className='w-1 h-8 bg-gradient-to-b from-pink-500 to-purple-500 rounded-full'></div>
                        Platform Insights
                    </h2>
                    <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                        <div className='p-4 bg-gradient-to-br from-gray-700/30 to-gray-800/30 rounded-xl border border-gray-600/30'>
                            <div className='flex items-center justify-between mb-2'>
                                <span className='text-gray-400 text-sm'>Average Rating</span>
                                <IconStar className='w-5 h-5 text-yellow-400' />
                            </div>
                            <p className='text-3xl font-bold text-white'>4.8</p>
                            <p className='text-xs text-green-400 mt-1'>↑ 0.3 from last month</p>
                        </div>

                        <div className='p-4 bg-gradient-to-br from-gray-700/30 to-gray-800/30 rounded-xl border border-gray-600/30'>
                            <div className='flex items-center justify-between mb-2'>
                                <span className='text-gray-400 text-sm'>Active Sessions</span>
                                <IconActivity className='w-5 h-5 text-green-400' />
                            </div>
                            <p className='text-3xl font-bold text-white'>{Math.floor(stats.users * 0.65)}</p>
                            <p className='text-xs text-gray-400 mt-1'>Users online now</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;