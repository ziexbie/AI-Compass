'use client';

import Lenis from 'lenis';
import { createContext, useContext, useEffect, useState } from 'react';

// Create context
export const LenisContext = createContext(null);

// Custom hook to use the Lenis context
export const useLenis = () => {
    const context = useContext(LenisContext);
    if (context === undefined) {
        throw new Error('useLenis must be used within a LenisProvider');
    }
    return context;
};

// Provider component
export const LenisProvider = ({ children, options = {} }) => {
    const [lenis, setLenis] = useState(null);

    useEffect(() => {
        // Default options
        const defaultOptions = {
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            direction: 'vertical',
            gestureDirection: 'vertical',
            smooth: true,
            smoothTouch: false,
            touchMultiplier: 2,
        };

        // Initialize Lenis with merged options
        const lenisInstance = new Lenis({
            ...defaultOptions,
            ...options,
        });

        // Set up RAF
        function raf(time) {
            lenisInstance.raf(time);
            requestAnimationFrame(raf);
        }

        requestAnimationFrame(raf);

        // Make Lenis available in context
        setLenis(lenisInstance);

        // Cleanup
        return () => {
            lenisInstance.destroy();
        };
    }, [options]);

    return (
        <LenisContext.Provider value={lenis}>
            {children}
        </LenisContext.Provider>
    );
};