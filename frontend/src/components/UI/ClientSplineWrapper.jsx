// 'use client';

// import { useEffect, useRef } from 'react';

// export default function ClientSplineWrapper({ children, onLoad }) {
//     const contentRef = useRef(null);

//     // Simplified loader handler
//     useEffect(() => {
//         // Simple timeout to simulate loading complete
//         const timer = setTimeout(() => {
//             if (onLoad) onLoad();
//         }, 1000);

//         return () => clearTimeout(timer);
//     }, [onLoad]);

//     return (
//         <div ref={contentRef} className="w-full h-full">
//             {children}
//         </div>
//     );
// } 