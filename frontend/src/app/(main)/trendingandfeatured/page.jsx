'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';

const TrendingAndFeatured = () => {
    const [trendingTools, setTrendingTools] = useState([]);
    const [featuredTools, setFeaturedTools] = useState([]);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        fetchTools();
    }, []);

    const fetchTools = async () => {
        try {
            const [trendingRes, featuredRes] = await Promise.all([
                axios.get('http://localhost:5000/tool/trending'),
                axios.get('http://localhost:5000/tool/featured')
            ]);
            
            console.log('Featured tools response:', featuredRes.data);
            
            setTrendingTools(trendingRes.data);
            setFeaturedTools(featuredRes.data);

            // Add validation check
            if (featuredRes.data.length === 0) {
                console.log('No featured tools found');
            }
        } catch (error) {
            console.error('Error fetching tools:', error);
            toast.error('Failed to fetch tools');
        } finally {
            setLoading(false);
        }
    };

    const handleToolClick = (toolId) => {
        router.push(`/tool-detail/${toolId}`);
    };

    const ToolCard = ({ tool }) => (
        <div 
            onClick={() => handleToolClick(tool._id)}
            className="bg-[#1A1625] rounded-xl p-6 border border-[#2A2438] hover:border-pink-500/20 
                      transition-all duration-300 cursor-pointer"
        >
            <div className="flex items-center gap-4 mb-4">
                {tool.logo ? (
                    <img 
                        src={tool.logo} 
                        alt={tool.name} 
                        className="w-12 h-12 rounded-lg object-contain bg-[#2A2438] p-2"
                    />
                ) : (
                    <div className="w-12 h-12 rounded-lg bg-[#2A2438] flex items-center justify-center">
                        <span className="text-2xl font-bold text-pink-500">{tool.name[0]}</span>
                    </div>
                )}
                <div>
                    <h3 className="text-xl font-semibold text-white">{tool.name}</h3>
                    <span className="text-sm text-pink-400">{tool.category}</span>
                </div>
            </div>
            <p className="text-gray-300 text-sm mb-4 line-clamp-2">{tool.description}</p>
            <div className="flex items-center justify-between">
                <span className="text-yellow-400 flex items-center gap-1">
                    ★ {tool.avgRating?.toFixed(1) || 'N/A'}
                </span>
                <span className="text-gray-400 text-sm">
                    {tool.totalRatings || 0} ratings
                </span>
            </div>
        </div>
    );

    if (loading) {
        return (
            <div className="min-h-screen bg-[#0A0118] flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-pink-500"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#0A0118] py-20 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                {/* Trending Tools Section */}
                <section className="mb-16">
                    <h2 className="text-3xl font-bold text-white mb-8 flex items-center gap-2">
                        <span className="text-pink-500">🔥</span> Trending Tools
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {trendingTools.map(tool => (
                            <ToolCard key={tool._id} tool={tool} />
                        ))}
                    </div>
                </section>

                {/* Featured Tools Section */}
                <section>
                    <h2 className="text-3xl font-bold text-white mb-8 flex items-center gap-2">
                        <span className="text-pink-500">⭐</span> Featured Tools
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {featuredTools.map(tool => (
                            <ToolCard key={tool._id} tool={tool} />
                        ))}
                    </div>
                </section>
            </div>
        </div>
    );
};

export default TrendingAndFeatured;