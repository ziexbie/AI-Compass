'use client';
import axios from 'axios';
import { useFormik } from 'formik';
import React from 'react';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { jwtDecode } from 'jwt-decode';

const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const Login = () => {

    const router = useRouter();

    const loginForm = useFormik({
        initialValues: {
            email: '',
            password: ''
        },
        onSubmit: (values) => {
            axios.post('http://localhost:5000/user/authenticate', values)
                .then((response) => {
                    if (response.data.token) {
                        // Store token with consistent key name
                        localStorage.setItem('token', response.data.token);
                        
                        // Decode token to check user role
                        const decodedToken = jwtDecode(response.data.token);
                        const userRole = decodedToken.role;
                        
                        toast.success('Login Successful');
                        
                        // Redirect based on user role
                        if (userRole === 'admin') {
                            router.push('/admin');
                        } else {
                            router.push('/');
                        }
                    } else {
                        toast.error('Login failed - no token received');
                    }
                }).catch((err) => {
                    console.error('Login error:', err);
                    toast.error(err.response?.data?.message || 'Login Failed');
                });
        }
    });

    return (
        <div className='mx-auto flex items-center justify-center min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 dark:from-gray-900 dark:to-gray-800'>
            <div className="relative">
                <motion.div
                    className="absolute inset-0 -z-10 overflow-hidden"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1 }}
                >
                    <svg className="absolute left-[calc(50%-33rem)] top-9 -z-10 transform-gpu blur-3xl" aria-hidden="true" viewBox="0 0 1155 678">
                        <path fill="url(#9b2541ea-d39d-499b-bd42-aeea3e93f5ff)" fillOpacity=".3" d="M317.219 518.975L203.852 678 0 438.341l317.219 80.634 204.172-286.402c1.307 132.337 45.083 346.658 209.733 145.248C936.936 126.058 882.053-94.234 1031.02 41.331c119.18 108.451 130.68 295.337 121.53 375.223L855 299l21.173 362.054-558.954-142.079z" />
                        <defs>
                            <linearGradient id="9b2541ea-d39d-499b-bd42-aeea3e93f5ff" x1="1155.49" x2="-78.208" y1=".177" y2="474.645" gradientUnits="userSpaceOnUse">
                                <stop stopColor="#9089FC" />
                                <stop offset={1} stopColor="#FF80B5" />
                            </linearGradient>
                        </defs>
                    </svg>
                </motion.div>
            </div>

            <motion.div
                className="mt-7 border border-gray-200 dark:border-gray-800 rounded-xl w-[30%] shadow-lg bg-white dark:bg-gray-800"
                initial="hidden"
                animate="visible"
                variants={fadeIn}
            >
                <div className="p-4 sm:p-7">
                    <div className="text-center">
                        <h1 className="block text-2xl font-bold text-gray-900 dark:text-white">Sign in</h1>
                        <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
                            Don't have an account yet?
                            <Link
                                className="text-indigo-600 dark:text-indigo-400 decoration-2 hover:underline focus:outline-none font-medium ml-1"
                                href="/signup"
                            >
                                Sign up here
                            </Link>
                        </p>
                    </div>
                    <div className="mt-5">
                        <button
                            type="button"
                            className="w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:bg-gray-700 focus:outline-none disabled:opacity-50 disabled:pointer-events-none"
                        >
                            <svg
                                className="w-4 h-auto"
                                width={46}
                                height={47}
                                viewBox="0 0 46 47"
                                fill="none"
                            >
                                <path
                                    d="M46 24.0287C46 22.09 45.8533 20.68 45.5013 19.2112H23.4694V27.9356H36.4069C36.1429 30.1094 34.7347 33.37 31.5957 35.5731L31.5663 35.8669L38.5191 41.2719L38.9885 41.3306C43.4477 37.2181 46 31.1669 46 24.0287Z"
                                    fill="#4285F4"
                                />
                                <path
                                    d="M23.4694 47C29.8061 47 35.1161 44.9144 39.0179 41.3012L31.625 35.5437C29.6301 36.9244 26.9898 37.8937 23.4987 37.8937C17.2793 37.8937 12.0281 33.7812 10.1505 28.1412L9.88649 28.1706L2.61097 33.7812L2.52296 34.0456C6.36608 41.7125 14.287 47 23.4694 47Z"
                                    fill="#34A853"
                                />
                                <path
                                    d="M10.1212 28.1413C9.62245 26.6725 9.32908 25.1156 9.32908 23.5C9.32908 21.8844 9.62245 20.3275 10.0918 18.8588V18.5356L2.75765 12.8369L2.52296 12.9544C0.909439 16.1269 0 19.7106 0 23.5C0 27.2894 0.909439 30.8731 2.49362 34.0456L10.1212 28.1413Z"
                                    fill="#FBBC05"
                                />
                                <path
                                    d="M23.4694 9.07688C27.8699 9.07688 30.8622 10.9863 32.5344 12.5725L39.1645 6.11C35.0867 2.32063 29.8061 0 23.4694 0C14.287 0 6.36607 5.2875 2.49362 12.9544L10.0918 18.8588C11.9987 13.1894 17.25 9.07688 23.4694 9.07688Z"
                                    fill="#EB4335"
                                />
                            </svg>
                            Sign in with Google
                        </button>
                        <div className="py-3 flex items-center text-xs text-gray-500 uppercase before:flex-1 before:border-t before:border-gray-200 dark:before:border-gray-700 before:me-6 after:flex-1 after:border-t after:border-gray-200 dark:after:border-gray-700 after:ms-6">
                            Or
                        </div>
                        {/* Form */}
                        <form onSubmit={loginForm.handleSubmit}>
                            <div className="grid gap-y-4">
                                {/* Form Group */}
                                <div>
                                    <label htmlFor="email" className="block text-sm mb-2 text-gray-800 dark:text-white">
                                        Email address
                                    </label>
                                    <div className="relative">
                                        <input
                                            type="email"
                                            id="email"
                                            name="email"
                                            onChange={loginForm.handleChange}
                                            value={loginForm.values.email}
                                            className="py-2.5 sm:py-3 px-4 block w-full bg-white dark:bg-gray-700 border-gray-200 dark:border-gray-700 text-gray-800 dark:text-white rounded-lg sm:text-sm focus:border-indigo-500 focus:ring-indigo-500 disabled:opacity-50 disabled:pointer-events-none"
                                            required=""
                                            aria-describedby="email-error"
                                        />
                                        <div className="hidden absolute inset-y-0 end-0 pointer-events-none pe-3">
                                            <svg
                                                className="size-5 text-red-500"
                                                width={16}
                                                height={16}
                                                fill="currentColor"
                                                viewBox="0 0 16 16"
                                                aria-hidden="true"
                                            >
                                                <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8 4a.905.905 0 0 0-.9.995l.35 3.507a.552.552 0 0 0 1.1 0l.35-3.507A.905.905 0 0 0 8 4zm.002 6a1 1 0 1 0 0 2 1 1 0 0 0 0-2z" />
                                            </svg>
                                        </div>
                                    </div>
                                    <p className="hidden text-xs text-red-400 mt-2" id="email-error">
                                        Please include a valid email address so we can get back to you
                                    </p>
                                </div>
                                {/* End Form Group */}
                                {/* Form Group */}
                                <div>
                                    <div className="flex flex-wrap justify-between items-center gap-2">
                                        <label htmlFor="password" className="block text-sm mb-2 text-gray-800 dark:text-white">
                                            Password
                                        </label>
                                        <a
                                            className="inline-flex items-center gap-x-1 text-sm text-indigo-600 dark:text-indigo-400 decoration-2 hover:underline focus:outline-none font-medium"
                                            href="../examples/html/recover-account.html"
                                        >
                                            Forgot password?
                                        </a>
                                    </div>
                                    <div className="relative">
                                        <input
                                            type="password"
                                            id="password"
                                            name="password"
                                            onChange={loginForm.handleChange}
                                            value={loginForm.values.password}
                                            className="py-2.5 sm:py-3 px-4 block w-full bg-white dark:bg-gray-700 border-gray-200 dark:border-gray-700 text-gray-800 dark:text-white rounded-lg sm:text-sm focus:border-indigo-500 focus:ring-indigo-500 disabled:opacity-50 disabled:pointer-events-none"
                                            required=""
                                            aria-describedby="password-error"
                                        />
                                        <div className="hidden absolute inset-y-0 end-0 pointer-events-none pe-3">
                                            <svg
                                                className="size-5 text-red-500"
                                                width={16}
                                                height={16}
                                                fill="currentColor"
                                                viewBox="0 0 16 16"
                                                aria-hidden="true"
                                            >
                                                <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8 4a.905.905 0 0 0-.9.995l.35 3.507a.552.552 0 0 0 1.1 0l.35-3.507A.905.905 0 0 0 8 4zm.002 6a1 1 0 1 0 0 2 1 1 0 0 0 0-2z" />
                                            </svg>
                                        </div>
                                    </div>
                                    <p className="hidden text-xs text-red-400 mt-2" id="password-error">
                                        8+ characters required
                                    </p>
                                </div>
                                {/* End Form Group */}
                                {/* Checkbox */}
                                <div className="flex items-center">
                                    <div className="flex">
                                        <input
                                            id="remember-me"
                                            name="remember-me"
                                            type="checkbox"
                                            className="shrink-0 mt-0.5 border-gray-200 dark:border-gray-700 rounded-sm text-indigo-600 focus:ring-indigo-500"
                                        />
                                    </div>
                                    <div className="ms-3">
                                        <label htmlFor="remember-me" className="text-sm text-gray-800 dark:text-white">
                                            Remember me
                                        </label>
                                    </div>
                                </div>
                                {/* End Checkbox */}
                                <motion.button
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    type="submit"
                                    className="w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-gradient-to-r from-indigo-500 to-purple-600 text-white hover:from-indigo-600 hover:to-purple-700 focus:outline-none shadow-sm hover:shadow-md transition-all disabled:opacity-50 disabled:pointer-events-none"
                                >
                                    Sign in
                                </motion.button>
                            </div>
                        </form>
                        {/* End Form */}
                    </div>
                </div>
            </motion.div>
        </div>
    )
}

export default Login;