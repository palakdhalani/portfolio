import React, { useRef, useEffect } from 'react';
import SectionTitle from '../components/ui/SectionTitle';
import ScrollServicesSection from '../components/home/ScrollServicesSection';
import Accordion from '../components/ui/Accordion';
import gsap from 'gsap';
import { App as CanvasHero } from '../components/infinite-canvas-hero/app';

export default function ServicesPage() {
    const processRef = useRef(null);

    useEffect(() => {
        // Reveal Process Steps
        const ctx = gsap.context(() => {
            gsap.from('.process-step', {
                x: -50,
                opacity: 0,
                stagger: 0.2,
                duration: 0.8,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: processRef.current,
                    start: 'top 70%',
                }
            });

            // Animate line grow
            gsap.from('.process-line', {
                height: 0,
                duration: 1.5,
                ease: 'power2.inOut',
                scrollTrigger: {
                    trigger: processRef.current,
                    start: 'top 60%',
                }
            });

            // Header reveal
            gsap.from('.services-hero-reveal', {
                y: 80,
                opacity: 0,
                duration: 1.2,
                ease: 'power4.out',
                stagger: 0.1,
                delay: 0.4
            });
        }, processRef);

        return () => ctx.revert();
    }, []);

    const faqs = [
        { question: "Do you work with startups?", answer: "Absolutely. We love partnering with early-stage founders to establish a dominant brand presence and premium digital product from day one." },
        { question: "What is your typical timeline?", answer: "A standard highly-animated marketing website takes between 4 to 8 weeks, depending on complexity and 3D requirements." },
        { question: "Do you build custom CMS?", answer: "We integrate with headless CMS platforms like Sanity, Strapi, or Prismic to give you full control over your content without sacrificing rendering speed or UI flexibility." },
        { question: "Are your websites accessible?", answer: "Yes. Despite our heavy use of WebGL and motion, we strictly adhere to WCAG standards, utilizing ARIA labels and respecting the user's 'prefers-reduced-motion' OS settings." }
    ];

    return (
        <div className="w-full bg-background pt-0 pb-20">

            {/* Extended Height Wrapper for Sticky Hero */}
            <div className="relative w-full h-[400vh] mb-20">
                {/* Infinite Canvas Hero Section - Sticky Container */}
                <div className="sticky top-0 w-full h-screen overflow-hidden bg-[#050505]">
                    <CanvasHero />

                    {/* Overlay Text for the Hero */}
                    <div className="absolute inset-0 pointer-events-none flex flex-col items-center justify-center z-20 bg-gradient-to-b from-transparent via-transparent to-[#050505]/80">
                        <div className="services-hero-reveal text-center mt-[40vh]">
                            <SectionTitle className="text-[10vw] md:text-[8vw] drop-shadow-2xl text-white">What We Do</SectionTitle>
                            <p className="text-xl md:text-3xl text-white/80 font-light max-w-2xl mx-auto mt-6 drop-shadow-lg">
                                We combine strategic thinking with unparalleled execution to deliver digital experiences that captivate and convert.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Sticky Scrolling Services Section requested by user */}
            <ScrollServicesSection />

            {/* Deep Process Section (Vertical Timeline) */}
            <div ref={processRef} className="py-32 bg-black text-white border-t border-white/10 relative">
                <div className="container mx-auto px-6 md:px-12">
                    <SectionTitle className="mb-24">The Methodology</SectionTitle>

                    <div className="relative max-w-4xl mx-auto">
                        {/* The animated vertical line */}
                        <div className="process-line absolute left-[15px] md:left-[39px] top-0 bottom-0 w-[2px] bg-white/20" />

                        {[
                            { num: '01', title: 'Discovery & Audit', desc: 'We analyze your current positioning, market competitors, and define the technical requirements for the upcoming build.' },
                            { num: '02', title: 'Design & Motion Prototyping', desc: 'Our designers craft the visual identity while motion leads build micro-interaction prototypes to ensure the "feel" is right.' },
                            { num: '03', title: 'WebGL & React Engineering', desc: 'The heavy lifting. We translate Figma into fluid, performant code utilizing Three.js and GSAP for a cinematic feel.' },
                            { num: '04', title: 'QA & Deployment', desc: 'Rigorous performance auditing, cross-device testing, and final deployment to edge networks for zero-latency loading.' }
                        ].map((step, idx) => (
                            <div key={step.num} className="process-step relative flex gap-8 md:gap-16 mb-24 last:mb-0">
                                {/* Dot */}
                                <div className="relative z-10 w-8 h-8 md:w-20 md:h-20 shrink-0 rounded-full bg-black border-4 border-accent flex items-center justify-center -ml-[3px] md:-ml-0">
                                    <div className="w-2 h-2 md:w-6 md:h-6 bg-accent rounded-full" />
                                </div>

                                {/* Content */}
                                <div className="pt-1 md:pt-4">
                                    <span className="text-accent text-sm md:text-lg font-mono mb-2 md:mb-4 block">{step.num} Phase</span>
                                    <h3 className="text-3xl md:text-5xl font-semibold mb-6 tracking-tight">{step.title}</h3>
                                    <p className="text-white/60 text-lg md:text-2xl font-light leading-relaxed max-w-2xl">{step.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* FAQ Section */}
            <div className="py-32 container mx-auto px-6 md:px-12">
                <div className="flex flex-col lg:flex-row gap-16 item-start">
                    <div className="lg:w-1/3">
                        <SectionTitle>FAQ</SectionTitle>
                        <p className="text-white/50 text-lg mt-6">Common questions about our process, capabilities, and timelines.</p>
                    </div>
                    <div className="lg:w-2/3">
                        <Accordion items={faqs} />
                    </div>
                </div>
            </div>

        </div>
    );
}
