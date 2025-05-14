'use client';
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const CompareTools = () => {
    const [tools, setTools] = useState([]);
    const [selectedTools, setSelectedTools] = useState([]);
    const [category, setCategory] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchTools = async () => {
            try {
                const res = await axios.get('http://localhost:5000/tool/getall');
                setTools(res.data);
            } catch (err) {
                setError('Failed to fetch tools');
            }
        };
        fetchTools();
    }, []);

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

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 py-20 px-4 sm:px-6 lg:px-8">
            <div className="max-w-5xl mx-auto">
                <h1 className="text-3xl font-bold text-pink-300 mb-8">Compare AI Tools</h1>
                {error && <div className="mb-4 text-red-400">{error}</div>}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {tools.map(tool => (
                        <div
                            key={tool._id}
                            className={`cursor-pointer p-4 rounded-lg border transition-all duration-200 ${selectedTools.find(t => t._id === tool._id) ? 'border-pink-500 bg-gray-800' : 'border-gray-700 bg-gray-900'} ${category && tool.category !== category ? 'opacity-50 pointer-events-none' : ''}`}
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
                    ))}
                </div>
                {selectedTools.length > 0 && (
                    <div className="mt-6 flex flex-wrap gap-2">
                        {selectedTools.map(tool => (
                            <span key={tool._id} className="bg-pink-700 text-white px-3 py-1 rounded-full flex items-center gap-2">
                                {tool.name}
                                <button onClick={() => handleSelect(tool)} className="ml-2 text-xs text-gray-200 hover:text-red-400">&times;</button>
                            </span>
                        ))}
                    </div>
                )}
                {renderComparisonTable()}
            </div>
        </div>
    );
};

export default CompareTools;