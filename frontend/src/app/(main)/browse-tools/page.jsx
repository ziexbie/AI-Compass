'use client';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { motion } from 'framer-motion';
import { IconSearch, IconFilter, IconStar, IconCurrencyDollar, IconClock, IconSparkles, IconTrendingUp } from '@tabler/icons-react';
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
    { id: 'Writing & Content', name: 'Writing & Content' },
    { id: 'Image Generation', name: 'Image Generation' },
    { id: 'Video Creation', name: 'Video Creation' },
    { id: 'Code & Development', name: 'Code & Development' },
    { id: 'Audio & Speech', name: 'Audio & Speech' },
    { id: 'Research & Analysis', name: 'Research & Analysis' }
  ].map(category => ({
    ...category,
    id: category.id.toLowerCase()
  }));

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
    // Add logging to debug category matching
    console.log('Tool category:', tool.category);
    console.log('Selected category:', selectedCategory);
    const matchesCategory = selectedCategory === 'all' || 
        tool.category.toLowerCase() === selectedCategory.toLowerCase();
    const matchesPrice = (!filters.free && !filters.paid && !filters.trial) ||
      (filters.free && tool.pricing?.free) ||
      (filters.paid && tool.pricing?.paid) ||
      (filters.trial && tool.pricing?.trial);

    return matchesSearch && matchesCategory && matchesPrice;
  });

  // Add logging when category is selected
  const handleCategorySelect = (categoryId) => {
    console.log('Selecting category:', categoryId);
    setSelectedCategory(categoryId.toLowerCase());
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-pink-500/10 to-purple-500/10 border border-pink-500/20 rounded-full px-4 py-2 mb-6">
            <IconSparkles className="w-5 h-5 text-pink-400" />
            <span className="text-pink-300 text-sm font-semibold">Discover AI Tools</span>
          </div>
          <h1 className="text-5xl font-bold text-white sm:text-6xl mb-4">
            Browse <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-purple-400 to-blue-400">AI Tools</span>
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Explore our curated collection of cutting-edge AI tools to supercharge your productivity
          </p>
        </motion.div>

        {/* Stats Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-12 grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl mx-auto"
        >
          <div className="bg-gray-800/30 backdrop-blur-sm border border-gray-700/50 rounded-xl p-4 text-center">
            <div className="text-2xl font-bold text-white mb-1">{tools.length}</div>
            <div className="text-gray-400 text-sm">Total Tools</div>
          </div>
          <div className="bg-gray-800/30 backdrop-blur-sm border border-gray-700/50 rounded-xl p-4 text-center">
            <div className="text-2xl font-bold text-pink-400 mb-1">{filteredTools.length}</div>
            <div className="text-gray-400 text-sm">Matching Results</div>
          </div>
          <div className="bg-gray-800/30 backdrop-blur-sm border border-gray-700/50 rounded-xl p-4 text-center">
            <div className="text-2xl font-bold text-purple-400 mb-1">{categories.length - 1}</div>
            <div className="text-gray-400 text-sm">Categories</div>
          </div>
        </motion.div>

        {/* Search and Filter Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mb-12 space-y-6"
        >
          {/* Search Bar */}
          <div className="relative max-w-3xl mx-auto">
            <IconSearch className="absolute left-5 top-1/2 transform -translate-y-1/2 h-6 w-6 text-gray-400" />
            <input
              type="text"
              placeholder="Search for AI tools by name or description..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-14 pr-4 py-4 bg-gray-800/50 border-2 border-gray-700 rounded-2xl text-white placeholder-gray-500 focus:outline-none focus:border-pink-500 focus:ring-2 focus:ring-pink-500/20 transition-all text-lg"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
              >
                ✕
              </button>
            )}
          </div>

          {/* Categories */}
          <div>
            <div className="flex items-center gap-2 mb-4 justify-center">
              <IconFilter className="w-5 h-5 text-gray-400" />
              <span className="text-gray-400 text-sm font-medium">Filter by Category</span>
            </div>
            <div className="flex flex-wrap justify-center gap-3">
              {categories.map((category) => (
                <motion.button
                  key={category.id}
                  onClick={() => handleCategorySelect(category.id)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all shadow-lg
                    ${selectedCategory === category.id
                      ? 'bg-gradient-to-r from-pink-500 to-purple-600 text-white shadow-pink-500/50'
                      : 'bg-gray-800/50 text-gray-300 hover:bg-gray-700/50 border border-gray-700'
                    }`}
                >
                  {category.name}
                </motion.button>
              ))}
            </div>
          </div>

          {/* Price Filters */}
          <div className="bg-gray-800/30 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6 max-w-2xl mx-auto">
            <div className="flex items-center gap-2 mb-4">
              <IconCurrencyDollar className="w-5 h-5 text-green-400" />
              <span className="text-white font-semibold">Pricing Options</span>
            </div>
            <div className="flex flex-wrap justify-center gap-6">
              {[
                { key: 'free', label: 'Free', color: 'green' },
                { key: 'paid', label: 'Paid', color: 'blue' },
                { key: 'trial', label: 'Free Trial', color: 'purple' }
              ].map((type) => (
                <label key={type.key} className="flex items-center space-x-3 cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={filters[type.key]}
                    onChange={() => setFilters(prev => ({ ...prev, [type.key]: !prev[type.key] }))}
                    className="w-5 h-5 rounded border-gray-600 text-pink-500 focus:ring-pink-500 focus:ring-offset-gray-800 bg-gray-700"
                  />
                  <span className={`text-gray-300 font-medium group-hover:text-${type.color}-400 transition-colors`}>
                    {type.label}
                  </span>
                </label>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Tools Grid */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-pink-500 mb-4"></div>
            <p className="text-xl text-gray-400">Loading amazing AI tools...</p>
          </div>
        ) : filteredTools.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <div className="bg-gray-800/30 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-12 max-w-md mx-auto">
              <IconSearch className="w-20 h-20 text-gray-600 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-white mb-2">No Tools Found</h3>
              <p className="text-gray-400 mb-6">
                We couldn't find any tools matching your criteria
              </p>
              <button
                onClick={() => {
                  setSearchTerm('');
                  setSelectedCategory('all');
                  setFilters({ free: false, paid: false, trial: false });
                }}
                className="px-6 py-3 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-xl hover:from-pink-600 hover:to-purple-700 transition-all font-semibold"
              >
                Clear All Filters
              </button>
            </div>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filteredTools.map((tool, index) => (
              <motion.div
                key={tool._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ y: -8, scale: 1.02 }}
                className="group bg-gray-800/30 backdrop-blur-sm rounded-2xl overflow-hidden border border-gray-700/50 hover:border-pink-500/50 transition-all duration-300 hover:shadow-2xl hover:shadow-pink-500/20"
              >
                {/* Tool Image */}
                <div className="relative w-full h-56 bg-gradient-to-br from-gray-800 to-gray-900 overflow-hidden">
                  {tool.logo ? (
                    <img
                      src={tool.logo}
                      alt={tool.name}
                      className="w-full h-full object-contain p-6 group-hover:scale-110 transition-transform duration-300"
                      onError={(e) => {
                        e.target.onError = null;
                        const parent = e.target.parentElement;
                        const fallback = document.createElement('div');
                        fallback.className = 'w-full h-full bg-gradient-to-br from-pink-500 to-purple-600 flex items-center justify-center';
                        fallback.innerHTML = `<span class="text-6xl font-bold text-white">${tool.name.charAt(0)}</span>`;
                        parent.replaceChild(fallback, e.target);
                      }}
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-pink-500 to-purple-600 flex items-center justify-center">
                      <span className="text-6xl font-bold text-white">{tool.name.charAt(0)}</span>
                    </div>
                  )}
                  
                  {/* Badge Overlay */}
                  <div className="absolute top-4 right-4 flex flex-col gap-2">
                    {tool.pricing?.free && (
                      <span className="px-3 py-1 bg-green-500/90 backdrop-blur-sm text-white rounded-full text-xs font-bold shadow-lg">
                        FREE
                      </span>
                    )}
                    {tool.pricing?.trial && (
                      <span className="px-3 py-1 bg-blue-500/90 backdrop-blur-sm text-white rounded-full text-xs font-bold shadow-lg">
                        TRIAL
                      </span>
                    )}
                  </div>
                </div>

                {/* Tool Content */}
                <div className="p-6">
                  <div className="mb-3">
                    <h3 className="text-xl font-bold text-white mb-2 group-hover:text-pink-400 transition-colors">
                      {tool.name}
                    </h3>
                    <span className="inline-block px-3 py-1 bg-purple-500/20 text-purple-300 border border-purple-500/30 rounded-full text-xs font-semibold">
                      {tool.category}
                    </span>
                  </div>
                  
                  <p className="text-gray-400 mb-6 line-clamp-3 text-sm leading-relaxed">
                    {tool.description}
                  </p>

                  {/* Features Preview */}
                  {tool.features && tool.features.length > 0 && (
                    <div className="mb-4 flex flex-wrap gap-2">
                      {tool.features.slice(0, 3).map((feature, idx) => (
                        <span key={idx} className="px-2 py-1 bg-gray-700/50 text-gray-300 rounded text-xs">
                          {feature}
                        </span>
                      ))}
                      {tool.features.length > 3 && (
                        <span className="px-2 py-1 bg-gray-700/50 text-gray-300 rounded text-xs">
                          +{tool.features.length - 3} more
                        </span>
                      )}
                    </div>
                  )}

                  {/* CTA Button */}
                  <Link
                    href={`/tool-detail/${tool._id}`}
                    className="block w-full text-center px-4 py-3 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-xl hover:from-pink-600 hover:to-purple-700 transition-all font-semibold shadow-lg hover:shadow-pink-500/50 transform group-hover:scale-105"
                  >
                    View Details →
                  </Link>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* Results Summary */}
        {!loading && filteredTools.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-12 text-center"
          >
            <div className="inline-flex items-center gap-2 bg-gray-800/30 backdrop-blur-sm border border-gray-700/50 rounded-full px-6 py-3">
              <IconTrendingUp className="w-5 h-5 text-pink-400" />
              <span className="text-gray-300">
                Showing <span className="text-white font-semibold">{filteredTools.length}</span> of{' '}
                <span className="text-white font-semibold">{tools.length}</span> tools
              </span>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default BrowseTools;