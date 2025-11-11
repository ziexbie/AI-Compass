'use client';
import { IconPencilCheck, IconTrashXFilled, IconSearch, IconUserCircle, IconUsers } from '@tabler/icons-react';
import axios from 'axios';
import Link from 'next/link';
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { jwtDecode } from 'jwt-decode';

const ManageUsers = () => {

    const [loading, setLoading] = useState(false);
    const [userList, setUserList] = useState([]);
    const [admin, setAdmin] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');

    const router = useRouter();

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


    const fetchUser = async () => {
        setLoading(true);
        const res = await axios.get('http://localhost:5000/user/getall')
        console.log(res);
        console.log(res.data);
        setUserList(res.data);
        setLoading(false);
    };

    useEffect(() => {
        fetchUser();
    }, []);

    const deleteUser = async (userId) => {
        const res = await axios.delete(`http://localhost:5000/user/delete/${userId}`);
        if (res.status === 200) {
            fetchUser();
            toast.success('User deleted successfully');

        } else {
            toast.error('Error deleting user');
        }
    }

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const filteredUsers = userList.filter(user =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user._id.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className='min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white py-8 px-4'>
            {/* Header Section */}
            <div className='container mx-auto max-w-7xl'>
                <div className='mb-8'>
                    <div className='flex items-center justify-between mb-6'>
                        <div className='flex items-center gap-3'>
                            <div className='bg-gradient-to-br from-pink-500 to-purple-600 p-3 rounded-xl shadow-lg'>
                                <IconUsers className='w-8 h-8 text-white' />
                            </div>
                            <div>
                                <h1 className='text-4xl font-bold bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent'>
                                    Manage Users
                                </h1>
                                <p className='text-gray-400 text-sm mt-1'>
                                    Total Users: <span className='text-pink-400 font-semibold'>{userList.length}</span>
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Search Bar */}
                    <div className='relative max-w-md'>
                        <IconSearch className='absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5' />
                        <input
                            type='text'
                            placeholder='Search by name, email, or ID...'
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className='w-full pl-12 pr-4 py-3 bg-gray-800/50 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all'
                        />
                    </div>
                </div>

                {/* Table Section */}
                {loading ? (
                    <div className='flex flex-col items-center justify-center py-20'>
                        <div className='animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-pink-500 mb-4'></div>
                        <p className='text-xl text-gray-400'>Loading users...</p>
                    </div>
                ) : filteredUsers.length === 0 ? (
                    <div className='text-center py-20'>
                        <IconUserCircle className='w-20 h-20 text-gray-600 mx-auto mb-4' />
                        <p className='text-xl text-gray-400'>No users found</p>
                    </div>
                ) : (
                    <div className='bg-gray-800/30 backdrop-blur-sm rounded-2xl border border-gray-700/50 overflow-hidden shadow-2xl'>
                        <div className='overflow-x-auto'>
                            <table className='w-full'>
                                <thead>
                                    <tr className='bg-gradient-to-r from-gray-800 to-gray-900 border-b border-gray-700'>
                                        <th className='px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider'>
                                            User ID
                                        </th>
                                        <th className='px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider'>
                                            Name
                                        </th>
                                        <th className='px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider'>
                                            Email
                                        </th>
                                        <th className='px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider'>
                                            Role
                                        </th>
                                        <th className='px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider'>
                                            Registered At
                                        </th>
                                        <th className='px-6 py-4 text-center text-xs font-semibold text-gray-400 uppercase tracking-wider'>
                                            Actions
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className='divide-y divide-gray-700/50'>
                                    {filteredUsers.map((user, index) => (
                                        <tr
                                            key={user._id}
                                            className='hover:bg-gray-700/30 transition-colors duration-200'
                                        >
                                            <td className='px-6 py-4 whitespace-nowrap'>
                                                <span className='text-xs font-mono text-gray-400 bg-gray-800 px-2 py-1 rounded'>
                                                    {user._id.substring(0, 8)}...
                                                </span>
                                            </td>
                                            <td className='px-6 py-4 whitespace-nowrap'>
                                                <div className='flex items-center gap-3'>
                                                    <div className='w-10 h-10 rounded-full bg-gradient-to-br from-pink-500 to-purple-600 flex items-center justify-center text-white font-semibold'>
                                                        {user.name.charAt(0).toUpperCase()}
                                                    </div>
                                                    <span className='text-white font-medium'>{user.name}</span>
                                                </div>
                                            </td>
                                            <td className='px-6 py-4 whitespace-nowrap'>
                                                <span className='text-gray-300'>{user.email}</span>
                                            </td>
                                            <td className='px-6 py-4 whitespace-nowrap'>
                                                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${user.role === 'admin'
                                                        ? 'bg-purple-500/20 text-purple-300 border border-purple-500/30'
                                                        : 'bg-blue-500/20 text-blue-300 border border-blue-500/30'
                                                    }`}>
                                                    {user.role || 'user'}
                                                </span>
                                            </td>
                                            <td className='px-6 py-4 whitespace-nowrap'>
                                                <span className='text-gray-400 text-sm'>{formatDate(user.createdAt)}</span>
                                            </td>
                                            <td className='px-6 py-4 whitespace-nowrap'>
                                                <div className='flex items-center justify-center gap-2'>
                                                    <Link href={`/admin/update-user?id=${user._id}`}>
                                                        <button
                                                            className='group relative p-2 bg-gradient-to-br from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 rounded-lg transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-green-500/50'
                                                            title='Edit User'
                                                        >
                                                            <IconPencilCheck className='w-5 h-5 text-white' />
                                                        </button>
                                                    </Link>
                                                    <button
                                                        onClick={() => {
                                                            if (window.confirm(`Are you sure you want to delete ${user.name}?`)) {
                                                                deleteUser(user._id);
                                                            }
                                                        }}
                                                        className='group relative p-2 bg-gradient-to-br from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700 rounded-lg transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-red-500/50'
                                                        title='Delete User'
                                                    >
                                                        <IconTrashXFilled className='w-5 h-5 text-white' />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default ManageUsers;