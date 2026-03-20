import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import SectionTitle from '../components/ui/SectionTitle';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import * as THREE from 'three';

gsap.registerPlugin(ScrollTrigger);

import { projects } from '../assets/projects';

export default function PortfolioSection() {
    const sectionRef = useRef(null);

    useEffect(() => {
        // Standard GSAP fade
        gsap.fromTo('.project-row',
            { opacity: 0, y: 50 },
            {
                opacity: 1,
                y: 0,
                stagger: 0.2,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: 'top 70%'
                }
            }
        );

        return () => {
            // Clean up Shery instances if possible, or GSAP
            ScrollTrigger.getAll().forEach(t => t.kill());
        };
    }, []);

    return (
        <section
            id="selected-works"
            ref={sectionRef}
            className="w-full py-32 bg-background relative overflow-hidden"
        >
            <div className="container mx-auto px-6 md:px-12">
                <div className="mb-20 flex flex-col md:flex-row md:items-end justify-between gap-8">
                    <div>
                        <SectionTitle>Selected Works</SectionTitle>
                    </div>
                    <button className="magnetic pb-2 border-b border-accent text-accent uppercase tracking-widest text-sm font-semibold hover:text-white transition-colors">
                        View All Projects
                    </button>
                </div>

                <div className="flex flex-col">
                    {projects.map((project) => (
                        <Link
                            key={project.id}
                            to={`/project/${project.id}`}
                            state={{ from: '/#selected-works' }}
                            className="project-row group relative flex flex-col md:flex-row items-center justify-between py-12 md:py-16 border-b border-white/10 hover:border-white/50 transition-colors duration-500 cursor-pointer no-underline text-foreground"
                        >
                            {/* Image Reveal on Hover (Desktop) */}
                            <div className="portfolio-image absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[300px] z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none hidden md:block">
                                <img
                                    src={project.image}
                                    alt={project.title}
                                    className="w-full h-full object-cover rounded-xl"
                                    crossOrigin="anonymous" // required for WebGL textures
                                />
                            </div>

                            {/* Content */}
                            <h3 className="text-4xl md:text-6xl font-bold tracking-tighter relative z-10 group-hover:-translate-x-4 transition-transform duration-500">
                                {project.title}
                            </h3>

                            <span className="text-white/40 mt-4 md:mt-0 text-lg relative z-10 group-hover:translate-x-4 transition-transform duration-500">
                                {project.category}
                            </span>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}
