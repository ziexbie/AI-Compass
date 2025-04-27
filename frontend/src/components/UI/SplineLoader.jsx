// components/SplineLoader.jsx

'use client';

import { useState, useEffect } from 'react';
import Spline from '@splinetool/react-spline/next';

const SplineLoader = ({ onComplete }) => {
    const [progress, setProgress] = useState(0);
    const [isLoaded, setIsLoaded] = useState(false);
    const [fadeOut, setFadeOut] = useState(false);
    const [fadeIn, setFadeIn] = useState(false);
    const [shouldRender, setShouldRender] = useState(true);

    const onSplineLoad = () => {
        setIsLoaded(true);
    };

    useEffect(() => {
        const timeout = setTimeout(() => setFadeIn(true), 100);
        return () => clearTimeout(timeout);
    }, []);

    useEffect(() => {
        if (isLoaded && progress >= 100) {
            const timeout = setTimeout(() => setFadeOut(true), 500);
            return () => clearTimeout(timeout);
        }
    }, [isLoaded, progress]);

    useEffect(() => {
        if (fadeOut) {
            const timeout = setTimeout(() => {
                setShouldRender(false);
                if (onComplete) {
                    onComplete();
                }
            }, 700); // Match transition duration
            return () => clearTimeout(timeout);
        }
    }, [fadeOut, onComplete]);

    useEffect(() => {
        const interval = setInterval(() => {
            setProgress(prev => {
                if (prev >= 100 || isLoaded) {
                    clearInterval(interval);
                    return 100;
                }
                return prev + 2;
            });
        }, 100);

        return () => clearInterval(interval);
    }, [isLoaded]);

    if (!shouldRender) return null;

    return (
        <div
            className={`fixed inset-0 bg-white flex flex-col items-center justify-center z-50 transition-opacity duration-700 ${fadeIn ? 'opacity-100' : 'opacity-0'} ${fadeOut ? 'opacity-0' : ''}`}
        >
            <div className="absolute inset-0 z-0">
                <Spline
                    scene="https://prod.spline.design/a8oGYu4bEu5OxIdn/scene.splinecode"
                    onLoad={onSplineLoad}
                />
            </div>

            <div className="z-10 bg-white bg-opacity-60 p-6 rounded-lg shadow-lg text-center">
                <div className="w-64 bg-gray-200 rounded-full h-2.5 mb-4 overflow-hidden">
                    <div
                        className="bg-blue-600 h-2.5 rounded-full transition-all duration-300 ease-out"
                        style={{ width: `${progress}%` }}
                    ></div>
                </div>
                <p className="text-gray-800 font-medium">
                    {isLoaded ? 'Preparing your experience...' : 'Loading 3D elements...'} {progress}%
                </p>
            </div>
        </div>
    );
};

export default SplineLoader;
