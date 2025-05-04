'use client';
import { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-hot-toast';
import axios from 'axios';
import { useRouter, useSearchParams } from 'next/navigation';
import StarRating from '@/components/StarRating';

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
      version: '',
      website: '',
      features: [],
      pricing: {
        free: false,
        startingPrice: '',
        trial: false,
        subscription: {
          monthly: '',
          yearly: ''
        }
      },
      platform: {
        web: false,
        windows: false,
        mac: false,
        linux: false,
        ios: false,
        android: false
      },
      api: {
        available: false,
        documentation: ''
      },
      performance: {
        speed: 1,
        accuracy: 1
      },
      status: true,
      logo: null
    },
    validationSchema: Yup.object({
      name: Yup.string().required('Tool name is required'),
      description: Yup.string().required('Description is required'),
      category: Yup.string().required('Category is required'),
      version: Yup.string().required('Version is required'),
      website: Yup.string().url('Must be a valid URL').required('Website URL is required'),
      features: Yup.array().of(Yup.string()),
      pricing: Yup.object({
        startingPrice: Yup.number().min(0, 'Price cannot be negative'),
        subscription: Yup.object({
          monthly: Yup.number().min(0, 'Price cannot be negative'),
          yearly: Yup.number().min(0, 'Price cannot be negative')
        })
      }),
      api: Yup.object({
        documentation: Yup.string().when('available', {
          is: true,
          then: Yup.string().url('Must be a valid URL').required('Documentation URL is required')
        })
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
          version: toolData.version || '',
          website: toolData.website || '',
          features: toolData.features || [],
          pricing: {
            free: toolData.pricing?.free ?? false,
            startingPrice: toolData.pricing?.startingPrice || '',
            trial: toolData.pricing?.trial ?? false,
            subscription: {
              monthly: toolData.pricing?.subscription?.monthly || '',
              yearly: toolData.pricing?.subscription?.yearly || ''
            }
          },
          platform: {
            web: toolData.platform?.web ?? false,
            windows: toolData.platform?.windows ?? false,
            mac: toolData.platform?.mac ?? false,
            linux: toolData.platform?.linux ?? false,
            ios: toolData.platform?.ios ?? false,
            android: toolData.platform?.android ?? false
          },
          api: {
            available: toolData.api?.available ?? false,
            documentation: toolData.api?.documentation || ''
          },
          performance: {
            speed: toolData.performance?.speed || 1,
            accuracy: toolData.performance?.accuracy || 1
          },
          status: toolData.status ?? true,
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

  const handleFeatureAdd = () => {
    const feature = document.getElementById('featureInput').value.trim();
    if (feature) {
      toolForm.setFieldValue('features', [...toolForm.values.features, feature]);
      document.getElementById('featureInput').value = '';
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
              <label className="block text-pink-300 text-sm font-semibold mb-2">Description *</label>
              <textarea
                name="description"
                onChange={toolForm.handleChange}
                value={toolForm.values.description}
                rows="3"
                className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:border-pink-300 focus:ring-1 focus:ring-pink-300"
              />
              {toolForm.errors.description && <p className="mt-1 text-red-400 text-sm">{toolForm.errors.description}</p>}
            </div>

            {/* Category Field */}
            <div className="md:col-span-2">
              <label className="block text-pink-300 text-sm font-semibold mb-2">Category *</label>
              <input
                type="text"
                name="category"
                onChange={toolForm.handleChange}
                value={toolForm.values.category}
                className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:border-pink-300 focus:ring-1 focus:ring-pink-300"
              />
              {toolForm.errors.category && <p className="mt-1 text-red-400 text-sm">{toolForm.errors.category}</p>}
            </div>

            {/* Version Field */}
            <div className="md:col-span-2">
              <label className="block text-pink-300 text-sm font-semibold mb-2">Version *</label>
              <input
                type="text"
                name="version"
                onChange={toolForm.handleChange}
                value={toolForm.values.version}
                className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:border-pink-300 focus:ring-1 focus:ring-pink-300"
              />
              {toolForm.errors.version && <p className="mt-1 text-red-400 text-sm">{toolForm.errors.version}</p>}
            </div>

            {/* Website URL Field */}
            <div className="md:col-span-2">
              <label className="block text-pink-300 text-sm font-semibold mb-2">Website URL *</label>
              <input
                type="url"
                name="website"
                onChange={toolForm.handleChange}
                value={toolForm.values.website}
                className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:border-pink-300 focus:ring-1 focus:ring-pink-300"
              />
              {toolForm.errors.website && <p className="mt-1 text-red-400 text-sm">{toolForm.errors.website}</p>}
            </div>

            {/* Features Section */}
            <div className="space-y-4 md:col-span-2">
              <label className="block text-pink-300 text-sm font-semibold">Features</label>
              <div className="flex gap-2">
                <input
                  id="featureInput"
                  type="text"
                  className="flex-1 px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:border-pink-300 focus:ring-1 focus:ring-pink-300"
                  placeholder="Enter a feature"
                />
                <button
                  type="button"
                  onClick={handleFeatureAdd}
                  className="px-4 py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-600"
                >
                  Add
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {toolForm.values.features.map((feature, index) => (
                  <div key={index} className="flex items-center bg-gray-700 px-3 py-1 rounded-full">
                    <span className="text-white">{feature}</span>
                    <button
                      type="button"
                      className="ml-2 text-gray-400 hover:text-red-500"
                      onClick={() => {
                        toolForm.setFieldValue(
                          'features',
                          toolForm.values.features.filter((_, i) => i !== index)
                        );
                      }}
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Enhanced Pricing Section with Subscription */}
            <div className="space-y-4 md:col-span-2">
              <label className="block text-pink-300 text-sm font-semibold">Pricing</label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex gap-4">
                    <label className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        name="pricing.free"
                        checked={toolForm.values.pricing.free}
                        onChange={toolForm.handleChange}
                        className="rounded border-gray-600 text-pink-500 focus:ring-pink-500 bg-gray-700"
                      />
                      <span className="text-white">Free Tier</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        name="pricing.trial"
                        checked={toolForm.values.pricing.trial}
                        onChange={toolForm.handleChange}
                        className="rounded border-gray-600 text-pink-500 focus:ring-pink-500 bg-gray-700"
                      />
                      <span className="text-white">Trial Available</span>
                    </label>
                  </div>
                  <div>
                    <label className="block text-pink-300 text-sm font-semibold mb-2">Starting Price ($)</label>
                    <input
                      type="number"
                      name="pricing.startingPrice"
                      onChange={toolForm.handleChange}
                      value={toolForm.values.pricing.startingPrice}
                      className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:border-pink-300 focus:ring-1 focus:ring-pink-300"
                      min="0"
                      step="0.01"
                    />
                  </div>
                  <div>
                    <label className="block text-white text-sm mb-2">Monthly Subscription ($)</label>
                    <input
                      type="number"
                      name="pricing.subscription.monthly"
                      value={toolForm.values.pricing.subscription.monthly}
                      onChange={toolForm.handleChange}
                      min="0"
                      step="0.01"
                      className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:border-pink-300 focus:ring-1 focus:ring-pink-300"
                    />
                  </div>
                  <div>
                    <label className="block text-white text-sm mb-2">Yearly Subscription ($)</label>
                    <input
                      type="number"
                      name="pricing.subscription.yearly"
                      value={toolForm.values.pricing.subscription.yearly}
                      onChange={toolForm.handleChange}
                      min="0"
                      step="0.01"
                      className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:border-pink-300 focus:ring-1 focus:ring-pink-300"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Platform Availability */}
            <div className="space-y-4 md:col-span-2">
              <label className="block text-pink-300 text-sm font-semibold">Platform Availability</label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {Object.entries(toolForm.values.platform).map(([key, value]) => (
                  <label key={key} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      name={`platform.${key}`}
                      checked={value}
                      onChange={toolForm.handleChange}
                      className="rounded border-gray-600 text-pink-500 focus:ring-pink-500 bg-gray-700"
                    />
                    <span className="text-white capitalize">{key}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* API Information */}
            <div className="space-y-4 md:col-span-2">
              <label className="block text-pink-300 text-sm font-semibold">API Information</label>
              <div className="space-y-4">
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    name="api.available"
                    checked={toolForm.values.api.available}
                    onChange={toolForm.handleChange}
                    className="rounded border-gray-600 text-pink-500 focus:ring-pink-500 bg-gray-700"
                  />
                  <span className="text-white">API Available</span>
                </label>
                {toolForm.values.api.available && (
                  <input
                    type="url"
                    name="api.documentation"
                    placeholder="API Documentation URL"
                    value={toolForm.values.api.documentation}
                    onChange={toolForm.handleChange}
                    className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:border-pink-300 focus:ring-1 focus:ring-pink-300"
                  />
                )}
              </div>
            </div>

            {/* Performance Metrics */}
            <div className="space-y-4 md:col-span-2">
              <label className="block text-pink-300 text-sm font-semibold">Performance Metrics</label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="block text-white text-sm mb-2">Speed Rating</label>
                  <StarRating
                    rating={toolForm.values.performance.speed}
                    onRatingChange={(value) => toolForm.setFieldValue('performance.speed', value)}
                    name="performance.speed"
                  />
                  <p className="text-sm text-gray-400">Rate the tool's processing speed</p>
                </div>
                <div className="space-y-2">
                  <label className="block text-white text-sm mb-2">Accuracy Rating</label>
                  <StarRating
                    rating={toolForm.values.performance.accuracy}
                    onRatingChange={(value) => toolForm.setFieldValue('performance.accuracy', value)}
                    name="performance.accuracy"
                  />
                  <p className="text-sm text-gray-400">Rate the tool's output accuracy</p>
                </div>
              </div>
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