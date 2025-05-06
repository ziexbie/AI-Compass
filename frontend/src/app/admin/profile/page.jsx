'use client';
import React from 'react';
import { IconUser, IconMail, IconPhone } from '@tabler/icons-react';

const Profile = () => {
    return (
        <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold text-white mb-8">Admin Profile</h1>
            
            <div className="bg-[#1A1625] rounded-xl p-6 border border-[#2A2438] shadow-lg">
                <div className="flex items-center gap-6 mb-8">
                    <div className="w-24 h-24 rounded-full bg-pink-500/20 flex items-center justify-center">
                        <IconUser size={40} className="text-pink-500" />
                    </div>
                    <div>
                        <h2 className="text-2xl font-bold text-white">Admin User</h2>
                        <p className="text-gray-400">Super Admin</p>
                    </div>
                </div>

                <div className="space-y-6">
                    <div className="flex items-center gap-4 text-gray-300">
                        <IconMail className="text-pink-500" />
                        <span>admin@aicompass.com</span>
                    </div>
                    <div className="flex items-center gap-4 text-gray-300">
                        <IconPhone className="text-pink-500" />
                        <span>+1 234 567 890</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;