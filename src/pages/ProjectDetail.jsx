import React, { useEffect } from 'react';
import { useParams, Link, useNavigate, useLocation } from 'react-router-dom';
import { projects } from '../assets/projects';
import { motion } from 'framer-motion';
import { ArrowLeft, ExternalLink } from 'lucide-react';
import gsap from 'gsap';
import MagneticButton from '../components/ui/MagneticButton';
import ParallaxImage from '../components/ui/ParallaxImage';

export default function ProjectDetail() {
    const { id } = useParams();
    const navigate = useNavigate();
    const location = useLocation();
    const project = projects.find((p) => p.id === parseInt(id));

    // Determine where to go back to (from state or default to home works)
    const backTo = location.state?.from || '/#selected-works';

    useEffect(() => {
        // Only scroll to top if we're not landing from a hash (though this page doesn't have hashes usually)
        if (!window.location.hash) {
            window.scrollTo(0, 0);
        }

        // Premium reveal animation
        const ctx = gsap.context(() => {
            gsap.fromTo('.stagger-text',
                { opacity: 0, y: 100 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 1.2,
                    stagger: 0.1,
                    ease: 'power4.out',
                    delay: 0.8
                }
            );

            gsap.fromTo('.reveal-image',
                { clipPath: 'inset(100% 0% 0% 0%)' },
                { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.5, ease: 'power4.inOut', delay: 0.4 }
            );
        });

        return () => ctx.revert();
    }, [id]);

    if (!project) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-black text-white">
                <div className="text-center">
                    <h1 className="text-4xl font-bold mb-4">Project Not Found</h1>
                    <Link to="/" className="text-accent underline">Back to Home</Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-black text-white selection:bg-accent selection:text-black">
            {/* Header / Navigation back */}
            <div className="fixed top-32 left-6 md:left-12 z-50">
                <MagneticButton
                    className="!bg-transparent !p-0"
                    onClick={() => navigate(backTo)}
                >
                    <div className="flex items-center gap-2 text-white/50 hover:text-white transition-colors group px-4 py-2">
                        <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center group-hover:border-white/40 transition-all">
                            <ArrowLeft size={18} />
                        </div>
                        <span className="uppercase tracking-widest text-xs font-bold">Back</span>
                    </div>
                </MagneticButton>
            </div>

            <div className="container mx-auto px-6 md:px-12 pt-48 pb-32">
                <div className="flex flex-col lg:flex-row gap-16 lg:gap-24">

                    {/* LEFT: Project Image */}
                    <motion.div
                        className="w-full lg:w-3/5 reveal-image"
                        style={{ clipPath: 'inset(100% 0% 0% 0%)' }}
                    >
                        <div className="rounded-2xl overflow-hidden shadow-2xl bg-white/5 aspect-[4/3] md:aspect-video lg:aspect-[4/3] relative">
                            <ParallaxImage
                                src={project.image}
                                alt={project.title}
                                speed={0.2}
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />
                        </div>
                    </motion.div>

                    {/* RIGHT: Project Details */}
                    <div className="w-full lg:w-2/5 project-content">
                        <div className="sticky top-40">
                            <span className="text-accent uppercase tracking-[0.3em] font-bold text-sm mb-4 block stagger-text">
                                {project.category}
                            </span>
                            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black mb-8 tracking-tighter leading-none stagger-text">
                                {project.title}
                            </h1>

                            <div className="space-y-12">
                                <div className="stagger-text">
                                    <h4 className="text-white/30 uppercase tracking-widest text-xs font-bold mb-4">Overview</h4>
                                    <p className="text-xl md:text-2xl font-light leading-relaxed text-white/70">
                                        {project.description}
                                    </p>
                                </div>

                                <div className="stagger-text">
                                    <h4 className="text-white/30 uppercase tracking-widest text-xs font-bold mb-4">Technologies</h4>
                                    <div className="flex flex-wrap gap-3">
                                        {project.tech?.map((t, idx) => (
                                            <span
                                                key={idx}
                                                className="px-4 py-2 rounded-full border border-white/10 text-sm font-medium hover:bg-white hover:text-black transition-all cursor-default"
                                            >
                                                {t}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                <div className="pt-8 stagger-text">
                                    <MagneticButton className="!bg-white !text-black hover:!bg-accent hover:!text-black !px-0 !py-0 rounded-full transition-transform">
                                        <a
                                            href={project.link}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center gap-4 px-10 py-6 font-black uppercase tracking-widest text-sm"
                                        >
                                            Visit Website
                                            <ExternalLink size={18} />
                                        </a>
                                    </MagneticButton>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Footer-like spacer */}
            <div className="h-64 flex items-center justify-center border-t border-white/5">
                <Link to="/portfolio" className="text-white/30 hover:text-accent transition-colors uppercase tracking-[0.5em] text-xs font-bold">
                    View Other Projects
                </Link>
            </div>
        </div>
    );
}
