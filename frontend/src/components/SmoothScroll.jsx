'use client';

import { useMemo } from 'react';
import { LenisProvider } from '@/context/LenisContext';

const SmoothScroll = ({ children, options }) => {
    // Memoize options to prevent recreating the object on each render
    const memoizedOptions = useMemo(() => options || {}, [JSON.stringify(options)]);

    return (
        <LenisProvider options={memoizedOptions}>
            {children}
        </LenisProvider>
    );
};

export default SmoothScroll;