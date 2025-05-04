'use client';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import Link from 'next/link';
import { IconTrashFilled, IconPencil, IconEye } from '@tabler/icons-react';
import StarRating from '@/components/StarRating';

const ManageTools = () => {
  const [tools, setTools] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedTool, setExpandedTool] = useState(null);

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

  const ExpandedToolView = ({ tool }) => (
    <div className="bg-gray-700 p-6 rounded-lg mt-4 space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Description */}
        <div>
          <h3 className="text-pink-300 font-semibold mb-2">Description</h3>
          <p className="text-gray-300">{tool.description}</p>
        </div>

        {/* Features */}
        <div>
          <h3 className="text-pink-300 font-semibold mb-2">Features</h3>
          <div className="flex flex-wrap gap-2">
            {tool.features.map((feature, index) => (
              <span key={index} className="px-3 py-1 bg-gray-600 rounded-full text-white text-sm">
                {feature}
              </span>
            ))}
          </div>
        </div>

        {/* Performance Metrics */}
        <div>
          <h3 className="text-pink-300 font-semibold mb-2">Performance</h3>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="text-gray-300">Speed:</span>
              <StarRating rating={tool.performance.speed} readonly={true} />
            </div>
            <div className="flex items-center gap-2">
              <span className="text-gray-300">Accuracy:</span>
              <StarRating rating={tool.performance.accuracy} readonly={true} />
            </div>
          </div>
        </div>

        {/* Pricing */}
        <div>
          <h3 className="text-pink-300 font-semibold mb-2">Pricing</h3>
          <div className="space-y-2 text-gray-300">
            {tool.pricing.free && <div>✓ Free Tier Available</div>}
            {tool.pricing.trial && <div>✓ Trial Available</div>}
            {tool.pricing.startingPrice > 0 && (
              <div>Starting from: ${tool.pricing.startingPrice}</div>
            )}
            {tool.pricing.subscription.monthly > 0 && (
              <div>Monthly: ${tool.pricing.subscription.monthly}</div>
            )}
            {tool.pricing.subscription.yearly > 0 && (
              <div>Yearly: ${tool.pricing.subscription.yearly}</div>
            )}
          </div>
        </div>

        {/* Platform Availability */}
        <div>
          <h3 className="text-pink-300 font-semibold mb-2">Platforms</h3>
          <div className="flex flex-wrap gap-2">
            {Object.entries(tool.platform)
              .filter(([_, value]) => value)
              .map(([key]) => (
                <span key={key} className="px-3 py-1 bg-gray-600 rounded-full text-white text-sm capitalize">
                  {key}
                </span>
              ))}
          </div>
        </div>

        {/* API Information */}
        <div>
          <h3 className="text-pink-300 font-semibold mb-2">API Details</h3>
          {tool.api.available ? (
            <div className="space-y-2">
              <div className="text-green-400">✓ API Available</div>
              {tool.api.documentation && (
                <a
                  href={tool.api.documentation}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400 hover:underline"
                >
                  View Documentation
                </a>
              )}
            </div>
          ) : (
            <div className="text-gray-400">No API Available</div>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-pink-300">Manage AI Tools</h1>
          <Link
            href="/admin/add-tools"
            className="px-6 py-3 bg-gradient-to-r from-pink-500 to-purple-600 text-white font-semibold rounded-lg hover:from-pink-600 hover:to-purple-700 transition-all"
          >
            Add New Tool
          </Link>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-pink-300"></div>
          </div>
        ) : tools.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-pink-300 text-xl">No tools found</p>
          </div>
        ) : (
          <div className="space-y-6">
            {tools.map((tool) => (
              <div key={tool._id} className="bg-gray-800 rounded-lg overflow-hidden">
                <div className="px-6 py-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      {/* Tool Logo and Name */}
                      <div className="flex items-center">
                        {tool.logo ? (
                          <img
                            src={tool.logo}
                            alt={tool.name}
                            className="h-12 w-12 rounded-full"
                            onError={(e) => {
                              e.target.style.display = 'none';
                            }}
                          />
                        ) : (
                          <div className="h-12 w-12 rounded-full bg-gray-700 flex items-center justify-center">
                            <span className="text-pink-300 text-lg">{tool.name[0]}</span>
                          </div>
                        )}
                        <div className="ml-4">
                          <h2 className="text-xl font-semibold text-white">{tool.name}</h2>
                          <p className="text-gray-400">{tool.category}</p>
                        </div>
                      </div>

                      {/* Status and Actions */}
                      <div className="flex items-center space-x-4">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium ${
                            tool.status
                              ? 'bg-green-100 text-green-800'
                              : 'bg-red-100 text-red-800'
                          }`}
                        >
                          {tool.status ? 'Active' : 'Inactive'}
                        </span>
                        <div className="flex space-x-2">
                          <button
                            onClick={() => setExpandedTool(expandedTool === tool._id ? null : tool._id)}
                            className="p-2 text-gray-400 hover:text-pink-500 transition-colors"
                            title="View Details"
                          >
                            <IconEye size={20} />
                          </button>
                          <Link
                            href={`/admin/update-tools?id=${tool._id}`}
                            className="p-2 text-gray-400 hover:text-blue-500 transition-colors"
                            title="Edit"
                          >
                            <IconPencil size={20} />
                          </Link>
                          <button
                            onClick={() => deleteTool(tool._id)}
                            className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                            title="Delete"
                          >
                            <IconTrashFilled size={20} />
                          </button>
                        </div>
                      </div>
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