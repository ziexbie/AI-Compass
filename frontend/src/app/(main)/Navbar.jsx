'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

const Navbar = () => {
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
                                href="/compare-tools"
                                className="px-3 py-2 rounded-md text-sm font-medium text-gray-200 hover:text-indigo-400 transition-colors"
                            >
                                Compare
                            </Link>
                            <Link
                                href="/login"
                                className="px-4 py-2 rounded-md text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 shadow-sm transition-all hover:shadow-md"
                            >
                                Sign In
                            </Link>
                        </div>
                    </div>
                </div>
            </nav>
        </div>
    );
};

export default Navbar;