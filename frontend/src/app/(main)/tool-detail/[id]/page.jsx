'use client'
import axios from 'axios';
import { useParams, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { IconBrandGithub, IconGlobe, IconShare, IconChartBar, IconApi, IconDeviceLaptop } from '@tabler/icons-react';
import StarRating from '@/components/StarRating';

const ViewTool = () => {
    const [tool, setTool] = useState(null);
    const [loading, setLoading] = useState(true);
    const { id } = useParams();
    const router = useRouter();

    const fetchToolDetails = async () => {
        try {
            const res = await axios.get(`http://localhost:5000/tool/getbyid/${id}`);
            setTool(res.data);
        } catch (error) {
            toast.error('Failed to fetch tool details');
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchToolDetails();
    }, [id]);

    const handleCompare = () => {
        router.push(`/compare-tools?tool1=${id}`);
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-[#0A0118] flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-pink-500"></div>
            </div>
        );
    }

    if (!tool) {
        return (
            <div className="min-h-screen bg-[#0A0118] flex items-center justify-center">
                <div className="text-pink-500 text-xl">Tool not found</div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#0A0118]">
            {/* Hero Section */}
            <div className="relative py-20 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    <div className="relative bg-[#1A1625] rounded-2xl p-8 border border-[#2A2438] shadow-lg hover:border-pink-500/20 transition-all duration-300">
                        {/* Tool Header */}
                        <div className="flex flex-col md:flex-row gap-8 items-center md:items-start">
                            {/* Logo */}
                            <div className="w-32 h-32 flex-shrink-0">
                                {tool.logo ? (
                                    <img
                                        src={tool.logo}
                                        alt={tool.name}
                                        className="w-full h-full object-cover rounded-xl bg-[#2A2438] p-2"
                                    />
                                ) : (
                                    <div className="w-full h-full rounded-xl bg-[#2A2438] flex items-center justify-center">
                                        <span className="text-4xl font-bold text-pink-500">
                                            {tool.name[0]}
                                        </span>
                                    </div>
                                )}
                            </div>

                            {/* Tool Info */}
                            <div className="flex-1 text-center md:text-left">
                                <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">{tool.name}</h1>
                                <div className="flex flex-wrap gap-3 justify-center md:justify-start mb-6">
                                    <span className="px-3 py-1 bg-pink-500/20 text-pink-300 rounded-full text-sm">
                                        {tool.category}
                                    </span>
                                    {tool.version && (
                                        <span className="px-3 py-1 bg-purple-500/20 text-purple-300 rounded-full text-sm">
                                            v{tool.version}
                                        </span>
                                    )}
                                    <span className={`px-3 py-1 rounded-full text-sm
                                        ${tool.status 
                                            ? 'bg-green-500/20 text-green-300' 
                                            : 'bg-red-500/20 text-red-300'
                                        }`}>
                                        {tool.status ? 'Active' : 'Inactive'}
                                    </span>
                                </div>
                                <p className="text-gray-300 max-w-2xl">{tool.description}</p>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex flex-col gap-3">
                                <button
                                    onClick={handleCompare}
                                    className="px-4 py-2 bg-gradient-to-r from-pink-500 to-purple-600 
                                    rounded-lg text-white font-medium hover:from-pink-600 hover:to-purple-700 
                                    transition-all flex items-center justify-center gap-2"
                                >
                                    <IconChartBar size={20} />
                                    Compare
                                </button>
                                {tool.website && (
                                    <a
                                        href={tool.website}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="px-4 py-2 border border-pink-300/20 rounded-lg text-pink-300 
                                        hover:bg-pink-500/10 transition-all flex items-center justify-center gap-2"
                                    >
                                        <IconGlobe size={20} />
                                        Visit Site
                                    </a>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Details Grid */}
            <div className="px-4 sm:px-6 lg:px-8 pb-20">
                <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Features Card */}
                    <div className="bg-[#1A1625] rounded-xl p-6 border border-[#2A2438] shadow-lg hover:border-pink-500/20 transition-all duration-300">
                        <h2 className="text-xl font-semibold text-pink-500 mb-4">Features</h2>
                        <div className="flex flex-wrap gap-2">
                            {tool.features?.map((feature, index) => (
                                <span key={index} className="px-3 py-1 bg-[#2A2438] rounded-full text-gray-300 text-sm">
                                    {feature}
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* Performance Card */}
                    <div className="bg-[#1A1625] rounded-xl p-6 border border-[#2A2438] shadow-lg hover:border-pink-500/20 transition-all duration-300">
                        <h2 className="text-xl font-semibold text-pink-500 mb-4">Performance</h2>
                        <div className="space-y-4">
                            <div className="flex items-center gap-2">
                                <span className="text-gray-300 w-24">Speed:</span>
                                <StarRating rating={tool.performance?.speed || 0} readonly={true} />
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="text-gray-300 w-24">Accuracy:</span>
                                <StarRating rating={tool.performance?.accuracy || 0} readonly={true} />
                            </div>
                        </div>
                    </div>

                    {/* Pricing Card */}
                    <div className="bg-[#1A1625] rounded-xl p-6 border border-[#2A2438] shadow-lg hover:border-pink-500/20 transition-all duration-300">
                        <h2 className="text-xl font-semibold text-pink-500 mb-4">Pricing</h2>
                        <div className="space-y-2">
                            {tool.pricing?.free && (
                                <div className="flex items-center gap-2 text-green-300">
                                    <span>✓</span>
                                    <span>Free Tier Available</span>
                                </div>
                            )}
                            {tool.pricing?.trial && (
                                <div className="flex items-center gap-2 text-green-300">
                                    <span>✓</span>
                                    <span>Trial Available</span>
                                </div>
                            )}
                            {tool.pricing?.startingPrice > 0 && (
                                <div className="text-gray-300">
                                    Starting from: <span className="text-pink-300">${tool.pricing.startingPrice}</span>
                                </div>
                            )}
                            {tool.pricing?.subscription?.monthly > 0 && (
                                <div className="text-gray-300">
                                    Monthly: <span className="text-pink-300">${tool.pricing.subscription.monthly}</span>
                                </div>
                            )}
                            {tool.pricing?.subscription?.yearly > 0 && (
                                <div className="text-gray-300">
                                    Yearly: <span className="text-pink-300">${tool.pricing.subscription.yearly}</span>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Platform Card */}
                    <div className="bg-[#1A1625] rounded-xl p-6 border border-[#2A2438] shadow-lg hover:border-pink-500/20 transition-all duration-300">
                        <h2 className="text-xl font-semibold text-pink-500 mb-4">Platforms</h2>
                        <div className="grid grid-cols-2 gap-3">
                            {Object.entries(tool.platform || {}).map(([key, value]) => 
                                value && (
                                    <div key={key} className="flex items-center gap-2 text-gray-300">
                                        <IconDeviceLaptop className="text-pink-300" size={18} />
                                        <span className="capitalize">{key}</span>
                                    </div>
                                )
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ViewTool;