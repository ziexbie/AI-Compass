'use client';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { IconSearch, IconFilter, IconX, IconCheck, IconChartBar, IconSparkles, IconExternalLink, IconAlertCircle, IconTrash } from '@tabler/icons-react';

const categories = [
    { id: 'all', name: 'All Tools' },
    { id: 'Writing & Content', name: 'Writing & Content' },
    { id: 'Image Generation', name: 'Image Generation' },
    { id: 'Video Creation', name: 'Video Creation' },
    { id: 'Code & Development', name: 'Code & Development' },
    { id: 'Audio & Speech', name: 'Audio & Speech' },
    { id: 'Research & Analysis', name: 'Research & Analysis' }
];

const CompareTools = () => {
    const [tools, setTools] = useState([]);
    const [selectedTools, setSelectedTools] = useState([]);
    const [category, setCategory] = useState('');
    const [error, setError] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const searchParams = useSearchParams();

    useEffect(() => {
        const urlCategory = searchParams.get('category');
        if (urlCategory) {
            setCategory(urlCategory);
        }
        fetchTools();
    }, [searchParams]);

    const fetchTools = async () => {
        try {
            const res = await axios.get('http://localhost:5000/tool/getall');
            setTools(res.data);
        } catch (error) {
            setError('Failed to fetch tools');
        }
    };

    const handleSelect = (tool) => {
        setError('');
        if (selectedTools.find(t => t._id === tool._id)) {
            setSelectedTools(selectedTools.filter(t => t._id !== tool._id));
            if (selectedTools.length === 1) setCategory('');
            return;
        }
        if (selectedTools.length === 0) {
            setCategory(tool.category);
            setSelectedTools([tool]);
        } else if (tool.category === category) {
            setSelectedTools([...selectedTools, tool]);
        } else {
            setError('You can only compare tools from the same category.');
        }
    };

    const handleClearAll = () => {
        setSelectedTools([]);
        setCategory('');
        setError('');
    };

    const renderComparisonTable = () => {
        if (selectedTools.length < 2) return null;
        const fields = [
            { label: 'Name', key: 'name', icon: IconSparkles },
            { label: 'Description', key: 'description' },
            { label: 'Features', key: 'features', render: t => t.features?.join(', ') },
            { label: 'Pricing', key: 'pricing', render: t => t.pricing?.free ? 'Free' : `From $${t.pricing?.startingPrice || 'N/A'}` },
            { label: 'Platforms', key: 'platform', render: t => Object.entries(t.platform || {}).filter(([k, v]) => v).map(([k]) => k).join(', ') },
            { label: 'API', key: 'api', render: t => t.api?.available ? 'Available' : 'No' },
            { label: 'Performance', key: 'performance', render: t => `Speed: ${t.performance?.speed || '-'}, Accuracy: ${t.performance?.accuracy || '-'}` },
            { label: 'Website', key: 'website', render: t => t.website ? <a href={t.website} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 underline inline-flex items-center gap-1"><span>Visit</span><IconExternalLink className="w-4 h-4" /></a> : '-' },
        ];

        return (
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="overflow-x-auto mt-8 bg-gray-800/30 backdrop-blur-sm rounded-2xl border border-gray-700/50 shadow-xl"
            >
                <table className="min-w-full">
                    <thead>
                        <tr className="border-b border-gray-700/50">
                            <th className="p-4 text-left bg-gradient-to-r from-pink-500/20 to-purple-500/20 border-r border-gray-700/50">
                                <div className="flex items-center gap-2">
                                    <IconChartBar className="w-5 h-5 text-pink-400" />
                                    <span className="font-bold text-white">Field</span>
                                </div>
                            </th>
                            {selectedTools.map((tool, index) => (
                                <th key={tool._id} className="p-4 text-left bg-gradient-to-r from-pink-500/20 to-purple-500/20">
                                    <div className="flex items-center gap-3">
                                        {tool.logo ? (
                                            <img src={tool.logo} alt={tool.name} className="h-10 w-10 rounded-lg object-contain bg-gray-900 p-1" />
                                        ) : (
                                            <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-pink-500 to-purple-600 flex items-center justify-center">
                                                <span className="text-white font-bold">{tool.name[0]}</span>
                                            </div>
                                        )}
                                        <div>
                                            <div className="font-bold text-white">{tool.name}</div>
                                            <div className="text-xs text-gray-400">{tool.category}</div>
                                        </div>
                                    </div>
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {fields.map((field, index) => (
                            <motion.tr
                                key={field.label}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: index * 0.05 }}
                                className="border-b border-gray-700/30 hover:bg-gray-700/20 transition-colors"
                            >
                                <td className="p-4 font-semibold text-purple-300 border-r border-gray-700/30 bg-gray-900/30">
                                    {field.label}
                                </td>
                                {selectedTools.map(tool => (
                                    <td key={tool._id} className="p-4 text-gray-300">
                                        {field.render ? field.render(tool) : tool[field.key] || '-'}
                                    </td>
                                ))}
                            </motion.tr>
                        ))}
                    </tbody>
                </table>
            </motion.div>
        );
    };

    // Filter tools based on search and category
    const filteredTools = tools.filter(tool => {
        const matchesSearch = tool.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            tool.description.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = !category || category === '' || tool.category === category;
        return matchesSearch && matchesCategory;
    });

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-8"
                >
                    <div className="flex items-center gap-3 mb-4">
                        <div className="p-3 bg-gradient-to-br from-pink-500 to-purple-600 rounded-xl shadow-lg">
                            <IconChartBar className="w-8 h-8 text-white" />
                        </div>
                        <div>
                            <h1 className="text-4xl font-bold bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
                                Compare AI Tools
                            </h1>
                            <p className="text-gray-400 text-sm mt-1">
                                Select tools from the same category to compare their features
                            </p>
                        </div>
                    </div>
                </motion.div>

                {/* Search and Filter Bar */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="mb-6 flex flex-col md:flex-row gap-4"
                >
                    <div className="flex-1 relative">
                        <IconSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input
                            type="text"
                            placeholder="Search tools by name or description..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-12 pr-4 py-3 bg-gray-800/50 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-pink-500 focus:ring-2 focus:ring-pink-500/20 transition-all"
                        />
                        {searchTerm && (
                            <button
                                onClick={() => setSearchTerm('')}
                                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                            >
                                <IconX className="w-5 h-5" />
                            </button>
                        )}
                    </div>
                    <div className="relative">
                        <IconFilter className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <select
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            className="pl-12 pr-8 py-3 bg-gray-800/50 border border-gray-700 rounded-xl text-white focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all cursor-pointer min-w-[200px]"
                        >
                            <option value="">All Categories</option>
                            {categories.map(cat => (
                                <option key={cat.id} value={cat.id} className="bg-gray-800">
                                    {cat.name}
                                </option>
                            ))}
                        </select>
                    </div>
                </motion.div>

                {/* Error Message */}
                {error && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="mb-6 p-4 bg-red-500/10 border border-red-500/30 rounded-xl flex items-center gap-3"
                    >
                        <IconAlertCircle className="w-5 h-5 text-red-400" />
                        <span className="text-red-300">{error}</span>
                    </motion.div>
                )}

                {/* Selected Tools Bar */}
                {selectedTools.length > 0 && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mb-6 bg-gray-800/30 backdrop-blur-sm border border-gray-700/50 rounded-xl p-4"
                    >
                        <div className="flex items-center justify-between mb-3">
                            <h2 className="text-lg font-semibold text-white flex items-center gap-2">
                                <IconCheck className="w-5 h-5 text-green-400" />
                                Selected Tools ({selectedTools.length})
                            </h2>
                            <button
                                onClick={handleClearAll}
                                className="px-4 py-2 bg-red-500/20 text-red-300 border border-red-500/30 rounded-xl hover:bg-red-500/30 transition-all text-sm font-semibold flex items-center gap-2"
                            >
                                <IconTrash className="w-4 h-4" />
                                Clear All
                            </button>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            {selectedTools.map(tool => (
                                <motion.span
                                    key={tool._id}
                                    initial={{ scale: 0.8, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    className="bg-gradient-to-r from-pink-500 to-purple-600 text-white px-4 py-2 rounded-full flex items-center gap-2 font-medium shadow-lg"
                                >
                                    {tool.name}
                                    <button
                                        onClick={() => handleSelect(tool)}
                                        className="ml-1 hover:bg-white/20 rounded-full p-1 transition-colors"
                                    >
                                        <IconX className="w-4 h-4" />
                                    </button>
                                </motion.span>
                            ))}
                        </div>
                    </motion.div>
                )}

                {/* Tools Grid */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8"
                >
                    {filteredTools.map((tool, index) => {
                        const isSelected = selectedTools.find(t => t._id === tool._id);
                        const isDisabled = category && tool.category !== category && !isSelected;

                        return (
                            <motion.div
                                key={tool._id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.05 }}
                                onClick={() => !isDisabled && handleSelect(tool)}
                                className={`cursor-pointer p-4 rounded-xl border transition-all duration-200 
                                    ${isSelected
                                        ? 'border-pink-500 bg-gradient-to-br from-pink-500/20 to-purple-500/20 shadow-lg shadow-pink-500/20 scale-105'
                                        : 'border-gray-700/50 bg-gray-800/30 hover:border-purple-500/50 hover:scale-102'} 
                                    ${isDisabled ? 'opacity-30 pointer-events-none' : 'backdrop-blur-sm'}
                                `}
                            >
                                <div className="flex items-center gap-4">
                                    {tool.logo ? (
                                        <img src={tool.logo} alt={tool.name} className="h-12 w-12 rounded-lg object-contain bg-gray-900 p-1" />
                                    ) : (
                                        <div className="h-12 w-12 rounded-lg bg-gradient-to-br from-pink-500 to-purple-600 flex items-center justify-center shadow-lg">
                                            <span className="text-white text-xl font-bold">{tool.name[0]}</span>
                                        </div>
                                    )}
                                    <div className="flex-1">
                                        <h2 className="text-lg font-semibold text-white mb-1">{tool.name}</h2>
                                        <p className="text-gray-400 text-sm">{tool.category}</p>
                                    </div>
                                    {isSelected && (
                                        <div className="bg-green-500 rounded-full p-1">
                                            <IconCheck className="w-5 h-5 text-white" />
                                        </div>
                                    )}
                                </div>
                            </motion.div>
                        );
                    })}
                </motion.div>

                {/* Comparison Table */}
                {renderComparisonTable()}

                {/* Helper Text */}
                {selectedTools.length === 0 && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3 }}
                        className="text-center py-12 bg-gray-800/30 backdrop-blur-sm rounded-2xl border border-gray-700/50"
                    >
                        <IconChartBar className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                        <h3 className="text-xl font-semibold text-white mb-2">No Tools Selected</h3>
                        <p className="text-gray-400">Select at least 2 tools from the same category to start comparing</p>
                    </motion.div>
                )}

                {selectedTools.length === 1 && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-center py-12 bg-gray-800/30 backdrop-blur-sm rounded-2xl border border-gray-700/50"
                    >
                        <IconSparkles className="w-16 h-16 text-pink-400 mx-auto mb-4" />
                        <h3 className="text-xl font-semibold text-white mb-2">Select One More Tool</h3>
                        <p className="text-gray-400">Choose another tool from the <span className="text-pink-400 font-semibold">{category}</span> category to compare</p>
                    </motion.div>
                )}
            </div>
        </div>
    );
};

export default CompareTools;