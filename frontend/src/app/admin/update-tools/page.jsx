'use client';
import { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-hot-toast';
import axios from 'axios';
import { useRouter, useSearchParams } from 'next/navigation';

const UpdateTool = () => {
  const [loading, setLoading] = useState(false);
  const [logoPreview, setLogoPreview] = useState(null);
  const router = useRouter();
  const searchParams = useSearchParams();
  const toolId = searchParams.get('id');

  const toolForm = useFormik({
    initialValues: {
      name: '',
      description: '',
      category: '',
      status: true,
      rejected: false,
      logo: null
    },
    validationSchema: Yup.object({
      name: Yup.string().required('Tool name is required'),
      description: Yup.string(),
      category: Yup.string(),
      status: Yup.boolean(),
      rejected: Yup.boolean(),
      logo: Yup.mixed().test('fileType', 'Unsupported file format', (value) => {
        if (!value) return true;
        return ['image/jpeg', 'image/png', 'image/gif'].includes(value.type);
      })
    }),
    onSubmit: async (values) => {
      try {
        setLoading(true);
        let logoUrl = values.logo;

        // Handle new logo upload if file is selected
        if (values.logo && values.logo instanceof File) {
          const formData = new FormData();
          formData.append('file', values.logo);
          formData.append('upload_preset', process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET);

          const uploadResponse = await fetch(
            `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
            {
              method: 'POST',
              body: formData,
            }
          );

          const uploadData = await uploadResponse.json();
          logoUrl = uploadData.secure_url;
        }

        const toolData = {
          ...values,
          logo: logoUrl
        };

        const response = await axios.put(`http://localhost:5000/tool/update/${toolId}`, toolData);
        
        if (response.status === 200) {
          toast.success('Tool updated successfully');
          router.push('/admin/manage-tools');
        }
      } catch (error) {
        console.error('Error:', error);
        toast.error(error.response?.data?.message || 'Failed to update tool');
      } finally {
        setLoading(false);
      }
    }
  });

  useEffect(() => {
    const fetchTool = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/tool/getbyid/${toolId}`);
        const toolData = response.data;
        
        toolForm.setValues({
          name: toolData.name || '',
          description: toolData.description || '',
          category: toolData.category || '',
          status: toolData.status ?? true,
          rejected: toolData.rejected ?? false,
          logo: toolData.logo || null
        });

        if (toolData.logo) {
          setLogoPreview(toolData.logo);
        }
      } catch (error) {
        console.error('Error fetching tool:', error);
        toast.error('Failed to fetch tool data');
        router.push('/admin/manage-tools');
      }
    };

    if (toolId) {
      fetchTool();
    }
  }, [toolId]);

  const handleFileChange = (event) => {
    const file = event.currentTarget.files[0];
    if (file) {
      if (file.size > 1024 * 1024 * 2) { // 2MB limit
        toast.error('File size should be less than 2MB');
        return;
      }
      toolForm.setFieldValue('logo', file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setLogoPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-pink-300 mb-10">Update AI Tool</h1>
        
        <form onSubmit={toolForm.handleSubmit} className="space-y-6 bg-gray-800 p-8 rounded-xl shadow-lg border border-pink-300/20">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {/* Name Field */}
            <div className="md:col-span-2">
              <label className="block text-pink-300 text-sm font-semibold mb-2">Tool Name *</label>
              <input
                type="text"
                name="name"
                onChange={toolForm.handleChange}
                value={toolForm.values.name}
                className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:border-pink-300 focus:ring-1 focus:ring-pink-300"
              />
              {toolForm.errors.name && <p className="mt-1 text-red-400 text-sm">{toolForm.errors.name}</p>}
            </div>

            {/* Description Field */}
            <div className="md:col-span-2">
              <label className="block text-pink-300 text-sm font-semibold mb-2">Description</label>
              <textarea
                name="description"
                onChange={toolForm.handleChange}
                value={toolForm.values.description}
                rows="3"
                className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:border-pink-300 focus:ring-1 focus:ring-pink-300"
              />
            </div>

            {/* Category Field */}
            <div className="md:col-span-2">
              <label className="block text-pink-300 text-sm font-semibold mb-2">Category</label>
              <input
                type="text"
                name="category"
                onChange={toolForm.handleChange}
                value={toolForm.values.category}
                className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:border-pink-300 focus:ring-1 focus:ring-pink-300"
              />
            </div>

            {/* Status Field */}
            <div>
              <label className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  name="status"
                  checked={toolForm.values.status}
                  onChange={toolForm.handleChange}
                  className="rounded border-gray-600 text-pink-500 focus:ring-pink-500 bg-gray-700"
                />
                <span className="text-pink-300 text-sm font-semibold">Active Status</span>
              </label>
            </div>

            {/* Logo Upload Field */}
            <div className="md:col-span-2">
              <label className="block text-pink-300 text-sm font-semibold mb-2">Logo Upload</label>
              <div className="flex flex-col gap-4">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-pink-500 file:text-white hover:file:bg-pink-600 text-white"
                />
                {logoPreview && (
                  <div className="relative w-24 h-24">
                    <img
                      src={logoPreview}
                      alt="Logo Preview"
                      className="w-full h-full object-cover rounded-lg"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        toolForm.setFieldValue('logo', null);
                        setLogoPreview(null);
                      }}
                      className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                    >
                      ✕
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="flex justify-end space-x-4 mt-6">
            <button
              type="button"
              onClick={() => router.push('/admin/manage-tools')}
              className="px-6 py-2 border border-gray-600 text-gray-300 rounded-lg hover:bg-gray-700 transition-all"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2 bg-gradient-to-r from-pink-500 to-purple-600 text-white font-semibold rounded-lg hover:from-pink-600 hover:to-purple-700 disabled:opacity-50 transition-all"
            >
              {loading ? 'Updating...' : 'Update Tool'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateTool;