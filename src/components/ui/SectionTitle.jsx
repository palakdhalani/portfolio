import React, { useEffect, useRef } from 'react';
import { animateTextReveal } from '../../animations/scrollAnimations';
import gsap from 'gsap';

export default function SectionTitle({ children, className = '', as: Component = 'h2' }) {
    const textRef = useRef(null);

    useEffect(() => {
        // A small timeout ensures SplitType runs after fonts are ready
        const ctx = gsap.context(() => {
            setTimeout(() => {
                animateTextReveal(textRef);
            }, 100);
        });

        return () => ctx.revert();
    }, [children]);

    return (
        <Component
            ref={textRef}
            className={`text-6xl md:text-8xl font-bold tracking-tight text-balance ${className}`}
            style={{ clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0% 100%)' }}
        >
            {children}
        </Component>
    );
}
