import React, { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { projects } from '../assets/projects';

gsap.registerPlugin(ScrollTrigger);

export default function ProjectScrollShowcase() {
    const sectionRef = useRef(null);
    const [activeIndex, setActiveIndex] = useState(0);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    useEffect(() => {
        const total = projects.length;
        const ctx = gsap.context(() => {

            // Pin section and use scroll to change active index
            // 80% per project = much shorter total scroll
            ScrollTrigger.create({
                trigger: sectionRef.current,
                start: 'top top',
                end: `+=${total * 80}%`,
                pin: true,
                scrub: 0.8,
                onUpdate: (self) => {
                    const idx = Math.min(
                        Math.floor(self.progress * total),
                        total - 1
                    );
                    setActiveIndex(idx);
                },
            });

            // Entrance animation
            gsap.from('.showcase-card-wrap', {
                y: 60,
                opacity: 0,
                stagger: 0.12,
                duration: 1,
                ease: 'power4.out',
            });

        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section
            ref={sectionRef}
            className="relative w-full h-screen bg-[#080808] overflow-hidden flex flex-col items-center justify-center"
        >
            {/* Subtle top glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[350px] bg-indigo-500/5 rounded-full blur-[120px] pointer-events-none" />

            {/* Header */}
            <div className="absolute top-16 w-full text-center pointer-events-none z-10">
                <p className="text-white/20 font-mono text-[10px] uppercase tracking-[0.8em] mb-3">Work Showcase</p>
                <h2 className="text-5xl md:text-7xl font-black text-white uppercase tracking-tighter leading-none italic">
                    Freelance Projects
                </h2>
            </div>

            {/* Cards */}
            <div className="relative w-full flex items-center justify-center z-10" style={{ height: 500 }}>
                {projects.map((project, i) => {
                    const dist = i - activeIndex;
                    const isActive = dist === 0;
                    const isLeft = dist === -1;
                    const isRight = dist === 1;
                    const isFarLeft = dist < -1;
                    const isFarRight = dist > 1;

                    let translateX = 0;
                    let scale = 1;
                    let opacity = 1;
                    let blur = 0;
                    let rotateY = 0;
                    let zIndex = 10;

                    if (isActive) {
                        translateX = 0; scale = 1; opacity = 1; blur = 0; rotateY = 0; zIndex = 20;
                    } else if (isLeft) {
                        translateX = -55; scale = 0.82; opacity = 0.55; blur = 2; rotateY = 12; zIndex = 15;
                    } else if (isRight) {
                        translateX = 55; scale = 0.82; opacity = 0.55; blur = 2; rotateY = -12; zIndex = 15;
                    } else if (isFarLeft) {
                        translateX = -90; scale = 0.65; opacity = 0.15; blur = 6; rotateY = 25; zIndex = 5;
                    } else if (isFarRight) {
                        translateX = 90; scale = 0.65; opacity = 0.15; blur = 6; rotateY = -25; zIndex = 5;
                    }

                    return (
                        <div
                            key={project.id}
                            className="showcase-card-wrap absolute"
                            style={{
                                width: isMobile ? '85vw' : '65vw',
                                maxWidth: 900,
                                height: isMobile ? '75%' : '90%',
                                transform: `translateX(${translateX}%) scale(${scale}) rotateY(${rotateY}deg)`,
                                opacity,
                                filter: `blur(${blur}px)`,
                                zIndex,
                                transition: 'all 0.8s cubic-bezier(0.22, 1, 0.36, 1)',
                                transformStyle: 'preserve-3d',
                                perspective: '1200px',
                            }}
                        >
                            <div className="relative w-full h-full rounded-[2.5rem] overflow-hidden border border-white/10 shadow-2xl">
                                <img
                                    src={project.image}
                                    alt={project.title}
                                    className="absolute inset-0 w-full h-full object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
                                <div className="absolute bottom-12 left-12 right-12">
                                    <h3 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tighter leading-none mb-3">
                                        {project.title}
                                    </h3>
                                    <p className="text-white/40 font-mono text-xs uppercase tracking-[0.5em]">
                                        {project.category}
                                    </p>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>



            {/* Project counter */}
            <div className="absolute bottom-14 right-14 text-right z-10 pointer-events-none">
                <span className="text-white/20 font-mono text-xs uppercase tracking-widest">
                    0{activeIndex + 1} — 0{projects.length}
                </span>
                <div className="w-32 h-px bg-white/10 mt-3 relative">
                    <div
                        className="absolute inset-y-0 left-0 bg-white/60 transition-all duration-700"
                        style={{ width: `${((activeIndex + 1) / projects.length) * 100}%` }}
                    />
                </div>
            </div>

            {/* Scroll hint */}
            <div className="absolute bottom-14 left-14 z-10 pointer-events-none">
                <p className="text-white/20 font-mono text-[10px] uppercase tracking-[0.7em]">Scroll to explore</p>
            </div>
        </section>
    );
}
