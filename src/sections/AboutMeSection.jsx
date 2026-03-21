import React, { useRef, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import gsap from 'gsap';

// Assets
import silverBlob from '../assets/3d/silver_blob_3d.png';
import purpleFlower from '../assets/3d/purple_flower_3d.png';
import blueObject from '../assets/3d/blue_object_3d.png';
import redHeart from '../assets/3d/red_heart_3d.png';

export default function AboutMeSection() {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    // Parallax values for stickers
    const y1 = useTransform(scrollYProgress, [0, 1], [0, -200]);
    const y2 = useTransform(scrollYProgress, [0, 1], [0, -150]);
    const y3 = useTransform(scrollYProgress, [0, 1], [0, -250]);
    const y4 = useTransform(scrollYProgress, [0, 1], [0, -100]);

    useEffect(() => {
        // Subtle floating animation for stickers
        const stickers = containerRef.current.querySelectorAll('.sticker');
        stickers.forEach((sticker, i) => {
            gsap.to(sticker, {
                y: '+=20',
                rotation: i % 2 === 0 ? 5 : -5,
                duration: 2 + i,
                repeat: -1,
                yoyo: true,
                ease: "sine.inOut"
            });
        });

        // Mouse move parallax
        const handleMouseMove = (e) => {
            const { clientX, clientY } = e;
            const xPos = (clientX / window.innerWidth - 0.5) * 40;
            const yPos = (clientY / window.innerHeight - 0.5) * 40;

            gsap.to('.sticker-wrap', {
                x: xPos,
                y: yPos,
                duration: 1,
                ease: "power2.out",
                stagger: 0.02
            });
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    return (
        <section 
            ref={containerRef}
            className="relative min-h-screen bg-black flex flex-col items-center justify-center overflow-hidden py-32"
        >
            {/* 3D Stickers */}
            <motion.div style={{ y: y1 }} className="sticker-wrap absolute top-[10%] left-[10%] w-40 md:w-60 z-10 pointer-events-none">
                <img src={silverBlob} alt="" className="sticker w-full h-auto" />
            </motion.div>

            <motion.div style={{ y: y2 }} className="sticker-wrap absolute top-[15%] right-[5%] w-40 md:w-64 z-10 pointer-events-none">
                <img src={blueObject} alt="" className="sticker w-full h-auto" />
            </motion.div>

            <motion.div style={{ y: y3 }} className="sticker-wrap absolute bottom-[15%] left-[5%] w-32 md:w-56 z-10 pointer-events-none">
                <img src={redHeart} alt="" className="sticker w-full h-auto" />
            </motion.div>

            <motion.div style={{ y: y4 }} className="sticker-wrap absolute bottom-[10%] right-[10%] w-48 md:w-72 z-10 pointer-events-none">
                <img src={purpleFlower} alt="" className="sticker w-full h-auto" />
            </motion.div>

            {/* Content */}
            <div className="container mx-auto px-6 relative z-20 flex flex-col items-center">
                <motion.h2 
                    initial={{ opacity: 0, y: 100 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                    className="text-[12vw] md:text-[8vw] font-black text-white uppercase tracking-tighter leading-none mb-12"
                >
                    About Me
                </motion.h2>

                <div className="max-w-3xl text-center space-y-8">
                    <motion.p 
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: 0.2 }}
                        className="text-xl md:text-2xl text-white/80 font-medium leading-relaxed"
                    >
                        With six months of experience in design, I specialize in UI, web design, and user experience. 
                    </motion.p>
                    <motion.p 
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: 0.4 }}
                        className="text-xl md:text-2xl text-white/80 font-medium leading-relaxed"
                    >
                        I love collaborating with businesses that want to stand out and showcase their best side. 
                    </motion.p>
                    <motion.p 
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: 0.6 }}
                        className="text-xl md:text-2xl text-white/80 font-medium leading-relaxed font-bold"
                    >
                        Let's create something amazing together.
                    </motion.p>
                </div>

                {/* Contact Button */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: 0.8, ease: "backOut" }}
                    className="mt-20"
                >
                    <button className="group relative px-12 py-5 bg-transparent overflow-hidden rounded-full border border-white/20 hover:border-white transition-colors duration-500">
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 via-purple-600/20 to-pink-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        <span className="relative z-10 text-white font-bold tracking-[0.2em] uppercase text-sm">Contact Me</span>
                    </button>
                </motion.div>
            </div>
        </section>
    );
}
