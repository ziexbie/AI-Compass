'use client';

import { LenisProvider } from '@/context/LenisContext';

const SmoothScroll = ({ children, options }) => {
    return (
        <LenisProvider options={options}>
            {children}
        </LenisProvider>
    );
};

export default SmoothScroll;