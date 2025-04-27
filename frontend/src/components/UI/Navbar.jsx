// 'use client';

// import React from 'react';
// import Link from 'next/link';
// import { motion } from 'framer-motion';

// const Navbar = () => {
//     return (
//         <nav className="backdrop-blur-md bg-white/80 dark:bg-gray-900/80 sticky top-0 z-10 border-b border-gray-200 dark:border-gray-800">
//             <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//                 <div className="flex justify-between h-16">
//                     <div className="flex items-center">
//                         <motion.div
//                             className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-purple-600"
//                             initial={{ opacity: 0, x: -20 }}
//                             animate={{ opacity: 1, x: 0 }}
//                             transition={{ duration: 0.5 }}
//                         >
//                             AI Compass
//                         </motion.div>
//                     </div>
//                     <div className="flex items-center space-x-4">
//                         <Link
//                             href="/explore"
//                             className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-indigo-600 dark:text-gray-200 dark:hover:text-indigo-400 transition-colors"
//                         >
//                             Explore
//                         </Link>
//                         <Link
//                             href="/compare"
//                             className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-indigo-600 dark:text-gray-200 dark:hover:text-indigo-400 transition-colors"
//                         >
//                             Compare
//                         </Link>
//                         <Link
//                             href="/dashboard"
//                             className="px-4 py-2 rounded-md text-sm font-medium text-white bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 shadow-sm transition-all hover:shadow-md"
//                         >
//                             Sign In
//                         </Link>
//                     </div>
//                 </div>
//             </div>
//         </nav>
//     );
// };

// export default Navbar;