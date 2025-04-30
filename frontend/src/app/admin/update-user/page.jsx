'use client';
import { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-hot-toast';
import axios from 'axios';
import { useRouter, useSearchParams } from 'next/navigation';

const UpdateUser = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const userId = searchParams.get('id');

  const userForm = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
      role: 'user'
    },
    validationSchema: Yup.object({
      name: Yup.string().required('Name is required'),
      email: Yup.string().email('Invalid email address').required('Email is required'),
      password: Yup.string().min(6, 'Password must be at least 6 characters'),
      role: Yup.string().oneOf(['user', 'admin'], 'Invalid role')
    }),
    onSubmit: async (values) => {
      try {
        setLoading(true);
        const response = await axios.put(`http://localhost:5000/user/update/${userId}`, values);
        if (response.status === 200) {
          toast.success('User updated successfully');
          router.push('/admin/manage-users');
        }
      } catch (error) {
        console.error('Update error:', error);
        toast.error(error.response?.data?.message || 'Failed to update user');
      } finally {
        setLoading(false);
      }
    }
  });

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/user/getbyid/${userId}`);
        const userData = response.data;
        userForm.setValues({
          name: userData.name || '',
          email: userData.email || '',
          password: '',
          role: userData.role || 'user'
        });
      } catch (error) {
        console.error('Error fetching user:', error);
        toast.error('Failed to fetch user data');
        router.push('/admin/manage-users');
      }
    };

    if (userId) {
      fetchUser();
    }
  }, [userId]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-pink-300 mb-10">Update User</h1>
        
        <form onSubmit={userForm.handleSubmit} className="space-y-6 bg-gray-800 p-8 rounded-xl shadow-lg border border-pink-300/20">
          {/* Name Field */}
          <div>
            <label className="block text-pink-300 text-sm font-semibold mb-2">Name *</label>
            <input
              type="text"
              name="name"
              onChange={userForm.handleChange}
              value={userForm.values.name}
              className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:border-pink-300 focus:ring-1 focus:ring-pink-300"
            />
            {userForm.errors.name && (
              <p className="mt-1 text-red-400 text-sm">{userForm.errors.name}</p>
            )}
          </div>

          {/* Email Field */}
          <div>
            <label className="block text-pink-300 text-sm font-semibold mb-2">Email *</label>
            <input
              type="email"
              name="email"
              onChange={userForm.handleChange}
              value={userForm.values.email}
              className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:border-pink-300 focus:ring-1 focus:ring-pink-300"
            />
            {userForm.errors.email && (
              <p className="mt-1 text-red-400 text-sm">{userForm.errors.email}</p>
            )}
          </div>

          {/* Password Field */}
          <div>
            <label className="block text-pink-300 text-sm font-semibold mb-2">
              Password
              <span className="text-gray-400 text-xs ml-2">(Leave empty to keep current)</span>
            </label>
            <input
              type="password"
              name="password"
              onChange={userForm.handleChange}
              value={userForm.values.password}
              className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:border-pink-300 focus:ring-1 focus:ring-pink-300"
            />
            {userForm.errors.password && (
              <p className="mt-1 text-red-400 text-sm">{userForm.errors.password}</p>
            )}
          </div>

          {/* Role Field */}
          <div>
            <label className="block text-pink-300 text-sm font-semibold mb-2">Role *</label>
            <select
              name="role"
              onChange={userForm.handleChange}
              value={userForm.values.role}
              className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:border-pink-300 focus:ring-1 focus:ring-pink-300"
            >
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
            {userForm.errors.role && (
              <p className="mt-1 text-red-400 text-sm">{userForm.errors.role}</p>
            )}
          </div>

          {/* Submit Button */}
          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={() => router.push('/admin/manage-users')}
              className="px-6 py-2 border border-gray-600 text-gray-300 rounded-lg hover:bg-gray-700 transition-all"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2 bg-gradient-to-r from-pink-500 to-purple-600 text-white font-semibold rounded-lg hover:from-pink-600 hover:to-purple-700 disabled:opacity-50 transition-all"
            >
              {loading ? 'Updating...' : 'Update User'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateUser;