import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const galleryData = [
    { id: 1, titleTop: 'CONFIDENCE', titleBottom: 'CHARISMA', leftTitle: 'CHARM', leftPhrase: 'Sharp wit, warm smile a magnetic presence. He walks in, and the room seems to pause, by his quiet strength.', rightTitle: 'Presence', rightPhrase: 'Striking confidence, captivating charm, and elegance in every glance. A timeless blend of poise and presence, effortlessly charismatic.', img: 'https://moussamamadou.github.io/flip-plugin-horizontal-scroll/images/photo-9.jpg' },
    { id: 2, titleTop: 'WISDOM', titleBottom: 'INTELLECT', leftTitle: 'BRILLIANCE', leftPhrase: 'Quick mind, deep thoughts, a scholarly presence. His ideas illuminate the room, guided by penetrating insight.', rightTitle: 'knowledge', rightPhrase: 'Deep understanding, thoughtful insights, and clarity in every word. A masterful blend of experience and intuition, naturally enlightening.', img: 'https://moussamamadou.github.io/flip-plugin-horizontal-scroll/images/photo-6.jpg' },
    { id: 3, titleTop: 'KINDNESS', titleBottom: 'GENEROSITY', leftTitle: 'Giving', leftPhrase: 'Open heart, helping hands, a benevolent force. His presence brings comfort, marked by selfless grace.', rightTitle: 'Compassion', rightPhrase: 'Gentle spirit, nurturing soul, and warmth in every action. A beautiful harmony of empathy and understanding, naturally caring.', img: 'https://moussamamadou.github.io/flip-plugin-horizontal-scroll/images/photo-8.jpg' },
    { id: 4, titleTop: 'CREATIVITY', titleBottom: 'ARTISTRY', leftTitle: 'Expression', leftPhrase: 'Fluid style, bold vision, a creative soul. He transforms the ordinary, through his unique perspective.', rightTitle: 'Innovation', rightPhrase: 'Boundless imagination, artistic flair, and vision in every creation. A stunning fusion of originality and skill, naturally inspiring.', img: 'https://moussamamadou.github.io/flip-plugin-horizontal-scroll/images/photo-12.jpg' },
    { id: 5, titleTop: 'LEADERSHIP', titleBottom: 'INFLUENCE', leftTitle: 'Impact', leftPhrase: 'Strong presence, clear purpose, a guiding light. He shapes the path forward, through determined leadership.', rightTitle: 'Guidance', rightPhrase: 'Natural authority, inspiring presence, and direction in every decision. A powerful combination of vision and influence, naturally commanding', img: 'https://moussamamadou.github.io/flip-plugin-horizontal-scroll/images/photo-5.jpg' },
    { id: 6, titleTop: 'GRACE', titleBottom: 'ELEGANCE', leftTitle: 'SOPHISTICATION', leftPhrase: 'Smooth demeanor, cultured taste, a refined presence. He elevates any setting, with natural elegance.', rightTitle: 'POLISH', rightPhrase: 'Refined movement, sophisticated manner, and style in every gesture. A perfect balance of poise and dignity, naturally flowing.', img: 'https://moussamamadou.github.io/flip-plugin-horizontal-scroll/images/photo-10.jpg' },
    { id: 7, titleTop: 'PASSION', titleBottom: 'INTENSITY', leftTitle: 'Drive', leftPhrase: 'Fierce determination, endless energy, a dynamic force. He ignites inspiration, through passionate pursuit.', rightTitle: 'Enthusiasm', rightPhrase: 'Burning drive, intense focus, and fire in every pursuit. An explosive blend of energy and dedication, naturally motivating.', img: 'https://moussamamadou.github.io/flip-plugin-horizontal-scroll/images/photo-4.jpg' }
];

export default function TestimonialSection() {
    const [selectedId, setSelectedId] = useState(null);

    // Lock body scroll when modal is open to ensure Lenis doesn't keep scrolling underneath
    useEffect(() => {
        if (selectedId !== null) {
            document.documentElement.style.overflow = 'hidden';
            return () => { document.documentElement.style.overflow = ''; };
        }
    }, [selectedId]);

    const selectedItem = galleryData.find(i => i.id === selectedId);

    return (
        <section className="relative w-full py-24 bg-white text-black overflow-hidden flex flex-col justify-center">

            {/* Header / Instructions */}
            <div className="container mx-auto px-6 md:px-12 mb-12 text-center">
                <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter mix-blend-difference mb-4">Values & Principles</h2>
                <p className="text-black/50 text-sm tracking-widest uppercase font-mono">Swipe horizontally & click to explore</p>
            </div>

            {/* Horizontal Scroll Gallery */}
            <div
                className="flex w-full overflow-x-auto overflow-y-hidden snap-x snap-mandatory gap-6 md:gap-12 px-[10vw] hide-scrollbars py-8"
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                data-lenis-prevent="true"
            >
                {galleryData.map((item, idx) => (
                    <motion.div
                        key={item.id}
                        layoutId={`card-container-${item.id}`}
                        onClick={() => setSelectedId(item.id)}
                        className={`flex-shrink-0 w-[75vw] md:w-[35vw] aspect-[4/5] md:aspect-square snap-center cursor-pointer relative ${idx % 2 === 0 ? 'md:-translate-y-8' : 'md:translate-y-8'}`}
                        whileHover={{ scale: 1.02 }}
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    >
                        <motion.img
                            layoutId={`image-${item.id}`}
                            src={item.img}
                            alt={item.titleTop}
                            className="w-full h-full object-cover filter grayscale hover:grayscale-0 transition-all duration-700"
                        />
                    </motion.div>
                ))}
            </div>

            {/* Full Screen Modal with Framer Motion Layout Animation */}
            <AnimatePresence>
                {selectedId && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] flex items-center justify-center bg-white"
                    >
                        {/* Background Click to Close */}
                        <div
                            className="absolute inset-0 cursor-crosshair z-0"
                            onClick={() => setSelectedId(null)}
                        />

                        {/* Close button for strictly mobile where clicking outside is hard */}
                        <button
                            onClick={() => setSelectedId(null)}
                            className="absolute top-6 right-6 md:top-10 md:right-10 z-[110] w-12 h-12 bg-black text-white rounded-full flex items-center justify-center hover:scale-110 transition-transform cursor-pointer shadow-xl border border-white/20"
                        >
                            ✕
                        </button>

                        <div className="relative w-[85vw] md:w-[50vw] aspect-[4/5] md:aspect-[16/9] z-10 flex items-center justify-center pointer-events-none">

                            <motion.div
                                layoutId={`card-container-${selectedItem.id}`}
                                className="w-full h-full relative"
                            >
                                <motion.img
                                    layoutId={`image-${selectedItem.id}`}
                                    src={selectedItem.img}
                                    alt={selectedItem.titleTop}
                                    className="w-full h-full object-cover pointer-events-auto filter grayscale-0"
                                />

                                {/* Big Title TOP */}
                                <motion.div
                                    initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 30, opacity: 0 }} transition={{ delay: 0.2, duration: 0.6 }}
                                    className="absolute -top-6 md:-top-12 left-0 md:-left-12 w-full mix-blend-difference invert filter"
                                >
                                    <h2 className="text-[15vw] md:text-[8vw] font-black leading-none tracking-tighter text-black">{selectedItem.titleTop}</h2>
                                </motion.div>

                                {/* Big Title BOTTOM */}
                                <motion.div
                                    initial={{ y: -30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -30, opacity: 0 }} transition={{ delay: 0.3, duration: 0.6 }}
                                    className="absolute -bottom-6 md:-bottom-12 right-0 md:-right-12 w-full text-right mix-blend-difference invert filter"
                                >
                                    <h2 className="text-[15vw] md:text-[8vw] font-black leading-none tracking-tighter text-black">{selectedItem.titleBottom}</h2>
                                </motion.div>

                                {/* Left Text Description */}
                                <motion.div
                                    initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: -20, opacity: 0 }} transition={{ delay: 0.4 }}
                                    className="absolute top-1/2 -translate-y-1/2 left-4 md:-left-[25vw] md:w-[20vw] bg-white/90 md:bg-transparent p-4 md:p-0 rounded-lg md:rounded-none shadow-xl md:shadow-none backdrop-blur-md md:backdrop-blur-none text-black pointer-events-none hidden md:block"
                                >
                                    <h3 className="text-sm md:text-xl font-bold uppercase mb-2 tracking-widest">{selectedItem.leftTitle}</h3>
                                    <p className="text-xs md:text-sm leading-relaxed">{selectedItem.leftPhrase}</p>
                                </motion.div>

                                {/* Right Text Description */}
                                <motion.div
                                    initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: 20, opacity: 0 }} transition={{ delay: 0.5 }}
                                    className="absolute top-3/4 md:top-1/2 -translate-y-1/2 right-4 md:-right-[25vw] md:w-[20vw] bg-white/90 md:bg-transparent p-4 md:p-0 rounded-lg md:rounded-none shadow-xl md:shadow-none backdrop-blur-md md:backdrop-blur-none text-black md:text-right flex flex-col md:items-end pointer-events-none hidden md:block"
                                >
                                    <h3 className="text-sm md:text-xl font-bold uppercase mb-2 tracking-widest">{selectedItem.rightTitle}</h3>
                                    <p className="text-xs md:text-sm leading-relaxed">{selectedItem.rightPhrase}</p>
                                </motion.div>

                                {/* Mobile Fallback Text Descriptions (under the image) */}
                                <motion.div
                                    initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 20, opacity: 0 }} transition={{ delay: 0.4 }}
                                    className="absolute -bottom-[20vh] left-0 right-0 p-4 bg-white/95 rounded-xl shadow-2xl backdrop-blur-xl md:hidden pointer-events-none"
                                >
                                    <div className="mb-4">
                                        <h3 className="text-xs font-bold uppercase mb-1 tracking-widest text-[#d8b082]">{selectedItem.leftTitle}</h3>
                                        <p className="text-[11px] leading-snug font-medium text-black/80">{selectedItem.leftPhrase}</p>
                                    </div>
                                    <div>
                                        <h3 className="text-xs font-bold uppercase mb-1 tracking-widest text-[#d8b082]">{selectedItem.rightTitle}</h3>
                                        <p className="text-[11px] leading-snug font-medium text-black/80">{selectedItem.rightPhrase}</p>
                                    </div>
                                </motion.div>

                            </motion.div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <style dangerouslySetInnerHTML={{
                __html: `
                .hide-scrollbars::-webkit-scrollbar { display: none; }
                .hide-scrollbars { -ms-overflow-style: none; scrollbar-width: none; }
            `}} />
        </section>
    );
}
