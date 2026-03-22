import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import SectionTitle from '../components/ui/SectionTitle';
import { projects as allProjects } from '../assets/projects';
import gsap from 'gsap';
import ProjectScrollShowcase from '../sections/ProjectScrollShowcase';
import DepthGallery from '../components/DepthGallery/DepthGallery';

const categories = ['All', 'Web Design', 'App Design', 'Branding'];

export default function PortfolioPage() {
    const [activeCategory, setActiveCategory] = useState('All');
    const wrapperRef = useRef(null);

    const filteredProjects = activeCategory === 'All'
        ? allProjects
        : allProjects.filter(p => p.category === activeCategory);

    useEffect(() => {
        gsap.from('.portfolio-title', {
            y: 80,
            opacity: 0,
            duration: 1.2,
            ease: 'power4.out',
            stagger: 0.2,
            delay: 0.4
        });
    }, []);

    // 3D Tilt Hook Logic for Cards
    const handleMouseMove = (e, index) => {
        const card = document.getElementById(`tilt-card-${index}`);
        if (!card) return;
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const xPct = x / rect.width - 0.5;
        const yPct = y / rect.height - 0.5;

        card.style.transform = `perspective(1000px) rotateX(${-yPct * 20}deg) rotateY(${xPct * 20}deg) scale3d(1.02, 1.02, 1.02)`;
    };

    const handleMouseLeave = (index) => {
        const card = document.getElementById(`tilt-card-${index}`);
        if (!card) return;
        card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
    };

    return (
        <div className="w-full bg-background flex flex-col relative">

            {/* 1. The New 3D Depth Gallery Hero Experience */}
            <div
                ref={wrapperRef}
                className="portfolio-scroll-wrapper relative z-10"
                style={{ height: '500vh', background: '#0a0a0a' }}
            >
                <div
                    style={{
                        position: 'sticky',
                        top: 0,
                        width: '100%',
                        height: '100vh',
                        overflow: 'hidden',
                    }}
                >
                    <DepthGallery scrollWrapper={wrapperRef} />
                </div>
            </div>

            {/* 2. The Original Scroll Showcase */}
            <div className="relative z-20 bg-background">
                <ProjectScrollShowcase />
            </div>

            {/* 3. The Original Portfolio List & Filter Grid */}
            <div id="portfolio-list" className="relative z-20 bg-background pt-20">
                {/* Portfolio Header */}
                <div className="container mx-auto px-6 md:px-12 mb-20 text-center">
                    <div className="overflow-hidden mb-4">
                        <div className="portfolio-title">
                            <SectionTitle className="text-[12vw] tracking-tighter">Selected Works</SectionTitle>
                        </div>
                    </div>
                    <div className="overflow-hidden">
                        <p className="portfolio-title text-xl md:text-2xl text-white/50 font-light max-w-2xl mx-auto">
                            We create digital experiences that blend aesthetic beauty with intense technical capability.
                        </p>
                    </div>

                    {/* Animated Filter System */}
                    <div className="flex flex-wrap items-center justify-center gap-4 md:gap-8 mt-12">
                        {categories.map((cat) => (
                            <button
                                key={cat}
                                onClick={() => setActiveCategory(cat)}
                                className={`relative text-lg md:text-xl font-medium tracking-wide transition-colors ${activeCategory === cat ? 'text-white' : 'text-white/40 hover:text-white/70'}`}
                            >
                                {cat}
                                {activeCategory === cat && (
                                    <motion.div
                                        layoutId="activeFilter"
                                        className="absolute -bottom-2 left-0 right-0 h-[2px] bg-accent"
                                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                    />
                                )}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Grid Layout (Framer Motion handles the filtering animations) */}
                <div className="container mx-auto px-6 md:px-12 pb-32">
                    <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-x-12 gap-y-24">
                        <AnimatePresence mode='popLayout'>
                            {filteredProjects.map((project) => (
                                <motion.div
                                    key={project.id}
                                    layout
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.9 }}
                                    transition={{ duration: 0.4 }}
                                >
                                    <Link
                                        to={`/project/${project.id}`}
                                        state={{ from: '/portfolio#portfolio-list' }}
                                        className="flex flex-col group cursor-pointer no-underline text-foreground"
                                        onMouseMove={(e) => handleMouseMove(e, project.id)}
                                        onMouseLeave={() => handleMouseLeave(project.id)}
                                    >
                                        <div
                                            id={`tilt-card-${project.id}`}
                                            className="w-full aspect-[4/3] relative rounded-lg overflow-hidden mb-8 transition-transform duration-200 ease-out will-change-transform"
                                        >
                                            <img
                                                src={project.image}
                                                alt={project.title}
                                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-in-out"
                                            />
                                            <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500" />
                                        </div>

                                        <div className="flex justify-between items-start">
                                            <div>
                                                <h3 className="text-3xl font-bold mb-2 group-hover:text-accent transition-colors tracking-tight">{project.title}</h3>
                                                <p className="text-white/40 uppercase tracking-widest text-sm">{project.category}</p>
                                            </div>
                                            <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all">
                                                ↗
                                            </div>
                                        </div>
                                    </Link>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}
