import React from 'react'
import Navbar from './Navbar';

const AdminLayout = ({ children }) => {
    return (
        <div className="min-h-screen bg-[#0A0118] flex">
            <Navbar />
            <main className="flex-1 ml-64 p-2 min-h-screen overflow-auto">
                {children}
            </main>
        </div>
    );
};

export default AdminLayout;