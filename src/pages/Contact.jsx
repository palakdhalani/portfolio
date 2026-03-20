import React, { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import gsap from 'gsap';

// Reusing the same 3D assets used in AboutMeSection
import silverBlob from '../assets/3d/silver_blob_3d.png';
import purpleFlower from '../assets/3d/purple_flower_3d.png';
import blueObject from '../assets/3d/blue_object_3d.png';
import redHeart from '../assets/3d/red_heart_3d.png';

export default function Contact() {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    // Parallax values for the floating 3D elements
    const y1 = useTransform(scrollYProgress, [0, 1], [0, -250]);
    const y2 = useTransform(scrollYProgress, [0, 1], [0, 200]);
    const y3 = useTransform(scrollYProgress, [0, 1], [0, -180]);
    const y4 = useTransform(scrollYProgress, [0, 1], [0, 150]);

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        interest: '',
        message: ''
    });
    const [status, setStatus] = useState('idle');

    useEffect(() => {
        // Continuous subtle floating animation for stickers (GSAP)
        const stickers = containerRef.current.querySelectorAll('.contact-sticker');
        stickers.forEach((sticker, i) => {
            gsap.to(sticker, {
                y: '+=25',
                rotation: i % 2 === 0 ? 10 : -10,
                duration: 2.5 + i * 0.5,
                repeat: -1,
                yoyo: true,
                ease: "sine.inOut"
            });
        });

        // Mouse move parallax effect specifically for this section
        const handleMouseMove = (e) => {
            if (!containerRef.current) return;
            const rect = containerRef.current.getBoundingClientRect();

            // Only apply mouse effect if section is visible in viewport
            if (rect.top < window.innerHeight && rect.bottom > 0) {
                const { clientX, clientY } = e;
                const xPos = (clientX / window.innerWidth - 0.5) * 50;
                const yPos = (clientY / window.innerHeight - 0.5) * 50;

                gsap.to('.contact-sticker-wrap', {
                    x: xPos,
                    y: yPos,
                    duration: 1.5,
                    ease: "power2.out",
                    stagger: 0.05
                });
            }
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        // WhatsApp Logic
        const phoneNumber = "919510546800";
        const textMessage = `Hi! I have a new inquiry.%0A%0A*Name:* ${formData.name}%0A*Email:* ${formData.email}%0A*Phone:* ${formData.phone}%0A*Interest:* ${formData.interest}%0A*Message:* ${formData.message}`;
        const whatsappUrl = `https://wa.me/${phoneNumber}?text=${textMessage}`;
        
        window.open(whatsappUrl, '_blank');
        
        setStatus('success');
        setFormData({ name: '', email: '', phone: '', interest: '', message: '' });
    };

    // Form variants for staggered animation
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

    const itemVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] }
        }
    };

    return (
        <section
            ref={containerRef}
            className="relative min-h-screen bg-[#050507] flex flex-col items-center justify-center overflow-hidden py-32"
        >
            {/* Ambient Background Glows */}
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-900/10 blur-[120px] rounded-full pointer-events-none" />
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-900/10 blur-[120px] rounded-full pointer-events-none" />

            {/* 3D Stickers around the form */}
            <motion.div style={{ y: y1 }} className="contact-sticker-wrap absolute top-[15%] left-[5%] md:left-[15%] w-32 md:w-48 z-10 pointer-events-none">
                <img src={purpleFlower} alt="" className="contact-sticker w-full h-auto drop-shadow-2xl opacity-90" />
            </motion.div>

            <motion.div style={{ y: y2 }} className="contact-sticker-wrap absolute top-[20%] right-[5%] md:right-[15%] w-24 md:w-40 z-10 pointer-events-none">
                <img src={silverBlob} alt="" className="contact-sticker w-full h-auto drop-shadow-2xl opacity-90" />
            </motion.div>

            <motion.div style={{ y: y3 }} className="contact-sticker-wrap absolute bottom-[15%] left-[8%] md:left-[12%] w-28 md:w-44 z-10 pointer-events-none">
                <img src={blueObject} alt="" className="contact-sticker w-full h-auto drop-shadow-2xl opacity-90" />
            </motion.div>

            <motion.div style={{ y: y4 }} className="contact-sticker-wrap absolute bottom-[20%] right-[8%] md:right-[12%] w-32 md:w-56 z-10 pointer-events-none">
                <img src={redHeart} alt="" className="contact-sticker w-full h-auto drop-shadow-2xl opacity-90" />
            </motion.div>

            {/* Content Container */}
            <div className="container mx-auto px-6 relative z-20 flex flex-col items-center">

                {/* Heading */}
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                    className="text-center mb-16"
                >
                    <h2 className="text-[10vw] md:text-[6vw] font-black text-white uppercase tracking-tighter leading-none mb-4">
                        Get In <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">Touch</span>
                    </h2>
                    <p className="text-lg md:text-xl text-white/50 font-light max-w-2xl mx-auto">
                        Have a project in mind, or just want to say hi? Send me a message and let's create something brilliant together.
                    </p>
                </motion.div>

                {/* Form Wrapper (Glassmorphism) */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-50px" }}
                    className="w-full max-w-2xl bg-white/[0.03] backdrop-blur-xl border border-white/10 p-8 md:p-12 rounded-[2rem] shadow-2xl"
                >
                    <form className="space-y-8" onSubmit={handleSubmit}>

                        {/* Name & Email Group */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <motion.div variants={itemVariants} className="relative group">
                                <label className="absolute -top-3 left-4 px-2 text-xs font-bold text-white/40 uppercase tracking-widest bg-[#050507] transition-colors group-focus-within:text-purple-400 z-10">
                                    Name
                                </label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    className="w-full bg-transparent border border-white/20 rounded-2xl px-6 py-4 text-white placeholder-white/20 outline-none transition-all duration-300 focus:border-purple-500/50 focus:bg-white/[0.05]"
                                    placeholder="Jane Doe"
                                    required
                                />
                            </motion.div>

                            <motion.div variants={itemVariants} className="relative group">
                                <label className="absolute -top-3 left-4 px-2 text-xs font-bold text-white/40 uppercase tracking-widest bg-[#050507] transition-colors group-focus-within:text-blue-400 z-10">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="w-full bg-transparent border border-white/20 rounded-2xl px-6 py-4 text-white placeholder-white/20 outline-none transition-all duration-300 focus:border-blue-500/50 focus:bg-white/[0.05]"
                                    placeholder="jane@example.com"
                                    required
                                />
                            </motion.div>
                        </div>

                        {/* Phone & Interest Group */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <motion.div variants={itemVariants} className="relative group">
                                <label className="absolute -top-3 left-4 px-2 text-xs font-bold text-white/40 uppercase tracking-widest bg-[#050507] transition-colors group-focus-within:text-[#f7986f] z-10">
                                    Phone Number
                                </label>
                                <input
                                    type="tel"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    className="w-full bg-transparent border border-white/20 rounded-2xl px-6 py-4 text-white placeholder-white/20 outline-none transition-all duration-300 focus:border-[#f7986f]/50 focus:bg-white/[0.05]"
                                    placeholder="+91 9000000000"
                                    required
                                />
                            </motion.div>

                            <motion.div variants={itemVariants} className="relative group">
                                <label className="absolute -top-3 left-4 px-2 text-xs font-bold text-white/40 uppercase tracking-widest bg-[#050507] transition-colors group-focus-within:text-pink-400 z-10">
                                    Interest
                                </label>
                                <input
                                    type="text"
                                    name="interest"
                                    value={formData.interest}
                                    onChange={handleChange}
                                    className="w-full bg-transparent border border-white/20 rounded-2xl px-6 py-4 text-white placeholder-white/20 outline-none transition-all duration-300 focus:border-pink-500/50 focus:bg-white/[0.05]"
                                    placeholder="e.g. Website Design, Web App"
                                    required
                                />
                            </motion.div>
                        </div>

                        {/* Message */}
                        <motion.div variants={itemVariants} className="relative group">
                            <label className="absolute -top-3 left-4 px-2 text-xs font-bold text-white/40 uppercase tracking-widest bg-[#050507] transition-colors group-focus-within:text-purple-400 z-10">
                                Message
                            </label>
                            <textarea
                                rows="5"
                                name="message"
                                value={formData.message}
                                onChange={handleChange}
                                className="w-full bg-transparent border border-white/20 rounded-2xl px-6 py-4 text-white placeholder-white/20 outline-none transition-all duration-300 focus:border-purple-500/50 focus:bg-white/[0.05] resize-none"
                                placeholder="Tell me about your project..."
                                required
                            />
                        </motion.div>

                        {/* Submit Button (User asked for "Send Inquiry") */}
                        <motion.div variants={itemVariants} className="pt-4 flex justify-center">
                            <button
                                type="submit"
                                className="group relative w-full md:w-auto overflow-hidden rounded-full bg-transparent border border-white/20 px-12 py-5 transition-all duration-500 hover:border-transparent hover:shadow-[0_0_40px_rgba(168,85,247,0.4)]"
                            >
                                {/* Hover Gradient Sweep */}
                                <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-out" />

                                <span className="relative z-10 font-bold text-white tracking-[0.2em] uppercase text-sm">
                                    Send Inquiry
                                </span>
                            </button>
                        </motion.div>

                    </form>
                </motion.div>

            </div>
        </section>
    );
}
