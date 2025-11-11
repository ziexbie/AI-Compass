'use client';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import Link from 'next/link';
import { IconTrashFilled, IconPencil, IconEye, IconSearch, IconTool, IconPlus, IconChevronDown, IconChevronUp, IconStar, IconCurrency, IconDevices, IconApi, IconSparkles } from '@tabler/icons-react';
import StarRating from '@/components/StarRating';
import { useRouter } from 'next/navigation';
import { jwtDecode } from 'jwt-decode';

const ManageTools = () => {
  const router = useRouter();
  const [tools, setTools] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedTool, setExpandedTool] = useState(null);
  const [admin, setAdmin] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');


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


  const fetchTools = async () => {
    try {
      const res = await axios.get('http://localhost:5000/tool/getall');
      setTools(res.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching tools:', error);
      toast.error('Failed to load tools');
      setLoading(false);
    }
  };

  const deleteTool = async (toolId) => {
    if (window.confirm('Are you sure you want to delete this tool?')) {
      try {
        const res = await axios.delete(`http://localhost:5000/tool/delete/${toolId}`);
        if (res.status === 200) {
          toast.success('Tool deleted successfully');
          fetchTools();
        }
      } catch (error) {
        console.error('Error deleting tool:', error);
        toast.error('Failed to delete tool');
      }
    }
  };

  useEffect(() => {
    fetchTools();
  }, []);

  // Get unique categories
  const categories = ['all', ...new Set(tools.map(tool => tool.category))];

  // Filter tools
  const filteredTools = tools.filter(tool => {
    const matchesSearch = tool.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tool.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tool.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === 'all' || tool.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  const ExpandedToolView = ({ tool }) => (
    <div className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-xl mt-4 border border-gray-700/50">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Description */}
        <div className="md:col-span-2">
          <div className="flex items-center gap-2 mb-3">
            <IconSparkles className="w-5 h-5 text-purple-400" />
            <h3 className="text-purple-300 font-semibold text-lg">Description</h3>
          </div>
          <p className="text-gray-300 leading-relaxed bg-gray-900/30 p-4 rounded-lg">{tool.description}</p>
        </div>

        {/* Features */}
        <div className="md:col-span-2">
          <div className="flex items-center gap-2 mb-3">
            <IconStar className="w-5 h-5 text-yellow-400" />
            <h3 className="text-yellow-300 font-semibold text-lg">Features</h3>
          </div>
          <div className="flex flex-wrap gap-2">
            {tool.features.map((feature, index) => (
              <span key={index} className="px-4 py-2 bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30 rounded-full text-white text-sm font-medium">
                {feature}
              </span>
            ))}
          </div>
        </div>

        {/* Performance Metrics */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <IconSparkles className="w-5 h-5 text-blue-400" />
            <h3 className="text-blue-300 font-semibold text-lg">Performance</h3>
          </div>
          <div className="space-y-3 bg-gray-900/30 p-4 rounded-lg">
            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="text-gray-300 text-sm">Speed</span>
                <span className="text-blue-400 font-semibold">{tool.performance.speed}/5</span>
              </div>
              <StarRating rating={tool.performance.speed} readonly={true} />
            </div>
            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="text-gray-300 text-sm">Accuracy</span>
                <span className="text-blue-400 font-semibold">{tool.performance.accuracy}/5</span>
              </div>
              <StarRating rating={tool.performance.accuracy} readonly={true} />
            </div>
          </div>
        </div>

        {/* Pricing */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <IconCurrency className="w-5 h-5 text-green-400" />
            <h3 className="text-green-300 font-semibold text-lg">Pricing</h3>
          </div>
          <div className="space-y-2 bg-gray-900/30 p-4 rounded-lg">
            {tool.pricing.free && (
              <div className="flex items-center gap-2 text-green-400">
                <span className="w-2 h-2 bg-green-400 rounded-full"></span>
                Free Tier Available
              </div>
            )}
            {tool.pricing.trial && (
              <div className="flex items-center gap-2 text-blue-400">
                <span className="w-2 h-2 bg-blue-400 rounded-full"></span>
                Trial Available
              </div>
            )}
            {tool.pricing.startingPrice > 0 && (
              <div className="text-gray-300">
                <span className="text-gray-400">Starting from:</span> <span className="text-white font-semibold">${tool.pricing.startingPrice}</span>
              </div>
            )}
            {tool.pricing.subscription.monthly > 0 && (
              <div className="text-gray-300">
                <span className="text-gray-400">Monthly:</span> <span className="text-white font-semibold">${tool.pricing.subscription.monthly}</span>
              </div>
            )}
            {tool.pricing.subscription.yearly > 0 && (
              <div className="text-gray-300">
                <span className="text-gray-400">Yearly:</span> <span className="text-white font-semibold">${tool.pricing.subscription.yearly}</span>
              </div>
            )}
          </div>
        </div>

        {/* Platform Availability */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <IconDevices className="w-5 h-5 text-orange-400" />
            <h3 className="text-orange-300 font-semibold text-lg">Platforms</h3>
          </div>
          <div className="flex flex-wrap gap-2">
            {Object.entries(tool.platform)
              .filter(([_, value]) => value)
              .map(([key]) => (
                <span key={key} className="px-4 py-2 bg-gradient-to-r from-orange-500/20 to-red-500/20 border border-orange-500/30 rounded-full text-white text-sm font-medium capitalize">
                  {key}
                </span>
              ))}
          </div>
        </div>

        {/* API Information */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <IconApi className="w-5 h-5 text-cyan-400" />
            <h3 className="text-cyan-300 font-semibold text-lg">API Details</h3>
          </div>
          {tool.api.available ? (
            <div className="space-y-2 bg-gray-900/30 p-4 rounded-lg">
              <div className="flex items-center gap-2 text-green-400">
                <span className="w-2 h-2 bg-green-400 rounded-full"></span>
                API Available
              </div>
              {tool.api.documentation && (
                <a
                  href={tool.api.documentation}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 transition-colors"
                >
                  View Documentation →
                </a>
              )}
            </div>
          ) : (
            <div className="bg-gray-900/30 p-4 rounded-lg text-gray-400">No API Available</div>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 py-8 px-4">
      <div className="container mx-auto max-w-7xl">
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            <div className="flex items-center gap-3">
              <div className="bg-gradient-to-br from-pink-500 to-purple-600 p-3 rounded-xl shadow-lg">
                <IconTool className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-4xl font-bold bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
                  Manage AI Tools
                </h1>
                <p className="text-gray-400 text-sm mt-1">
                  Total Tools: <span className="text-pink-400 font-semibold">{tools.length}</span>
                  {filterCategory !== 'all' && ` • Showing: ${filteredTools.length}`}
                </p>
              </div>
            </div>
            <Link
              href="/admin/add-tools"
              className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-pink-500 to-purple-600 text-white font-semibold rounded-xl hover:from-pink-600 hover:to-purple-700 transition-all shadow-lg hover:shadow-pink-500/50 hover:scale-105"
            >
              <IconPlus className="w-5 h-5" />
              Add New Tool
            </Link>
          </div>

          {/* Search and Filter Bar */}
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="relative flex-1">
              <IconSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search tools by name, description, or category..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-gray-800/50 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all"
              />
            </div>

            {/* Category Filter */}
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all cursor-pointer"
            >
              {categories.map(category => (
                <option key={category} value={category} className="bg-gray-800">
                  {category === 'all' ? 'All Categories' : category}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Tools List */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-pink-500 mb-4"></div>
            <p className="text-xl text-gray-400">Loading tools...</p>
          </div>
        ) : filteredTools.length === 0 ? (
          <div className="text-center py-20">
            <IconTool className="w-20 h-20 text-gray-600 mx-auto mb-4" />
            <p className="text-xl text-gray-400">No tools found</p>
            {searchTerm && (
              <p className="text-gray-500 mt-2">Try adjusting your search criteria</p>
            )}
          </div>
        ) : (
          <div className="space-y-4">
            {filteredTools.map((tool) => (
              <div key={tool._id} className="bg-gray-800/30 backdrop-blur-sm rounded-2xl border border-gray-700/50 overflow-hidden hover:border-purple-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/10">
                <div className="px-6 py-5">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    {/* Tool Info */}
                    <div className="flex items-center space-x-4 flex-1">
                      {/* Tool Logo */}
                      <div className="flex-shrink-0">
                        {tool.logo ? (
                          <img
                            src={tool.logo}
                            alt={tool.name}
                            className="h-16 w-16 rounded-xl object-cover shadow-lg"
                            onError={(e) => {
                              e.target.style.display = 'none';
                              e.target.nextSibling.style.display = 'flex';
                            }}
                          />
                        ) : null}
                        <div className={`h-16 w-16 rounded-xl bg-gradient-to-br from-pink-500 to-purple-600 flex items-center justify-center shadow-lg ${tool.logo ? 'hidden' : 'flex'}`}>
                          <span className="text-white text-2xl font-bold">{tool.name[0]}</span>
                        </div>
                      </div>

                      {/* Tool Details */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-3 mb-1">
                          <h2 className="text-xl font-semibold text-white truncate">{tool.name}</h2>
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-semibold flex-shrink-0 ${
                              tool.status
                                ? 'bg-green-500/20 text-green-300 border border-green-500/30'
                                : 'bg-red-500/20 text-red-300 border border-red-500/30'
                            }`}
                          >
                            {tool.status ? 'Active' : 'Inactive'}
                          </span>
                        </div>
                        <div className="flex items-center gap-4 text-sm">
                          <span className="px-3 py-1 bg-purple-500/20 text-purple-300 rounded-full border border-purple-500/30">
                            {tool.category}
                          </span>
                          {tool.pricing.free && (
                            <span className="px-3 py-1 bg-green-500/20 text-green-300 rounded-full border border-green-500/30">
                              Free
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-2 flex-shrink-0">
                      <button
                        onClick={() => setExpandedTool(expandedTool === tool._id ? null : tool._id)}
                        className="group relative p-3 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 hover:from-blue-500/30 hover:to-cyan-500/30 border border-blue-500/30 rounded-xl transition-all duration-200 transform hover:scale-105"
                        title="View Details"
                      >
                        {expandedTool === tool._id ? (
                          <IconChevronUp className="w-5 h-5 text-blue-400" />
                        ) : (
                          <IconChevronDown className="w-5 h-5 text-blue-400" />
                        )}
                      </button>
                      <Link
                        href={`/admin/update-tools?id=${tool._id}`}
                        className="group relative p-3 bg-gradient-to-br from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 rounded-xl transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-green-500/50"
                        title="Edit"
                      >
                        <IconPencil className="w-5 h-5 text-white" />
                      </Link>
                      <button
                        onClick={() => deleteTool(tool._id)}
                        className="group relative p-3 bg-gradient-to-br from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700 rounded-xl transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-red-500/50"
                        title="Delete"
                      >
                        <IconTrashFilled className="w-5 h-5 text-white" />
                      </button>
                    </div>
                  </div>
                </div>
                
                {expandedTool === tool._id && <ExpandedToolView tool={tool} />}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ManageTools;