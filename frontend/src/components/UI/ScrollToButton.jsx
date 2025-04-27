'use client';

import { useLenis } from "@/context/LenisContext";
import { useEffect, useState } from 'react';

const ScrollToButton = ({ targetId, children, className, offset = 0 }) => {
    const lenis = useLenis();
    const [isReady, setIsReady] = useState(false);

    useEffect(() => {
        // Wait for lenis to be initialized
        if (lenis) {
            setIsReady(true);
        }
    }, [lenis]);

    const handleClick = () => {
        if (!isReady) return;

        const targetElement = document.getElementById(targetId);

        if (targetElement) {
            // Scroll to the target element with the specified offset
            lenis.scrollTo(targetElement, { offset });
        }
    };

    return (
        <button
            onClick={handleClick}
            className={className}
            disabled={!isReady}
        >
            {children}
        </button>
    );
};

export default ScrollToButton;