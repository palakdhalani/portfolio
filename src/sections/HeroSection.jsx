import React, { useRef, useEffect } from 'react';
import SectionTitle from '../components/ui/SectionTitle';
import gsap from 'gsap';

export default function HeroSection() {
    const containerRef = useRef(null);

    useEffect(() => {
        // Parallax on scroll for the hero text
        const ctx = gsap.context(() => {
            gsap.to('.hero-text-content', {
                yPercent: 50,
                opacity: 0,
                ease: 'none',
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: 'top top',
                    end: 'bottom top',
                    scrub: true,
                },
            });
        }, containerRef);
        return () => ctx.revert();
    }, []);

    return (
        <section ref={containerRef} className="relative w-full h-screen flex flex-col justify-center items-center overflow-hidden bg-background">
            {/* Removed 3D Background */}
            <div className="absolute inset-0 z-0 bg-gradient-to-b from-[#111116] to-black"></div>

            {/* Foreground Content */}
            <div className="hero-text-content relative z-10 container mx-auto px-6 md:px-12 flex flex-col items-center text-center">
                <div className="overflow-hidden mb-6">
                    <SectionTitle className="text-[12vw] leading-none mb-0">WE ARE</SectionTitle>
                </div>
                <div className="overflow-hidden mb-12">
                    <SectionTitle className="text-[12vw] leading-none text-accent italic font-serif mb-0">PALAK.</SectionTitle>
                </div>

                <p className="max-w-xl text-lg md:text-xl text-white/70 tracking-wide font-light">
                    A premium digital agency specializing in immersive web experiences, high-end design, and cutting-edge frontend engineering.
                </p>
            </div>

            {/* Scroll Indicator */}
            <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-50">
                <span className="text-xs uppercase tracking-[0.3em]">Scroll</span>
                <div className="w-[1px] h-12 bg-gradient-to-b from-white to-transparent" />
            </div>
        </section>
    );
}
