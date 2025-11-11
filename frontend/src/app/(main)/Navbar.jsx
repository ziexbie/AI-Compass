'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { jwtDecode } from 'jwt-decode'


const Navbar = () => {

    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [userRole, setUserRole] = useState(null)

    useEffect(() => {
        // Check if user is logged in
        const token = localStorage.getItem('token')
        if (token) {
            try {
                const decodedToken = jwtDecode(token)
                setIsLoggedIn(true)
                setUserRole(decodedToken.role)
            } catch (error) {
                console.error('Invalid token:', error)
                localStorage.removeItem('token')
            }
        }
    }, [])

    return (
        <div className="sticky top-0 z-50 ">
            <nav className="backdrop-blur-md border-b bg-gray-900 border-gray-800">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16">
                        <div className="flex items-center">
                            <motion.div
                                className="text-2xl font-bold text-indigo-400"
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.5 }}
                            >
                                AI Compass
                            </motion.div>
                        </div>
                        <div className="flex items-center space-x-4">
                            <Link
                                href="/browse-tools"
                                className="px-3 py-2 rounded-md text-sm font-medium text-gray-200 hover:text-indigo-400 transition-colors"
                            >
                                Explore
                            </Link>
                            <Link
                                href="/user/compare-tools"
                                className="px-3 py-2 rounded-md text-sm font-medium text-gray-200 hover:text-indigo-400 transition-colors"
                            >
                                Compare
                            </Link>
                            {isLoggedIn ? (
                                <Link
                                    href={userRole === 'admin' ? '/admin/profile' : '/user/profile'}
                                    className="px-4 py-2 rounded-md text-sm font-medium text-white bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 shadow-sm transition-all hover:shadow-md"
                                >
                                    Profile
                                </Link>
                            ) : (
                                <Link
                                    href="/login"
                                    className="px-4 py-2 rounded-md text-sm font-medium text-white bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 shadow-sm transition-all hover:shadow-md"
                                >
                                    Sign In
                                </Link>
                            )}
                        </div>
                    </div>
                </div>
            </nav>
        </div>
    );
};

export default Navbar;