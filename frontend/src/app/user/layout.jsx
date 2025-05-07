import React from 'react'
import Navbar from './Navbar';
import Footer from '@/components/UI/Footer';

const Layout = ({ children }) => {
    return (
        <>
            <Navbar />
            {children}
            <Footer />
        </>
    )
}

export default Layout;