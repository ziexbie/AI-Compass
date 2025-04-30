'use client';

import { useState, useEffect } from 'react';
import { Geist, Geist_Mono } from 'next/font/google';
import { Toaster } from 'react-hot-toast';
import SmoothScroll from '@/components/SmoothScroll';
import './globals.css';
import Footer from '@/components/UI/Footer';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
  display: 'swap',
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
  display: 'swap',
});

export default function RootLayout({ children }) {
  const [loading, setLoading] = useState(true);
  const [fadeInApp, setFadeInApp] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
      setFadeInApp(true);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  function handleLoaderComplete() {
    setLoading(false);
    setFadeInApp(true);
  }

  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased transition-opacity duration-700 ${fadeInApp ? 'opacity-100' : 'opacity-0'}`}>
        <Toaster position="top-right" />
        <SmoothScroll>
          {children}
          <Footer />
        </SmoothScroll>
      </body>
    </html>
  );
}
