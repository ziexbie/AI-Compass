'use client';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { motion } from 'framer-motion';
import { IconSearch, IconFilter } from '@tabler/icons-react';
import Link from 'next/link';

const BrowseTools = () => {
  const [tools, setTools] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [filters, setFilters] = useState({
    free: false,
    paid: false,
    trial: false
  });

  const categories = [
    { id: 'all', name: 'All Tools' },
    { id: 'writing', name: 'Writing & Content' },
    { id: 'image', name: 'Image Generation' },
    { id: 'video', name: 'Video Creation' },
    { id: 'code', name: 'Code & Development' },
    { id: 'audio', name: 'Audio & Speech' },
    { id: 'research', name: 'Research & Analysis' }
  ];

  useEffect(() => {
    fetchTools();
  }, []);

  const fetchTools = async () => {
    try {
      const response = await axios.get('http://localhost:5000/tool/getall');
      setTools(response.data);
    } catch (error) {
      toast.error('Failed to fetch tools');
    } finally {
      setLoading(false);
    }
  };

  const filteredTools = tools.filter(tool => {
    const matchesSearch = tool.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         tool.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || tool.category === selectedCategory;
    const matchesPrice = (!filters.free && !filters.paid && !filters.trial) ||
                        (filters.free && tool.pricing?.free) ||
                        (filters.paid && tool.pricing?.paid) ||
                        (filters.trial && tool.pricing?.trial);
    
    return matchesSearch && matchesCategory && matchesPrice;
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-white sm:text-5xl mb-4">
            Browse <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-600">AI Tools</span>
          </h1>
          <p className="text-gray-300 text-lg">
            Find the perfect AI tool for your specific needs
          </p>
        </motion.div>

        {/* Search and Filter Section */}
        <div className="mb-12 space-y-6">
          {/* Search Bar */}
          <div className="relative max-w-2xl mx-auto">
            <IconSearch className="absolute left-4 top-3.5 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search AI tools..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-gray-800 border-none rounded-xl text-white placeholder-gray-400 "
            />
          </div>

          {/* Categories */}
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all
                  ${selectedCategory === category.id
                    ? 'bg-gradient-to-r from-pink-500 to-purple-600 text-white'
                    : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                  }`}
              >
                {category.name}
              </button>
            ))}
          </div>

          {/* Price Filters */}
          <div className="flex justify-center gap-4">
            {['free', 'paid', 'trial'].map((type) => (
              <label key={type} className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={filters[type]}
                  onChange={() => setFilters(prev => ({ ...prev, [type]: !prev[type] }))}
                  className="rounded border-gray-600 text-pink-500 focus:ring-pink-500 bg-gray-700"
                />
                <span className="text-gray-300 capitalize">{type}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Tools Grid */}
        {loading ? (
          <div className="flex justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-pink-500"></div>
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filteredTools.map((tool) => (
              <motion.div
                key={tool._id}
                whileHover={{ y: -5 }}
                className="bg-gray-800 rounded-xl overflow-hidden border border-gray-700 hover:border-pink-500/50 transition-all"
              >
                <div className="relative w-full h-48">
                  {tool.logo ? (
                    <img
                      src={tool.logo}
                      alt={tool.name}
                      className="w-full h-full object-contain bg-gray-900 p-4"
                      onError={(e) => {
                        e.target.onError = null;
                        // Create a fallback div with the first letter of the tool name
                        const parent = e.target.parentElement;
                        const fallback = document.createElement('div');
                        fallback.className = 'w-full h-full bg-gray-900 flex items-center justify-center';
                        fallback.innerHTML = `<span class="text-4xl font-bold text-pink-300">${tool.name.charAt(0)}</span>`;
                        parent.replaceChild(fallback, e.target);
                      }}
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-900 flex items-center justify-center">
                      <span className="text-4xl font-bold text-pink-300">{tool.name.charAt(0)}</span>
                    </div>
                  )}
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-bold text-white">{tool.name}</h3>
                  </div>
                  <p className="text-gray-400 mb-4 line-clamp-2">{tool.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="px-3 py-1 bg-gray-700 rounded-full text-sm text-gray-300">
                      {tool.category}
                    </span>
                    <Link 
                      href={`/tool-detail/${tool._id}`} 
                      className="px-4 py-2 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-lg hover:from-pink-600 hover:to-purple-700 transition-all"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default BrowseTools;