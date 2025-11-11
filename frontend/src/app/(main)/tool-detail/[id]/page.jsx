'use client'
import axios from 'axios';
import { useParams, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { motion } from 'framer-motion';
import { IconBrandGithub, IconGlobe, IconShare, IconChartBar, IconApi, IconDeviceLaptop, IconBookmark, IconBookmarkFilled, IconStar, IconSparkles, IconClock, IconUser, IconCurrency, IconDevices, IconMessage } from '@tabler/icons-react';
import StarRating from '@/components/StarRating';
import { jwtDecode } from 'jwt-decode';

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
    const [userId, setUserId] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    // Safe token handling
    useEffect(() => {
        try {
            // Check for token in localStorage with consistent key name ('token')
            const token = localStorage.getItem('token');
            if (token && typeof token === 'string') {
                try {
                    const decodedToken = jwtDecode(token);
                    setUserId(decodedToken._id);
                    setIsLoggedIn(true);
                } catch (error) {
                    console.error('Token decode error:', error);
                    localStorage.removeItem('token'); // Clear invalid token
                }
            }
        } catch (error) {
            console.error('Error accessing localStorage:', error);
        }
    }, []);

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
        if (!userId) return;
        
        try {
            const response = await axios.get(`http://localhost:5000/bookmark/check/${userId}/${id}`);
            setIsBookmarked(response.data.isBookmarked);
        } catch (error) {
            console.error('Error checking bookmark status:', error);
            // Silently fail bookmark check to not disrupt the user experience
        }
    };

    const handleBookmarkToggle = async () => {
        if (!isLoggedIn) {
            toast.error('Please login first to bookmark tools');
            router.push('/login');
            return;
        }
        
        try {
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
        
        if (!isLoggedIn) {
            toast.error('Please login first to submit a rating');
            router.push('/login');
            return;
        }
        
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
                userId: userId
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
        
        // Only check bookmark status if we have a userId
        if (userId) {
            checkBookmarkStatus();
        }
    }, [id, userId]);

    const handleCompare = () => {
        if (!tool) {
            toast.error('Tool information not available');
            return;
        }
        router.push(`/user/compare-tools`);
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-pink-500 mx-auto mb-4"></div>
                    <p className="text-gray-400 text-lg">Loading tool details...</p>
                </div>
            </div>
        );
    }

    if (!tool) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 flex items-center justify-center">
                <div className="text-center">
                    <div className="text-pink-500 text-6xl mb-4">404</div>
                    <div className="text-white text-2xl mb-2">Tool not found</div>
                    <p className="text-gray-400 mb-6">The tool you're looking for doesn't exist</p>
                    <button
                        onClick={() => router.push('/browse-tools')}
                        className="px-6 py-3 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-xl hover:from-pink-600 hover:to-purple-700 transition-all"
                    >
                        Browse All Tools
                    </button>
                </div>
            </div>
        );
    }

    const averageRating = ratings.length > 0 
        ? (ratings.reduce((sum, r) => sum + r.rating, 0) / ratings.length).toFixed(1)
        : 0;

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900">
            {/* Hero Section */}
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="relative py-12 px-4 sm:px-6 lg:px-8"
            >
                <div className="max-w-7xl mx-auto">
                    <div className="relative bg-gray-800/30 backdrop-blur-sm rounded-3xl p-8 border border-gray-700/50 shadow-2xl hover:border-pink-500/30 transition-all duration-300">
                        {/* Tool Header */}
                        <div className="flex flex-col lg:flex-row gap-8 items-center lg:items-start">
                            {/* Logo */}
                            <motion.div 
                                initial={{ scale: 0.8, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                transition={{ delay: 0.2 }}
                                className="w-40 h-40 flex-shrink-0"
                            >
                                {tool.logo ? (
                                    <img
                                        src={tool.logo}
                                        alt={tool.name}
                                        className="w-full h-full object-contain rounded-2xl bg-gradient-to-br from-gray-800 to-gray-900 p-4 shadow-xl border border-gray-700/50"
                                    />
                                ) : (
                                    <div className="w-full h-full rounded-2xl bg-gradient-to-br from-pink-500 to-purple-600 flex items-center justify-center shadow-xl">
                                        <span className="text-6xl font-bold text-white">
                                            {tool.name[0]}
                                        </span>
                                    </div>
                                )}
                            </motion.div>

                            {/* Tool Info */}
                            <motion.div 
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.3 }}
                                className="flex-1 text-center lg:text-left"
                            >
                                <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                                    {tool.name}
                                </h1>
                                
                                {/* Badges */}
                                <div className="flex flex-wrap gap-3 justify-center lg:justify-start mb-6">
                                    <span className="px-4 py-2 bg-gradient-to-r from-pink-500/20 to-purple-500/20 text-pink-300 border border-pink-500/30 rounded-full text-sm font-semibold flex items-center gap-2">
                                        <IconSparkles className="w-4 h-4" />
                                        {tool.category}
                                    </span>
                                    {tool.version && (
                                        <span className="px-4 py-2 bg-purple-500/20 text-purple-300 border border-purple-500/30 rounded-full text-sm font-semibold">
                                            v{tool.version}
                                        </span>
                                    )}
                                    <span className={`px-4 py-2 rounded-full text-sm font-semibold flex items-center gap-2
                                        ${tool.status 
                                            ? 'bg-green-500/20 text-green-300 border border-green-500/30' 
                                            : 'bg-red-500/20 text-red-300 border border-red-500/30'
                                        }`}>
                                        <div className={`w-2 h-2 rounded-full ${tool.status ? 'bg-green-400' : 'bg-red-400'} animate-pulse`}></div>
                                        {tool.status ? 'Active' : 'Inactive'}
                                    </span>
                                    {tool.pricing?.free && (
                                        <span className="px-4 py-2 bg-green-500/20 text-green-300 border border-green-500/30 rounded-full text-sm font-semibold">
                                            FREE
                                        </span>
                                    )}
                                </div>

                                <p className="text-gray-300 text-lg max-w-3xl leading-relaxed mb-6">
                                    {tool.description}
                                </p>

                                {/* Rating Display */}
                                {ratings.length > 0 && (
                                    <div className="flex items-center gap-3 justify-center lg:justify-start">
                                        <div className="flex items-center gap-2 bg-gray-800/50 px-4 py-2 rounded-full border border-gray-700/50">
                                            <IconStar className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                                            <span className="text-white font-bold text-lg">{averageRating}</span>
                                            <span className="text-gray-400 text-sm">({ratings.length} reviews)</span>
                                        </div>
                                    </div>
                                )}
                            </motion.div>

                            {/* Action Buttons */}
                            <motion.div 
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.4 }}
                                className="flex flex-col gap-3 w-full lg:w-auto"
                            >
                                <button
                                    onClick={handleBookmarkToggle}
                                    className={`px-6 py-3 rounded-xl font-semibold transition-all flex items-center justify-center gap-2 shadow-lg hover:scale-105 ${
                                        isBookmarked 
                                            ? 'bg-gradient-to-r from-pink-500 to-purple-600 text-white hover:from-pink-600 hover:to-purple-700' 
                                            : 'border-2 border-pink-500/50 text-pink-300 hover:bg-pink-500/10'
                                    }`}
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
                                    className="px-6 py-3 bg-gradient-to-r from-blue-500 to-cyan-600 rounded-xl text-white font-semibold hover:from-blue-600 hover:to-cyan-700 transition-all flex items-center justify-center gap-2 shadow-lg hover:scale-105"
                                >
                                    <IconChartBar size={20} />
                                    Compare
                                </button>
                                {tool.website && (
                                    <a
                                        href={tool.website}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="px-6 py-3 border-2 border-purple-500/50 rounded-xl text-purple-300 hover:bg-purple-500/10 transition-all flex items-center justify-center gap-2 font-semibold shadow-lg hover:scale-105"
                                    >
                                        <IconGlobe size={20} />
                                        Visit Website
                                    </a>
                                )}
                            </motion.div>
                        </div>
                    </div>
                </div>
            </motion.div>

            {/* Details Grid */}
            <div className="px-4 sm:px-6 lg:px-8 pb-12">
                <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Features Card */}
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                        className="bg-gray-800/30 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50 shadow-xl hover:border-purple-500/50 transition-all duration-300"
                    >
                        <div className="flex items-center gap-3 mb-6">
                            <div className="p-2 bg-gradient-to-br from-purple-500 to-pink-600 rounded-lg">
                                <IconSparkles className="w-6 h-6 text-white" />
                            </div>
                            <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                                Features
                            </h2>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            {tool.features?.map((feature, index) => (
                                <motion.span 
                                    key={index}
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: 0.6 + index * 0.05 }}
                                    className="px-4 py-2 bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30 rounded-full text-gray-200 text-sm font-medium hover:scale-105 transition-transform"
                                >
                                    {feature}
                                </motion.span>
                            ))}
                        </div>
                    </motion.div>

                    {/* Performance Card */}
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6 }}
                        className="bg-gray-800/30 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50 shadow-xl hover:border-blue-500/50 transition-all duration-300"
                    >
                        <div className="flex items-center gap-3 mb-6">
                            <div className="p-2 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-lg">
                                <IconChartBar className="w-6 h-6 text-white" />
                            </div>
                            <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                                Performance
                            </h2>
                        </div>
                        <div className="space-y-6">
                            <div className="bg-gray-900/30 p-4 rounded-xl border border-gray-700/30">
                                <div className="flex items-center justify-between mb-2">
                                    <span className="text-gray-300 font-medium">Speed</span>
                                    <span className="text-blue-400 font-bold">{tool.performance?.speed || 0}/5</span>
                                </div>
                                <StarRating rating={tool.performance?.speed || 0} readonly={true} />
                            </div>
                            <div className="bg-gray-900/30 p-4 rounded-xl border border-gray-700/30">
                                <div className="flex items-center justify-between mb-2">
                                    <span className="text-gray-300 font-medium">Accuracy</span>
                                    <span className="text-cyan-400 font-bold">{tool.performance?.accuracy || 0}/5</span>
                                </div>
                                <StarRating rating={tool.performance?.accuracy || 0} readonly={true} />
                            </div>
                        </div>
                    </motion.div>

                    {/* Pricing Card */}
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.7 }}
                        className="bg-gray-800/30 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50 shadow-xl hover:border-green-500/50 transition-all duration-300"
                    >
                        <div className="flex items-center gap-3 mb-6">
                            <div className="p-2 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg">
                                <IconCurrency className="w-6 h-6 text-white" />
                            </div>
                            <h2 className="text-2xl font-bold bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
                                Pricing
                            </h2>
                        </div>
                        <div className="space-y-3">
                            {tool.pricing?.free && (
                                <div className="flex items-center gap-3 bg-green-500/10 p-3 rounded-lg border border-green-500/30">
                                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                                    <span className="text-green-300 font-medium">Free Tier Available</span>
                                </div>
                            )}
                            {tool.pricing?.trial && (
                                <div className="flex items-center gap-3 bg-blue-500/10 p-3 rounded-lg border border-blue-500/30">
                                    <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                                    <span className="text-blue-300 font-medium">Trial Available</span>
                                </div>
                            )}
                            {tool.pricing?.paid && (
                                <div className="flex items-center gap-3 bg-purple-500/10 p-3 rounded-lg border border-purple-500/30">
                                    <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                                    <span className="text-purple-300 font-medium">Paid Plans Available</span>
                                </div>
                            )}
                            {tool.pricing?.startingPrice > 0 && (
                                <div className="bg-gray-900/30 p-3 rounded-lg border border-gray-700/30">
                                    <span className="text-gray-400">Starting from: </span>
                                    <span className="text-white font-bold text-lg">${tool.pricing.startingPrice}</span>
                                </div>
                            )}
                        </div>
                    </motion.div>

                    {/* Platforms Card */}
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.8 }}
                        className="bg-gray-800/30 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50 shadow-xl hover:border-orange-500/50 transition-all duration-300"
                    >
                        <div className="flex items-center gap-3 mb-6">
                            <div className="p-2 bg-gradient-to-br from-orange-500 to-red-600 rounded-lg">
                                <IconDevices className="w-6 h-6 text-white" />
                            </div>
                            <h2 className="text-2xl font-bold bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent">
                                Platforms
                            </h2>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            {Object.entries(tool.platform || {})
                                .filter(([_, value]) => value)
                                .map(([key]) => (
                                    <span 
                                        key={key} 
                                        className="px-4 py-2 bg-gradient-to-r from-orange-500/20 to-red-500/20 border border-orange-500/30 rounded-full text-gray-200 text-sm font-medium capitalize flex items-center gap-2"
                                    >
                                        <IconDeviceLaptop className="w-4 h-4" />
                                        {key}
                                    </span>
                                ))}
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Rating and Reviews Section */}
            <div className="px-4 sm:px-6 lg:px-8 pb-20">
                <div className="max-w-7xl mx-auto">
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.9 }}
                        className="bg-gray-800/30 backdrop-blur-sm rounded-2xl p-8 border border-gray-700/50 shadow-xl"
                    >
                        <div className="flex items-center gap-3 mb-8">
                            <div className="p-2 bg-gradient-to-br from-yellow-500 to-orange-600 rounded-lg">
                                <IconMessage className="w-6 h-6 text-white" />
                            </div>
                            <h2 className="text-3xl font-bold bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
                                Rate & Review
                            </h2>
                        </div>
                        
                        {/* Rating Form */}
                        <form onSubmit={handleRatingSubmit} className="space-y-6 mb-10">
                            <div className="bg-gray-900/30 p-6 rounded-xl border border-gray-700/30">
                                <label className="text-white font-semibold mb-3 flex items-center gap-2">
                                    <IconStar className="w-5 h-5 text-yellow-400" />
                                    Your Rating
                                </label>
                                <div className="flex items-center gap-4">
                                    <StarRating
                                        rating={userRating}
                                        onRatingChange={setUserRating}
                                        readonly={false}
                                    />
                                    <span className={`font-semibold ${userRating > 0 ? 'text-yellow-400' : 'text-gray-400'}`}>
                                        {userRating > 0 ? `${userRating} stars` : 'Select rating'}
                                    </span>
                                </div>
                            </div>

                            <div>
                                <label className="text-white font-semibold mb-3 flex items-center gap-2">
                                    <IconMessage className="w-5 h-5 text-purple-400" />
                                    Your Feedback (Optional)
                                </label>
                                <textarea
                                    value={feedback}
                                    onChange={(e) => setFeedback(e.target.value)}
                                    placeholder="Share your experience with this tool..."
                                    className="w-full px-5 py-4 bg-gray-900/50 border-2 border-gray-700 rounded-xl text-white placeholder-gray-500 focus:border-pink-500 focus:ring-2 focus:ring-pink-500/20 transition-all resize-none"
                                    rows={4}
                                />
                            </div>

                            <div className="flex justify-end">
                                <button
                                    type="submit"
                                    disabled={isSubmitting || userRating === 0}
                                    className={`px-8 py-4 bg-gradient-to-r from-pink-500 to-purple-600 text-white font-bold rounded-xl transition-all flex items-center gap-3 text-lg shadow-lg
                                    ${isSubmitting || userRating === 0 
                                        ? 'opacity-50 cursor-not-allowed' 
                                        : 'hover:from-pink-600 hover:to-purple-700 hover:scale-105 hover:shadow-pink-500/50'}`}
                                >
                                    {isSubmitting ? (
                                        <>
                                            <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white"></div>
                                            <span>Submitting...</span>
                                        </>
                                    ) : (
                                        <>
                                            <IconStar className="w-5 h-5" />
                                            Submit Review
                                        </>
                                    )}
                                </button>
                            </div>
                        </form>

                        {/* Existing Reviews */}
                        {ratings.length > 0 && (
                            <div className="pt-8 border-t border-gray-700/50">
                                <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                                    <IconUser className="w-6 h-6 text-pink-400" />
                                    User Reviews ({ratings.length})
                                </h3>
                                <div className="space-y-4">
                                    {ratings.map((rating, index) => (
                                        <motion.div 
                                            key={index}
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: 1.0 + index * 0.1 }}
                                            className="bg-gray-900/50 rounded-xl p-5 border border-gray-700/30 hover:border-gray-600/50 transition-all"
                                        >
                                            <div className="flex items-center justify-between mb-3">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-pink-500 to-purple-600 flex items-center justify-center">
                                                        <IconUser className="w-6 h-6 text-white" />
                                                    </div>
                                                    <StarRating rating={rating.rating} readonly={true} />
                                                </div>
                                                <div className="flex items-center gap-2 text-gray-400 text-sm">
                                                    <IconClock className="w-4 h-4" />
                                                    {new Date(rating.createdAt).toLocaleDateString('en-US', {
                                                        month: 'short',
                                                        day: 'numeric',
                                                        year: 'numeric'
                                                    })}
                                                </div>
                                            </div>
                                            {rating.comment && (
                                                <p className="text-gray-300 leading-relaxed pl-13">{rating.comment}</p>
                                            )}
                                        </motion.div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default ViewTool;