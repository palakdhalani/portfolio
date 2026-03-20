import React from 'react';
import { motion } from 'framer-motion';
import { Layers, PenTool, Code, Search, Globe, Share2 } from 'lucide-react';
import SectionTitle from '../ui/SectionTitle';

const services = [
    {
        id: 1,
        title: 'Website Design',
        description: 'Bespoke, aesthetically pleasing website designs tailored to position your brand as a premium leader in your industry.',
        icon: <Layers className="w-8 h-8 text-accent transition-transform duration-500 group-hover:rotate-12" />
    },
    {
        id: 2,
        title: 'UI/UX Design',
        description: 'Intuitive and engaging user interfaces backed by deep user experience research to maximize conversion and satisfaction.',
        icon: <PenTool className="w-8 h-8 text-accent transition-transform duration-500 group-hover:rotate-12" />
    },
    {
        id: 3,
        title: 'Web Development',
        description: 'Robust, scaleable, and blazing-fast web applications built with modern frameworks and pixel-perfect precision.',
        icon: <Code className="w-8 h-8 text-accent transition-transform duration-500 group-hover:rotate-12" />
    },
    {
        id: 4,
        title: 'SEO Optimization',
        description: 'Data-driven on-page and technical SEO strategies to guarantee high visibility and organic traffic for your digital assets.',
        icon: <Search className="w-8 h-8 text-accent transition-transform duration-500 group-hover:rotate-12" />
    },
    {
        id: 5,
        title: 'Branding',
        description: 'Comprehensive brand identity design that communicates your core values through typography, color, and visual storytelling.',
        icon: <Globe className="w-8 h-8 text-accent transition-transform duration-500 group-hover:rotate-12" />
    },
    {
        id: 6,
        title: 'Social Media Management',
        description: 'Strategic content creation and community management that elevates your brand presence and drives meaningful engagement.',
        icon: <Share2 className="w-8 h-8 text-accent transition-transform duration-500 group-hover:rotate-12" />
    }
];

export default function ModernServicesSection() {
    
    // Stagger container animation
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.15,
                delayChildren: 0.2
            }
        }
    };

    // Note: To implement the continuous "floating" animation simultaneously with the initial "fade up",
    // we use Framer Motion's ability to sequence or combine variants, but since `whileInView` triggers `visible`,
    // we can add a continuous animation state or just animate the inner wrapper.
    const itemVariants = {
        hidden: { opacity: 0, y: 50, scale: 0.9 },
        visible: { 
            opacity: 1, 
            y: 0, 
            scale: 1,
            transition: {
                type: 'spring',
                stiffness: 100,
                damping: 15,
                mass: 1
            }
        }
    };

    return (
        <section className="relative w-full py-[120px] bg-[#050507] overflow-hidden flex flex-col items-center">
            
            {/* --- Animated Background Blob --- */}
            <motion.div
                className="absolute bottom-0 pointer-events-none w-[600px] h-[600px] md:w-[1000px] md:h-[600px] rounded-full blur-[120px] opacity-30 mix-blend-screen"
                style={{
                    background: 'radial-gradient(circle, rgba(168,85,247,0.8) 0%, rgba(59,130,246,0.6) 50%, rgba(236,72,153,0.4) 100%)',
                }}
                animate={{
                    x: ['-20%', '20%', '-20%'],
                    y: ['10%', '-10%', '10%'],
                    scale: [1, 1.1, 0.9, 1],
                    borderRadius: ['40% 60% 70% 30%', '60% 40% 30% 70%', '40% 60% 70% 30%']
                }}
                transition={{
                    duration: 12,
                    ease: "easeInOut",
                    repeat: Infinity,
                    repeatType: "reverse"
                }}
            />

            <div className="container mx-auto px-6 md:px-12 relative z-10">
                {/* --- Section Header --- */}
                <div className="flex flex-col items-center text-center mb-20 max-w-3xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                    >
                        <h2 className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight">
                            My Services
                        </h2>
                        <p className="text-xl md:text-2xl text-white/50 font-light">
                            Solutions I provide to help businesses grow online.
                        </p>
                    </motion.div>
                </div>

                {/* --- Services Grid --- */}
                <motion.div 
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-50px" }}
                >
                    {services.map((service, idx) => (
                        <motion.div key={service.id} variants={itemVariants} className="h-full">
                            {/* Inner wrapper for continuous float animation so it doesn't conflict with entry variants */}
                            <motion.div
                                animate={{ y: [0, -10, 0] }}
                                transition={{
                                    duration: 4,
                                    ease: "easeInOut",
                                    repeat: Infinity,
                                    delay: idx * 0.4 // offset floats
                                }}
                                className="h-full"
                            >
                                <motion.div 
                                    className="group relative h-full flex flex-col items-start p-10 rounded-[20px] bg-white/[0.02] border border-white/10 backdrop-blur-xl overflow-hidden cursor-pointer"
                                    whileHover={{ scale: 1.03 }}
                                    transition={{ duration: 0.4, ease: "easeOut" }}
                                >
                                    {/* Hover Glow Background */}
                                    <div className="absolute inset-0 bg-gradient-to-br from-accent/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 ease-out pointer-events-none" />
                                    
                                    {/* Subtle border glow effect on hover */}
                                    <div className="absolute inset-0 rounded-[20px] border border-accent/0 group-hover:border-accent/30 group-hover:shadow-[0_0_30px_rgba(212,175,55,0.15)] transition-all duration-700 pointer-events-none" />

                                    <div className="relative z-10 mb-8 p-4 bg-white/5 rounded-2xl border border-white/10">
                                        {service.icon}
                                    </div>

                                    <h3 className="relative z-10 text-2xl md:text-3xl font-bold text-white mb-4 group-hover:text-accent transition-colors duration-500">
                                        {service.title}
                                    </h3>
                                    
                                    <p className="relative z-10 text-white/60 font-light leading-relaxed text-lg">
                                        {service.description}
                                    </p>
                                </motion.div>
                            </motion.div>
                        </motion.div>
                    ))}
                </motion.div>

            </div>
        </section>
    );
}
