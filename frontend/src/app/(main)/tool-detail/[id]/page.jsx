'use client'
import axios from 'axios';
import { useParams, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { IconBrandGithub, IconGlobe, IconShare, IconChartBar, IconApi, IconDeviceLaptop, IconBookmark, IconBookmarkFilled } from '@tabler/icons-react';
import StarRating from '@/components/StarRating';

const ViewTool = () => {
    const [tool, setTool] = useState(null);
    const [loading, setLoading] = useState(true);
    const { id } = useParams();
    const router = useRouter();
    const [userRating, setUserRating] = useState(0);
    const [feedback, setFeedback] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [ratings, setRatings] = useState([]);
    const [isBookmarked, setIsBookmarked] = useState(false);

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

    const fetchToolRatings = async () => {
        try {
            const res = await axios.get(`http://localhost:5000/rating/bytool/${id}`);
            setRatings(res.data);
        } catch (error) {
            console.error('Error fetching ratings:', error);
            toast.error('Failed to fetch ratings');
        }
    };

    const checkBookmarkStatus = async () => {
        try {
            const userId = '12345'; // Replace with actual user ID from auth
            const response = await axios.get(`http://localhost:5000/bookmark/check/${userId}/${id}`);
            setIsBookmarked(response.data.isBookmarked);
        } catch (error) {
            console.error('Error checking bookmark status:', error);
            toast.error('Failed to check bookmark status');
        }
    };

    const handleBookmarkToggle = async () => {
        try {
            const userId = '12345'; // Replace with actual user ID from auth

            if (isBookmarked) {
                // Remove bookmark
                await axios.delete(`http://localhost:5000/bookmark/remove/${userId}/${id}`);
                setIsBookmarked(false);
                toast.success('Removed from bookmarks');
            } else {
                // Add bookmark
                const response = await axios.post('http://localhost:5000/bookmark/add', {
                    userId,
                    toolId: id
                });
                
                setIsBookmarked(true);
                toast.success(response.data.message || 'Added to bookmarks');
            }
        } catch (error) {
            console.error('Bookmark error:', error);
            toast.error(error.response?.data?.error || 'Failed to update bookmark');
        }
    };

    const handleRatingSubmit = async (e) => {
        e.preventDefault();
        if (!userRating) {
            toast.error('Please select a rating');
            return;
        }

        setIsSubmitting(true);
        try {
            const response = await axios.post('http://localhost:5000/rating/add', {
                toolId: id,
                rating: userRating,
                comment: feedback.trim() || undefined, // Only send if there's content
                userId: '12345' // Will need to be replaced with actual user ID
            });

            if (response.data) {
                toast.success('Thank you for your feedback!');
                setFeedback('');
                setUserRating(0);
                await fetchToolRatings(); // Refresh ratings
                await fetchToolDetails(); // Refresh tool details to get updated average rating
            }
        } catch (error) {
            console.error('Error submitting rating:', error);
            toast.error(error.response?.data?.error || 'Failed to submit rating');
        } finally {
            setIsSubmitting(false);
        }
    };

    useEffect(() => {
        fetchToolDetails();
        fetchToolRatings();
        checkBookmarkStatus();
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
                                    onClick={handleBookmarkToggle}
                                    className="px-4 py-2 border border-pink-300/20 rounded-lg text-pink-300 
                                    hover:bg-pink-500/10 transition-all flex items-center justify-center gap-2"
                                >
                                    {isBookmarked ? (
                                        <>
                                            <IconBookmarkFilled size={20} />
                                            Bookmarked
                                        </>
                                    ) : (
                                        <>
                                            <IconBookmark size={20} />
                                            Bookmark
                                        </>
                                    )}
                                </button>
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

            {/* Rating and Reviews Section */}
            <div className="px-4 sm:px-6 lg:px-8 pb-20">
                <div className="max-w-7xl mx-auto">
                    <div className="bg-[#1A1625] rounded-xl p-6 border border-[#2A2438] shadow-lg hover:border-pink-500/20 transition-all duration-300">
                        <h2 className="text-xl font-semibold text-pink-500 mb-6">Rate & Review</h2>
                        
                        {/* Rating Form */}
                        <form onSubmit={handleRatingSubmit} className="space-y-6">
                            <div>
                                <label className="block text-gray-300 mb-2">Your Rating</label>
                                <div className="flex items-center gap-2">
                                    <StarRating
                                        rating={userRating}
                                        onRatingChange={setUserRating}
                                        readonly={false}
                                    />
                                    <span className="text-gray-400 ml-2">
                                        {userRating > 0 ? `${userRating} stars` : 'Select rating'}
                                    </span>
                                </div>
                            </div>

                            <div>
                                <label className="block text-gray-300 mb-2">Your Feedback</label>
                                <textarea
                                    value={feedback}
                                    onChange={(e) => setFeedback(e.target.value)}
                                    placeholder="Share your experience with this tool..."
                                    className="w-full px-4 py-3 bg-[#2A2438] border border-gray-600 rounded-xl 
                                    text-white placeholder-gray-400 focus:border-pink-500 focus:ring-1 
                                    focus:ring-pink-500 transition-colors resize-none"
                                    rows={4}
                                />
                            </div>

                            <div className="flex justify-end">
                                <button
                                    type="submit"
                                    disabled={isSubmitting || userRating === 0}
                                    className={`px-6 py-3 bg-gradient-to-r from-pink-500 to-purple-600 
                                    text-white font-semibold rounded-xl transition-all flex items-center gap-2
                                    ${isSubmitting || userRating === 0 
                                        ? 'opacity-50 cursor-not-allowed' 
                                        : 'hover:from-pink-600 hover:to-purple-700'}`}
                                >
                                    {isSubmitting ? (
                                        <>
                                            <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white"></div>
                                            <span>Submitting...</span>
                                        </>
                                    ) : (
                                        'Submit Review'
                                    )}
                                </button>
                            </div>
                        </form>

                        {/* Existing Reviews */}
                        {ratings.length > 0 && (
                            <div className="mt-8 pt-8 border-t border-[#2A2438]">
                                <h3 className="text-lg font-semibold text-pink-500 mb-4">User Reviews</h3>
                                <div className="space-y-4">
                                    {ratings.map((rating, index) => (
                                        <div 
                                            key={index}
                                            className="bg-[#2A2438] rounded-xl p-4 space-y-2"
                                        >
                                            <div className="flex items-center justify-between">
                                                <StarRating rating={rating.rating} readonly={true} />
                                                <span className="text-gray-400 text-sm">
                                                    {new Date(rating.createdAt).toLocaleDateString()}
                                                </span>
                                            </div>
                                            {rating.comment && (
                                                <p className="text-gray-300">{rating.comment}</p>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ViewTool;