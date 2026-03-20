import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import SectionTitle from '../components/ui/SectionTitle';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

// Local Assets
import zolonImg from '../assets/Zolon.png';
import spirexImg from '../assets/Spirex Infoways.png';
import shapetImg from '../assets/shapet.jpeg';

const services = [
    {
        id: '01',
        title: 'Branding & Identity',
        desc: 'Crafting unique visual languages that resonate with your target audience and stand the test of time, translating core values into iconic brands.',
        image: zolonImg,
    },
    {
        id: '02',
        title: 'E-commerce Solutions',
        desc: 'Creating powerful Shopify stores with optimized product pages, smooth checkout experience, and conversion-focused design.',
        image: spirexImg,
    },
    {
        id: '03',
        title: 'UI / UX Experience',
        desc: 'Designing intuitive and visually appealing interfaces that make websites easy to use and engaging for visitors.',
        image: shapetImg,
    },
    {
        id: '04',
        title: 'Performance & SEO Optimization',
        desc: 'Improving website speed, structure, and search engine visibility so businesses can reach more customers online.',
        image: 'https://images.unsplash.com/photo-1558655146-d09347e92766?q=80&w=1200&auto=format&fit=crop',
    },
    {
        id: '05',
        title: 'Digital Growth Strategy',
        desc: 'Helping brands grow online with smart website structure, content flow, and user experience focused on conversions.',
        image: 'https://images.unsplash.com/photo-1558655146-d09347e92766?q=80&w=1200&auto=format&fit=crop',
    }
];

export default function ServicesSection() {
    const [hoveredIdx, setHoveredIdx] = useState(0);

    return (
        <section className="bg-[#050505] text-white relative py-32 md:py-48 z-10">
            <div className="container mx-auto px-6 md:px-12">

                {/* Header Area */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-24 md:mb-32">
                    <div>
                        <SectionTitle>Our Capabilities</SectionTitle>
                    </div>
                    <p className="max-w-md text-white/50 text-xl font-light leading-relaxed mt-8 md:mt-0">
                        We don't just build websites. We engineer premium digital products built for conversion, speed, and undeniable prestige.
                    </p>
                </div>

                {/* Split Layout Container */}
                <div className="flex flex-col lg:flex-row w-full gap-16 lg:gap-24 relative">

                    {/* LEFT STICKY MEDIA (Hidden on mobile, huge on desktop) */}
                    <div className="hidden lg:block w-5/12 relative">
                        <div className="sticky top-40 w-full aspect-[4/5] rounded-xl overflow-hidden shadow-2xl bg-white/5">
                            <AnimatePresence mode="wait">
                                <motion.img
                                    key={hoveredIdx}
                                    src={services[hoveredIdx].image}
                                    alt={services[hoveredIdx].title}
                                    initial={{ opacity: 0, scale: 1.05 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                                    className="absolute inset-0 w-full h-full object-cover grayscale brightness-75 hover:grayscale-0 hover:brightness-100 transition-all duration-700"
                                />
                            </AnimatePresence>
                        </div>
                    </div>

                    {/* RIGHT SCROLLABLE LIST */}
                    <div className="w-full lg:w-7/12 flex flex-col pt-8">
                        {services.map((service, idx) => {
                            const isActive = hoveredIdx === idx;
                            return (
                                <div
                                    key={service.id}
                                    onMouseEnter={() => setHoveredIdx(idx)}
                                    // Make it clickable for mobile if needed
                                    onClick={() => setHoveredIdx(idx)}
                                    className={`relative group cursor-pointer border-t border-white/10 py-12 md:py-16 transition-all duration-500 overflow-hidden ${isActive ? 'border-t-white/40' : 'hover:border-t-white/30'
                                        }`}
                                >
                                    {/* Subdued Giant Background Number */}
                                    <span
                                        className={`absolute -top-6 right-0 text-[120px] md:text-[200px] font-black leading-none pointer-events-none transition-all duration-700 ease-out select-none ${isActive ? 'text-white/5 translate-x-0' : 'text-transparent -translate-x-8'
                                            }`}
                                    >
                                        {service.id}
                                    </span>

                                    <div className="relative z-10 flex flex-col md:flex-row md:items-start justify-between">

                                        <div className="max-w-xl">
                                            {/* Service Title */}
                                            <h3
                                                className={`text-4xl md:text-5xl lg:text-6xl font-black uppercase tracking-tight mb-8 transition-colors duration-500 ${isActive ? 'text-white' : 'text-white/30 group-hover:text-white/70'
                                                    }`}
                                            >
                                                {service.title}
                                            </h3>

                                            {/* Mobile Image Fallback */}
                                            <div className={`lg:hidden w-full aspect-video rounded-lg overflow-hidden mb-8 transition-all duration-700 ${isActive ? 'h-auto opacity-100 scale-100' : 'h-0 opacity-0 scale-95'}`}>
                                                <img src={service.image} alt={service.title} className="w-full h-full object-cover grayscale" />
                                            </div>

                                            {/* Description with Expand Animation */}
                                            <div
                                                className={`transition-all duration-700 ease-in-out overflow-hidden ${isActive ? 'max-h-48 opacity-100' : 'max-h-0 opacity-0'
                                                    }`}
                                            >
                                                <p className="text-white/60 text-lg md:text-xl font-light pr-12 leading-relaxed pb-4">
                                                    {service.desc}
                                                </p>
                                            </div>
                                        </div>

                                        {/* Animated Arrow Icon */}
                                        <Link
                                            to="/#selected-works"
                                            className={`mt-6 md:mt-2 w-14 h-14 shrink-0 rounded-full flex items-center justify-center border transition-all duration-500 transform ${isActive
                                                ? 'bg-white text-black border-white -rotate-45'
                                                : 'border-white/20 text-white/20 group-hover:border-white/50 group-hover:text-white/50'
                                                }`}
                                        >
                                            <ArrowRight size={24} strokeWidth={isActive ? 2 : 1.5} />
                                        </Link>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
}
