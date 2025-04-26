'use client';
import axios from 'axios';
import { useFormik } from 'formik';
import { useRouter } from 'next/navigation';
import React from 'react';
import toast from 'react-hot-toast';
import * as Yup from 'yup';


const SignupSchema = Yup.object().shape({
    name: Yup.string().min(2, 'Too Short..!').max(50, 'Too Long!').required('Required'),
    email: Yup.string().email('Invalid email').required('Required'),
    password: Yup.string().min(7, 'Password is too short').required('Required'),
    confirmPassword: Yup.string().required('Required').oneOf([Yup.ref('password'), null], 'Passwords must match'),
});


const Signup = () => {

    const router = useRouter();

    const signupForm = useFormik({
        initialValues: {
            name: '',
            email: '',
            password: '',
            confirmPassword: ''
        },
        onSubmit: (values, { resetForm }) => {
            axios.post('http://localhost:5000/user/add', values)
                .then((result) => {
                    toast.success('User Created Successfully !!')
                    resetForm();
                    router.push('/login');
                }).catch((err) => {
                    console.log(err);
                    toast.error('Something went wrong !!')
                });
        },
        validationSchema: SignupSchema,
    })

    return (
        <div className='mx-auto flex items-center justify-center min-h-screen' style={{ background: '#121212' }}>
            <div className="mt-7 border border-gray-800 rounded-xl w-[30%] shadow-lg" style={{ background: '#1a1a1a' }}>
                <div className="p-4 sm:p-7">
                    <div className="text-center">
                        <h1 className="block text-2xl font-bold text-white">Sign up</h1>
                        <p className="mt-2 text-sm text-gray-400">
                            Already have an account?
                            <a
                                className="text-[#00FFFF] decoration-2 hover:underline focus:outline-hidden focus:underline font-medium ml-1"
                                href="/login"
                            >
                                Sign in here
                            </a>
                        </p>
                    </div>
                    <div className="mt-5">
                        <button
                            type="button"
                            className="w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-700 bg-gray-800 text-white shadow-2xs hover:bg-gray-700 focus:outline-hidden focus:bg-gray-700 disabled:opacity-50 disabled:pointer-events-none"
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
                            Sign up with Google
                        </button>
                        <div className="py-3 flex items-center text-xs text-gray-500 uppercase before:flex-1 before:border-t before:border-gray-700 before:me-6 after:flex-1 after:border-t after:border-gray-700 after:ms-6">
                            Or
                        </div>
                        {/* Form */}
                        <form onSubmit={signupForm.handleSubmit} >
                            <div className="grid gap-y-4">
                                {/* Form Group */}
                                <div>
                                    <label htmlFor="name" className="block text-sm mb-2 text-white">
                                        Name
                                    </label>
                                    <div className="relative">
                                        <input
                                            type="text"
                                            id="name"
                                            name="name"
                                            onChange={signupForm.handleChange}
                                            value={signupForm.values.name}
                                            className="py-2.5 sm:py-3 px-4 block w-full bg-gray-800 border-gray-700 text-white rounded-lg sm:text-sm focus:border-[#00FFFF] focus:ring-[#00FFFF] disabled:opacity-50 disabled:pointer-events-none"
                                            required=""
                                            aria-describedby="name-error"
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
                                    {
                                        (signupForm.errors.name && signupForm.touched.name) && (
                                            <p className="text-xs text-red-400 mt-2" id="email-error">
                                                {signupForm.errors.name}
                                            </p>
                                        )
                                    }

                                </div>
                                {/* End Form Group */}
                                {/* Form Group */}
                                <div>
                                    <label htmlFor="email" className="block text-sm mb-2 text-white">
                                        Email address
                                    </label>
                                    <div className="relative">
                                        <input
                                            type="email"
                                            id="email"
                                            name="email"
                                            onChange={signupForm.handleChange}
                                            value={signupForm.values.email}
                                            className="py-2.5 sm:py-3 px-4 block w-full bg-gray-800 border-gray-700 text-white rounded-lg sm:text-sm focus:border-[#00FFFF] focus:ring-[#00FFFF] disabled:opacity-50 disabled:pointer-events-none"
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
                                    {
                                        (signupForm.errors.email && signupForm.touched.email) && (
                                            <p className="text-xs text-red-400 mt-2" id="email-error">
                                                {signupForm.errors.email}
                                            </p>
                                        )
                                    }
                                </div>
                                {/* End Form Group */}
                                {/* Form Group */}
                                <div>
                                    <label htmlFor="password" className="block text-sm mb-2 text-white">
                                        Password
                                    </label>
                                    <div className="relative">
                                        <input
                                            type="password"
                                            id="password"
                                            name="password"
                                            onChange={signupForm.handleChange}
                                            value={signupForm.values.password}
                                            className="py-2.5 sm:py-3 px-4 block w-full bg-gray-800 border-gray-700 text-white rounded-lg sm:text-sm focus:border-[#00FFFF] focus:ring-[#00FFFF] disabled:opacity-50 disabled:pointer-events-none"
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
                                    {
                                        (signupForm.errors.password && signupForm.touched.password) && (
                                            <p className="text-xs text-red-400 mt-2" id="email-error">
                                                {signupForm.errors.password}
                                            </p>
                                        )
                                    }
                                </div>
                                {/* End Form Group */}
                                {/* Form Group */}
                                <div>
                                    <label htmlFor="confirm-password" className="block text-sm mb-2 text-white">
                                        Confirm Password
                                    </label>
                                    <div className="relative">
                                        <input
                                            type="password"
                                            id="confirmPassword"
                                            name="confirmPassword"
                                            onChange={signupForm.handleChange}
                                            value={signupForm.values.confirmPassword}
                                            className="py-2.5 sm:py-3 px-4 block w-full bg-gray-800 border-gray-700 text-white rounded-lg sm:text-sm focus:border-[#00FFFF] focus:ring-[#00FFFF] disabled:opacity-50 disabled:pointer-events-none"
                                            required=""
                                            aria-describedby="confirmPassword-error"
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
                                    {
                                        (signupForm.errors.confirmPassword && signupForm.touched.confirmPassword) && (
                                            <p className="text-xs text-red-400 mt-2" id="email-error">
                                                {signupForm.errors.confirmPassword}
                                            </p>
                                        )
                                    }
                                </div>
                                {/* End Form Group */}
                                {/* Checkbox */}
                                <div className="flex items-center">
                                    <div className="flex">
                                        <input
                                            id="remember-me"
                                            name="remember-me"
                                            type="checkbox"
                                            className="shrink-0 mt-0.5 border-gray-700 rounded-sm text-[#00FFFF] focus:ring-[#00FFFF]"
                                        />
                                    </div>
                                    <div className="ms-3">
                                        <label htmlFor="remember-me" className="text-sm text-white">
                                            I accept the{" "}
                                            <a
                                                className="text-[#00FFFF] decoration-2 hover:underline focus:outline-hidden focus:underline font-medium"
                                                href="#"
                                            >
                                                Terms and Conditions
                                            </a>
                                        </label>
                                    </div>
                                </div>
                                {/* End Checkbox */}
                                <button
                                    type="submit"
                                    className="w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-gradient-to-r from-[#00FFFF] to-[#FF00FF] text-white hover:opacity-90 focus:outline-hidden focus:opacity-90 disabled:opacity-50 disabled:pointer-events-none"
                                >
                                    Sign up
                                </button>
                            </div>
                        </form>
                        {/* End Form */}
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Signup;