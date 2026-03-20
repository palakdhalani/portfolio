import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';

export default function ParallaxImage({ src, alt, speed = 0.5, className = '' }) {
    const containerRef = useRef(null);
    const imageRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.to(imageRef.current, {
                yPercent: speed * 50,
                ease: 'none',
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: 'top bottom', // Start when top of container hits bottom of viewport
                    end: 'bottom top',   // End when bottom of container hits top of viewport
                    scrub: true,
                },
            });
        }, containerRef);

        return () => ctx.revert();
    }, [speed]);

    return (
        <div ref={containerRef} className={`relative overflow-hidden w-full h-full rounded-2xl ${className}`}>
            {/* We scale the image slightly larger than the container to allow room for the parallax translation without showing empty background */}
            <img
                ref={imageRef}
                src={src}
                alt={alt}
                className="absolute top-[-20%] left-0 w-full h-[140%] object-cover object-center will-change-transform"
            />
        </div>
    );
}
