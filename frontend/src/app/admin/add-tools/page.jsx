'use client';
import { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-hot-toast';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import StarRating from '@/components/StarRating';
import { jwtDecode } from 'jwt-decode';

const AddTools = () => {
  const [loading, setLoading] = useState(false);
  const [logoPreview, setLogoPreview] = useState(null);
  const router = useRouter();

  const [admin, setAdmin] = useState(null);
  
       
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
  

  const handleFileChange = (event) => {
    const file = event.currentTarget.files[0];
    if (file) {
      if (file.size > 1024 * 1024 * 2) {
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

  const toolForm = useFormik({
    initialValues: {
      name: '',
      description: '',
      category: '',
      status: true,
      logo: null,
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
      website: ''
    },
    validationSchema: Yup.object({
      name: Yup.string().required('Tool name is required'),
      description: Yup.string().required('Description is required'),
      category: Yup.string().required('Category is required'),
      website: Yup.string().url('Must be a valid URL').required('Website URL is required'),
      features: Yup.array().of(Yup.string()),
      pricing: Yup.object({
        startingPrice: Yup.string(),
        subscription: Yup.object({
          monthly: Yup.string(),
          yearly: Yup.string()
        })
      }),
      api: Yup.object({
        available: Yup.boolean(),
        documentation: Yup.string()
      }).test(
        'api-doc-required',
        'Documentation URL is required and must be valid when API is available',
        function (value) {
          if (value && value.available) {
            return (
              !!value.documentation &&
              Yup.string().url('Must be a valid URL').isValidSync(value.documentation)
            );
          }
          return true;
        }
      )
    }),
    onSubmit: async (values) => {
      try {
        setLoading(true);
        let logoUrl = null;

        // Handle logo upload
        if (values.logo) {
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

          if (!uploadResponse.ok) {
            throw new Error('Failed to upload logo');
          }

          const uploadData = await uploadResponse.json();
          logoUrl = uploadData.secure_url;
        }

        // Prepare the tool data
        const toolData = {
          ...values,
          logo: logoUrl,
          rating: 0, 
          createdAt: new Date(), 
          
          
        };

        // Add this right before the axios.post call
        console.log('Submitting tool data:', toolData);

        // Send the data to your backend
        const response = await axios.post('http://localhost:5000/tool/add', toolData);
        
        if (response.status === 200) {
          toast.success('Tool added successfully');
          router.push('/admin/manage-tools');
        }
      } catch (error) {
        console.error('Error:', error);
        toast.error(error.response?.data?.message || 'Failed to add tool');
      } finally {
        setLoading(false);
      }
    }
  });

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
        <h1 className="text-4xl font-bold text-center text-pink-300 mb-10">Add New AI Tool</h1>
        
        <form onSubmit={toolForm.handleSubmit} className="space-y-6 bg-gray-800 p-8 rounded-xl shadow-lg border border-pink-300/20">
          {/* Basic Information */}
          <div className="space-y-6">
            <div>
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

            <div>
              <label className="block text-pink-300 text-sm font-semibold mb-2">Description *</label>
              <textarea
                name="description"
                rows="4"
                onChange={toolForm.handleChange}
                value={toolForm.values.description}
                className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:border-pink-300 focus:ring-1 focus:ring-pink-300"
              />
              {toolForm.errors.description && <p className="mt-1 text-red-400 text-sm">{toolForm.errors.description}</p>}
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div>
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

              {/* <div>
                <label className="block text-pink-300 text-sm font-semibold mb-2">Version *</label>
                <input
                  type="text"
                  name="version"
                  onChange={toolForm.handleChange}
                  value={toolForm.values.version}
                  className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:border-pink-300 focus:ring-1 focus:ring-pink-300"
                />
                {toolForm.errors.version && <p className="mt-1 text-red-400 text-sm">{toolForm.errors.version}</p>}
              </div> */}
            </div>
          </div>

          {/* Features */}
          <div className="space-y-4">
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

          {/* Platform Availability */}
          <div className="space-y-4">
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

          {/* Performance Metrics */}
          <div className="space-y-4">
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

          {/* API Information */}
          <div className="space-y-4">
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
              {toolForm.errors.api?.documentation && (
                <p className="mt-1 text-red-400 text-sm">{toolForm.errors.api.documentation}</p>
              )}
            </div>
          </div>

          {/* Pricing Information */}
          <div className="space-y-4">
            <label className="block text-pink-300 text-sm font-semibold">Pricing</label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    name="pricing.free"
                    checked={toolForm.values.pricing.free}
                    onChange={toolForm.handleChange}
                    className="rounded border-gray-600 text-pink-500 focus:ring-pink-500 bg-gray-700"
                  />
                  <span className="text-white">Free Tier Available</span>
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
              <div className="space-y-4">
                <div>
                  <label className="block text-white text-sm mb-2">Starting Price</label>
                  <input
                    type="text" // Changed from number to text
                    name="pricing.startingPrice"
                    value={toolForm.values.pricing.startingPrice}
                    onChange={toolForm.handleChange}
                    placeholder="e.g., $10 or Contact for pricing"
                    className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:border-pink-300 focus:ring-1 focus:ring-pink-300"
                  />
                </div>
                <div>
                  <label className="block text-white text-sm mb-2">Monthly Subscription</label>
                  <input
                    type="text" // Changed from number to text
                    name="pricing.subscription.monthly"
                    value={toolForm.values.pricing.subscription.monthly}
                    onChange={toolForm.handleChange}
                    placeholder="e.g., $29.99/month or Custom pricing"
                    className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:border-pink-300 focus:ring-1 focus:ring-pink-300"
                  />
                </div>
                <div>
                  <label className="block text-white text-sm mb-2">Yearly Subscription</label>
                  <input
                    type="text" // Changed from number to text
                    name="pricing.subscription.yearly"
                    value={toolForm.values.pricing.subscription.yearly}
                    onChange={toolForm.handleChange}
                    placeholder="e.g., $299/year or Enterprise pricing"
                    className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:border-pink-300 focus:ring-1 focus:ring-pink-300"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Website URL */}
          <div>
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

          {/* Logo Upload */}
          <div>
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
                    ×
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-3 bg-gradient-to-r from-pink-500 to-purple-600 text-white font-semibold rounded-lg hover:from-pink-600 hover:to-purple-700 disabled:opacity-50 transition-all"
            >
              {loading ? 'Adding Tool...' : 'Add Tool'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddTools;