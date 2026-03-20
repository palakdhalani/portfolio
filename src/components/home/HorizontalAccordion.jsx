import React, { useState } from 'react';
import imgVraj from '../../assets/vraj overseas.jpeg';
import imgDhruval from '../../assets/Dhruvalexim.jpeg';
import imgSwastik from '../../assets/Swastik.jpeg';
import imgBalaji from '../../assets/Balaji wire.png';

// Project data update
const PROJECTS = [
    {
        id: 'vraj',
        name: 'VRAJ OVERSEAS',
        title: 'Agricultural Import Export',
        description: 'Vraj Overseas specializes in the import and export of premium agricultural products, providing a global source for high-quality fresh fruits, vegetables, and staples.',
        image: imgVraj,
        link: 'https://vraj-overseas.vercel.app/'
    },
    {
        id: 'dhruval',
        name: 'DHRUVAL EXIM',
        title: 'Sustainable Textiles',
        description: 'A prominent textile manufacturer and exporter based in Gujarat, focusing on sustainable practices and diverse African and Indian fabric print collections.',
        image: imgDhruval,
        link: 'https://dhruvalexim.com/'
    },
    {
        id: 'shwasti',
        name: 'SHWASTI HOLISTIC',
        title: 'Natural Healing & Wellness',
        description: 'Shwasti Holistic offers natural and spiritual healing therapies to achieve physical and mental harmony through naturotherapy, reiki, and meditation.',
        image: imgSwastik,
        link: 'https://www.shwastiholistic.com/'
    },
    {
        id: 'balaji',
        name: 'BALAJI WIRE',
        title: 'Industrial Cable Solutions',
        description: 'Providing reliable wire and cable solutions for industrial, automotive, and OEM needs with a focus on high-quality precision engineering.',
        image: imgBalaji,
        link: 'https://balaji-wire.vercel.app/'
    }
];

export default function HorizontalAccordion() {
    const [activeId, setActiveId] = useState('vraj');

    return (
        <section className="py-24 bg-[#111116] text-white overflow-hidden relative font-sans">
            {/* Ambient Background Glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-1/2 bg-purple-900/20 blur-[100px] pointer-events-none rounded-full" />
            
            <div className="container mx-auto px-6 lg:px-12 relative z-10">
                {/* Header Section */}
                <div className="max-w-4xl mx-auto text-center mb-16">
                    <h2 className="text-4xl md:text-6xl lg:text-7xl font-black italic tracking-tight mb-6">
                        OUR FEATURED WORK
                    </h2>
                    <p className="text-gray-400 text-sm md:text-base leading-relaxed max-w-2xl mx-auto font-light">
                        Explore our selection of premium web experiences and digital brands we've helped build. Each project represents our commitment to high-end design and engineering excellence.
                    </p>
                </div>

                {/* Accordion Gallery */}
                <div className="flex w-full h-[500px] md:h-[600px] gap-2 md:gap-4 mx-auto max-w-6xl">
                    {PROJECTS.map((project) => {
                        const isActive = activeId === project.id;
                        
                        return (
                            <a
                                key={project.id}
                                href={project.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                onMouseEnter={() => setActiveId(project.id)}
                                className={`relative rounded-3xl overflow-hidden cursor-pointer transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] flex-shrink-0 group min-w-0 ${
                                    isActive 
                                        ? 'w-[55%]' 
                                        : 'w-[15%]'
                                }`}
                            >
                                {/* Background Image */}
                                <div 
                                    className={`absolute inset-0 bg-cover bg-center bg-no-repeat transition-all duration-1000 ease-out ${
                                        isActive ? 'opacity-100 scale-[1.05]' : 'opacity-30 group-hover:opacity-100 scale-100'
                                    }`}
                                    style={{ 
                                        backgroundImage: `url(${project.image})`
                                    }}
                                />
                                
                                {/* Overlay Gradient */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent pointer-events-none" />
                                
                                {/* Play Icon Overlay (like in reference video) */}
                                {isActive && (
                                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform scale-0 group-hover:scale-100">
                                        <div className="w-0 h-0 border-t-[10px] border-t-transparent border-l-[16px] border-l-white border-b-[10px] border-b-transparent ml-1" />
                                    </div>
                                )}

                                {/* Content Details */}
                                <div 
                                    className={`absolute bottom-0 left-0 w-full p-6 md:p-8 transition-opacity duration-500 delay-100 ${
                                        isActive ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8 pointer-events-none'
                                    }`}
                                >
                                    <h3 className="text-2xl md:text-3xl font-bold uppercase tracking-wide mb-1 text-white text-shadow-sm">
                                        {project.name}
                                    </h3>
                                    <h4 className="text-sm font-semibold text-accent uppercase tracking-widest mb-3 opacity-90">
                                        {project.title}
                                    </h4>
                                    <p className="text-white/70 text-xs md:text-sm leading-relaxed max-w-sm hidden md:block">
                                        {project.description}
                                    </p>
                                </div>
                                
                                {/* Vertical Hidden Title (for collapsed state) */}
                                <div 
                                    className={`absolute inset-0 flex items-center justify-center transition-opacity duration-500 ${
                                        isActive ? 'opacity-0' : 'opacity-100'
                                    }`}
                                >
                                    <h3 
                                        className="text-xl font-bold uppercase tracking-widest whitespace-nowrap opacity-100 group-hover:text-accent transition-all duration-300"
                                        style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}
                                    >
                                        {project.name}
                                    </h3>
                                </div>
                            </a>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
