'use client';

import Lenis from 'lenis';
import { createContext, useContext, useEffect, useState, useRef } from 'react';

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
    const optionsRef = useRef(options);

    useEffect(() => {
        // Default options
        const defaultOptions = {
            duration: 1.5,
            easing: (t) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t)),
            direction: 'vertical',
            gestureDirection: 'vertical',
            smooth: true,
            smoothTouch: true,
            touchMultiplier: 1.5,
            wheelMultiplier: 1.0,
            lerp: 0.1, // Linear interpolation value for smoother transitions
        };

        // Initialize Lenis with merged options
        const lenisInstance = new Lenis({
            ...defaultOptions,
            ...optionsRef.current,
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
    }, []); // Empty dependency array - only run once

    return (
        <LenisContext.Provider value={lenis}>
            {children}
        </LenisContext.Provider>
    );
};