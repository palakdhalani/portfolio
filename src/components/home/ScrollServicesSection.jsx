import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Globe, Lightbulb, Code2, Rocket, Workflow, MonitorSmartphone } from 'lucide-react';

const services = [
    {
        id: 1,
        title: "Digital Strategy",
        description: "We align your business goals with comprehensive user research to formulate digital roadmaps that guarantee measurable success.",
        icons: [
            <Globe key="1" className="w-8 h-8 text-white/40" />,
            <Lightbulb key="2" className="w-8 h-8 text-white" />
        ],
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2000&auto=format&fit=crop"
    },
    {
        id: 2,
        title: "Experience Design",
        description: "Pixel-perfect interfaces backed by robust usability testing. We prioritize human-centric flows that look stunning and feel natural.",
        icons: [
            <Workflow key="1" className="w-8 h-8 text-white/40" />,
            <MonitorSmartphone key="2" className="w-8 h-8 text-white" />
        ],
        image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?q=80&w=2000&auto=format&fit=crop"
    },
    {
        id: 3,
        title: "Technical Engineering",
        description: "Transforming ambitious designs into resilient architectures. We specialize in high-performance WebGL, React, and headless systems.",
        icons: [
            <Code2 key="1" className="w-8 h-8 text-white/40" />,
            <Rocket key="2" className="w-8 h-8 text-white" />
        ],
        image: "https://images.unsplash.com/photo-1550439062-609e1531270e?q=80&w=2000&auto=format&fit=crop"
    }
];

export default function ScrollServicesSection() {
    const [activeIndex, setActiveIndex] = useState(0);
    const sectionsRef = useRef([]);

    useEffect(() => {
        const observerOptions = {
            root: null,
            rootMargin: '-50% 0px -50% 0px', // Triggers exactly at the center of the viewport
            threshold: 0
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setActiveIndex(Number(entry.target.dataset.index));
                }
            });
        }, observerOptions);

        sectionsRef.current.forEach(section => {
            if (section) observer.observe(section);
        });

        return () => observer.disconnect();
    }, []);

    const activeService = services[activeIndex] || services[0];

    return (
        <section className="relative w-full bg-black text-white font-sans border-t border-white/10">
            {/* 
                We use flex-col on mobile (stacking naturally), 
                and flex-row on desktop (sticky left, scrolling right).
            */}
            <div className="flex flex-col md:flex-row relative">
                
                {/* --- Left Column: Sticky Content --- */}
                <div className="w-full md:w-[45%] lg:w-[40%] md:h-screen sticky top-0 flex flex-col justify-center px-8 md:px-16 lg:px-24 py-20 md:py-0 border-r border-white/5 z-10 bg-black">
                    
                    {/* Small Section Label */}
                    <div className="absolute top-12 left-8 md:left-16 lg:left-24 text-xs tracking-[0.2em] text-white/40 uppercase">
                        Capabilities
                    </div>

                    <div className="w-full max-w-sm relative min-h-[300px] flex flex-col justify-center">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeService.id}
                                initial={{ opacity: 0, y: 40 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -40 }}
                                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                                className="flex flex-col relative"
                            >
                                {/* Icons Row */}
                                <div className="flex gap-4 mb-8">
                                    {activeService.icons.map((icon, i) => (
                                        <div key={i} className="w-14 h-14 rounded-full border border-white/10 bg-white/5 flex items-center justify-center backdrop-blur-md">
                                            {icon}
                                        </div>
                                    ))}
                                </div>

                                {/* Title */}
                                <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 leading-tight">
                                    {activeService.title}
                                </h2>

                                {/* Description */}
                                <p className="text-white/60 text-lg md:text-xl font-light leading-relaxed">
                                    {activeService.description}
                                </p>
                            </motion.div>
                        </AnimatePresence>
                    </div>

                    {/* Progress Indicator (01 / 03) */}
                    <div className="absolute bottom-12 left-8 md:left-16 lg:left-24 flex items-center gap-4 text-sm font-mono text-white/40">
                        <span className="text-white">0{activeIndex + 1}</span>
                        <div className="w-12 h-[1px] bg-white/20">
                            <motion.div 
                                className="h-full bg-white"
                                initial={false}
                                animate={{ width: `${((activeIndex + 1) / services.length) * 100}%` }}
                                transition={{ duration: 0.4, ease: "easeOut" }}
                            />
                        </div>
                        <span>0{services.length}</span>
                    </div>

                </div>

                {/* --- Right Column: Scrolling Media --- */}
                <div className="w-full md:w-[55%] lg:w-[60%] flex flex-col relative">
                    {/* Background Noise/Grid for right side (optional premium feel) */}
                    <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none" />

                    {services.map((service, index) => (
                        <div 
                            key={service.id}
                            data-index={index}
                            ref={el => sectionsRef.current[index] = el}
                            className="w-full h-screen flex flex-col items-center justify-center p-6 md:p-12 lg:p-24 relative"
                        >
                            <div className="w-full h-full max-h-[800px] rounded-3xl overflow-hidden relative group">
                                {/* The Image */}
                                <img 
                                    src={service.image} 
                                    alt={service.title}
                                    className="w-full h-full object-cover grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105 transition-all duration-1000 ease-[cubic-bezier(0.25,1,0.5,1)]"
                                />
                                {/* Overlay / Border Inner */}
                                <div className="absolute inset-0 border border-white/10 rounded-3xl pointer-events-none" />
                                
                                {/* Mobile-only overlay text (since left column is stacked on mobile) */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent flex flex-col justify-end p-8 md:hidden">
                                    <h3 className="text-3xl font-bold mb-2">{service.title}</h3>
                                    <p className="text-white/70 text-sm leading-relaxed">{service.description}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

            </div>
        </section>
    );
}
