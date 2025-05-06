'use client';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import Link from 'next/link';
import { IconStarFilled } from '@tabler/icons-react';

const BookmarksPage = () => {
    const [bookmarkedTools, setBookmarkedTools] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchBookmarkedTools = async () => {
        try {
            setLoading(true);
            setError(null);
            const userId = '12345'; // Replace with actual user ID from auth
            const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/bookmark/user/${userId}`);
            
            if (!response.data) {
                throw new Error('No data received from server');
            }

            setBookmarkedTools(response.data);
        } catch (error) {
            console.error('Error fetching bookmarks:', error);
            setError(error.response?.data?.error || 'Failed to fetch bookmarked tools');
            toast.error(error.response?.data?.error || 'Failed to fetch bookmarked tools');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchBookmarkedTools();
    }, []);

    if (error) {
        return (
            <div className="min-h-screen bg-[#0A0118] flex items-center justify-center">
                <div className="text-center">
                    <p className="text-red-400 mb-4">{error}</p>
                    <button
                        onClick={() => fetchBookmarkedTools()}
                        className="px-4 py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition-colors"
                    >
                        Try Again
                    </button>
                </div>
            </div>
        );
    }

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
                <h1 className="text-3xl font-bold text-white mb-8">My Bookmarks</h1>
                
                {bookmarkedTools.length === 0 ? (
                    <div className="bg-[#1A1625] rounded-xl p-8 text-center">
                        <p className="text-gray-400">No bookmarked tools yet</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {bookmarkedTools.map((tool) => (
                            <Link 
                                href={`/tool-detail/${tool._id}`} 
                                key={tool._id}
                                className="bg-[#1A1625] rounded-xl p-6 border border-[#2A2438] 
                                hover:border-pink-500/20 transition-all duration-300"
                            >
                                <div className="flex items-start gap-4">
                                    <div className="w-16 h-16 flex-shrink-0">
                                        {tool.logo ? (
                                            <img
                                                src={tool.logo}
                                                alt={tool.name}
                                                className="w-full h-full object-cover rounded-lg"
                                            />
                                        ) : (
                                            <div className="w-full h-full rounded-lg bg-[#2A2438] flex items-center justify-center">
                                                <span className="text-2xl font-bold text-pink-500">
                                                    {tool.name[0]}
                                                </span>
                                            </div>
                                        )}
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-semibold text-white">{tool.name}</h3>
                                        <p className="text-gray-400 text-sm mt-1">{tool.category}</p>
                                        <div className="flex items-center gap-2 mt-2">
                                            <IconStarFilled size={16} className="text-yellow-400" />
                                            <span className="text-gray-300">{tool.rating || 0}</span>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default BookmarksPage;