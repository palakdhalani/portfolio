import React, { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const processSteps = [
    {
        id: '01',
        title: 'Discovery & Strategy',
        description: 'We start by understanding your brand, goals, and audience. This phase is all about research and strategy, setting a solid foundation for everything that follows. I believe great design solves real problems.',
        icon: 'Search' // Conceptual
    },
    {
        id: '02',
        title: 'Design & Prototyping',
        description: 'Once the strategy is set, I craft the visual identity and user experience. Turning wireframes into high-fidelity designs, focusing on every pixel and bezier curve, ensuring a premium feel.',
        icon: 'PenTool'
    },
    {
        id: '03',
        title: 'Development & Magic',
        description: 'This is where the magic happens. I write clean, performant, and scaleable code. Every animation is carefully calibrated, and every interaction is built to leave a lasting impression on the user.',
        icon: 'Code'
    },
    {
        id: '04',
        title: 'Client Satisfaction',
        description: 'Delivering the final polished product is not the end. I ensure 100% client satisfaction, making final adjustments, providing necessary documentation, and officially launching the digital ecosystem.',
        icon: 'Star'
    }
];

export default function ProcessSection() {
    const containerRef = useRef(null);
    const stepsRef = useRef([]);

    useEffect(() => {

        const ctx = gsap.context(() => {
            // Animate each step as it enters the viewport
            stepsRef.current.forEach((step, index) => {
                gsap.fromTo(step, 
                    {
                        opacity: 0.2,
                        filter: 'blur(4px)',
                        x: 50,
                    },
                    {
                        opacity: 1,
                        filter: 'blur(0px)',
                        x: 0,
                        duration: 1,
                        ease: 'power3.out',
                        scrollTrigger: {
                            trigger: step,
                            start: 'top 60%',
                            end: 'top 20%',
                            scrub: true,
                        }
                    }
                );

                // Connector line animation for all but the last item
                if (index < stepsRef.current.length - 1) {
                    const line = step.querySelector('.progress-line');
                    gsap.fromTo(line,
                        { scaleY: 0 },
                        {
                            scaleY: 1,
                            ease: 'none',
                            scrollTrigger: {
                                trigger: step,
                                start: 'top 50%',
                                end: 'bottom 50%',
                                scrub: true,
                            }
                        }
                    );
                }
            });

            // Title animation
            gsap.from('.process-title', {
                y: 50,
                opacity: 0,
                duration: 1,
                scrollTrigger: {
                    trigger: '.process-title',
                    start: 'top 80%',
                }
            });

        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={containerRef} className="py-32 bg-black relative border-t border-white/10">
            <div className="container mx-auto px-6 md:px-12 relative z-20">
                <div className="flex flex-col lg:flex-row gap-20 items-stretch">
                    
                    {/* Sticky Left Column for Title */}
                    <div className="lg:w-1/3 relative">
                        <div className="sticky top-40 pt-10">
                            <div className="process-title">
                                <h2 className="text-5xl md:text-6xl font-black mb-6 leading-tight">
                                    How I <br/><span className="text-accent italic">Work.</span>
                                </h2>
                                <p className="text-white/50 text-lg uppercase tracking-widest max-w-sm">
                                    A streamlined process moving from concept to reality.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Right Column for Steps */}
                    <div className="lg:w-2/3 relative w-full">
                        <div className="flex flex-col gap-0">
                            {processSteps.map((step, index) => (
                                <div 
                                    key={step.id} 
                                    ref={el => stepsRef.current[index] = el}
                                    className="relative flex gap-8 md:gap-16 pb-24 group"
                                >
                                    {/* Timeline graphic */}
                                    <div className="flex flex-col items-center relative z-10">
                                        <div className="w-16 h-16 rounded-full bg-white/5 border border-white/20 flex items-center justify-center text-accent font-bold text-xl backdrop-blur-md group-hover:scale-110 group-hover:bg-accent/10 group-hover:border-accent/50 transition-all duration-500">
                                            {step.id}
                                        </div>
                                        {index < processSteps.length - 1 && (
                                            <div className="w-[1px] h-full absolute top-16 bg-white/10 origin-top overflow-hidden">
                                                <div className="progress-line w-full h-full bg-accent origin-top" />
                                            </div>
                                        )}
                                    </div>

                                    {/* Content */}
                                    <div className="flex-1 pt-2">
                                        <h3 className="text-3xl md:text-4xl font-bold mb-4 text-white group-hover:text-accent transition-colors duration-500">
                                            {step.title}
                                        </h3>
                                        <p className="text-xl font-light text-white/50 leading-relaxed max-w-2xl group-hover:text-white/80 transition-colors duration-500">
                                            {step.description}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}
