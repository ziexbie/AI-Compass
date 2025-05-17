'use client';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSearchParams } from 'next/navigation';

const categories = [
    { id: 'all', name: 'All Tools' },
    { id: 'writing', name: 'Writing & Content' },
    { id: 'image', name: 'Image Generation' },
    { id: 'video', name: 'Video Creation' },
    { id: 'code', name: 'Code & Development' },
    { id: 'audio', name: 'Audio & Speech' },
    { id: 'research', name: 'Research & Analysis' }
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
            { label: 'Name', key: 'name' },
            { label: 'Description', key: 'description' },
            { label: 'Features', key: 'features', render: t => t.features?.join(', ') },
            { label: 'Pricing', key: 'pricing', render: t => t.pricing?.free ? 'Free' : `From $${t.pricing?.startingPrice || 'N/A'}` },
            { label: 'Platforms', key: 'platform', render: t => Object.entries(t.platform || {}).filter(([k, v]) => v).map(([k]) => k).join(', ') },
            { label: 'API', key: 'api', render: t => t.api?.available ? 'Available' : 'No' },
            { label: 'Performance', key: 'performance', render: t => `Speed: ${t.performance?.speed || '-'}, Accuracy: ${t.performance?.accuracy || '-'}` },
            { label: 'Website', key: 'website', render: t => t.website ? <a href={t.website} target="_blank" rel="noopener noreferrer" className="text-blue-400 underline">Visit</a> : '-' },
        ];

        return (
            <div className="overflow-x-auto mt-8">
                <table className="min-w-full bg-gray-900 text-white rounded-lg">
                    <thead>
                        <tr>
                            <th className="p-3 text-left bg-pink-700">Field</th>
                            {selectedTools.map(tool => (
                                <th key={tool._id} className="p-3 text-left bg-pink-700">{tool.name}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {fields.map(field => (
                            <tr key={field.label} className="border-b border-gray-700">
                                <td className="p-3 font-semibold">{field.label}</td>
                                {selectedTools.map(tool => (
                                    <td key={tool._id} className="p-3">
                                        {field.render ? field.render(tool) : tool[field.key] || '-'}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
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
        <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 py-20 px-4 sm:px-6 lg:px-8">
            <div className="max-w-5xl mx-auto">
                <h1 className="text-3xl font-bold text-pink-300 mb-8">Compare AI Tools</h1>
                
                {/* Search Input */}
                <div className="mb-6 flex gap-4">
                    <div className="flex-1">
                        <input
                            type="text"
                            placeholder="Search tools..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg 
                            text-white placeholder-gray-400 focus:border-pink-500 focus:ring-1 
                            focus:ring-pink-500 transition-colors"
                        />
                    </div>
                    <select
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className="px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg 
                            text-white focus:border-pink-500 focus:ring-1 focus:ring-pink-500 
                            transition-colors"
                    >
                        <option value="">All Categories</option>
                        {categories.map(cat => (
                            <option key={cat.id} value={cat.id}>
                                {cat.name}
                            </option>
                        ))}
                    </select>
                </div>

                {error && <div className="mb-4 text-red-400">{error}</div>}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {filteredTools.map(tool => {
                        const toolCardClasses = `cursor-pointer p-4 rounded-lg border transition-all duration-200 
                            ${selectedTools.find(t => t._id === tool._id) 
                                ? 'border-pink-500 bg-gray-800' 
                                : 'border-gray-700 bg-gray-900'} 
                            ${category && tool.category !== category ? 'opacity-50 pointer-events-none' : ''}`;
                        
                        return (
                            <div
                                key={tool._id}
                                className={toolCardClasses}
                                onClick={() => handleSelect(tool)}
                            >
                                <div className="flex items-center gap-4">
                                    {tool.logo ? (
                                        <img src={tool.logo} alt={tool.name} className="h-10 w-10 rounded" />
                                    ) : (
                                        <div className="h-10 w-10 rounded bg-gray-700 flex items-center justify-center">
                                            <span className="text-pink-300 text-lg">{tool.name[0]}</span>
                                        </div>
                                    )}
                                    <div>
                                        <h2 className="text-lg font-semibold text-white">{tool.name}</h2>
                                        <p className="text-gray-400 text-sm">{tool.category}</p>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
                {selectedTools.length > 0 && (
                    <div className="mt-6">
                        <div className="flex items-center justify-between mb-2">
                            <h2 className="text-lg font-semibold text-pink-300">Selected Tools</h2>
                            <button
                                onClick={handleClearAll}
                                className="px-3 py-1 bg-red-500/20 text-red-300 rounded-lg 
                                hover:bg-red-500/30 transition-colors text-sm"
                            >
                                Clear All
                            </button>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            {selectedTools.map(tool => (
                                <span key={tool._id} className="bg-pink-700 text-white px-3 py-1 rounded-full flex items-center gap-2">
                                    {tool.name}
                                    <button 
                                        onClick={() => handleSelect(tool)} 
                                        className="ml-2 text-xs text-gray-200 hover:text-red-400"
                                    >
                                        &times;
                                    </button>
                                </span>
                            ))}
                        </div>
                    </div>
                )}
                {renderComparisonTable()}
            </div>
        </div>
    );
};

export default CompareTools;