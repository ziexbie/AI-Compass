'use client';
import { IconPencilCheck, IconTrashXFilled } from '@tabler/icons-react';
import axios from 'axios';
import Link from 'next/link';
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';

const ManageUsers = () => {

    const [loading, setLoading] = useState(false);
    const [userList, setUserList] = useState([]);

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
            
        }else{
            toast.error('Error deleting user');
        }
    }


    return (
        <div className='h-screen bg-black text-pink-300 py-20'>
            <h1 className='text-4xl text-center font-bold mb-10'>Manage Users</h1>
            <div className='container mx-auto p-20'>
                {
                    loading ?
                        <p className='text-3xl text-red-400'>Loading... Please Wait </p>
                        :
                        (
                            <table className='w-full border-2  border-pink-300 shadow-lg'>
                                <thead className='bg-gray-700'>
                                    <tr  className='text-left'>
                                        <th className='p-5 border-b-2'>ID</th>
                                        <th className='p-5 border-b-2'>Name</th>
                                        <th className='p-5 border-b-2'>Email</th>
                                        <th className='p-5 border-b-2'>Registered At</th>
                                        <th className='p-5 border-b-2'>Actions</th>
                                    </tr>
                                </thead>
                                <tbody className='text-left'>
                                    {
                                        userList.map((user) => {
                                            return (
                                                <tr key={user._id}>
                                                    <td className='p-2'>{user._id}</td>
                                                    <td className='p-2'>{user.name}</td>
                                                    <td className='p-2'>{user.email}</td>
                                                    <td className='p-2'>{user.createdAt}</td>
                                                    <td className='p-2'>
                                                        <button onClick={() => {deleteUser(user._id)}} className='bg-red-700 text-white px-4 py-2 rounded-lg m-2'>
                                                            <IconTrashXFilled/>
                                                        </button>
                                                        <button className='bg-green-700 text-white px-4 py-2 rounded-lg m-2'>
                                                            <Link href={`/admin/update-user?id=${user._id}`}>
                                                                <IconPencilCheck/>
                                                            </Link>
                                                        </button>
                                                    </td>
                                                </tr>
                                            )
                                        })
                                    }
                                </tbody>
                            </table>
                        )
                }
            </div>
        </div>
    )
}

export default ManageUsers;