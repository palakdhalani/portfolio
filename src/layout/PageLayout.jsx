import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocation } from 'react-router-dom';

export default function PageLayout({ children }) {
    const location = useLocation();

    const curtainVariants = {
        initial: { scaleY: 0 },
        animate: { scaleY: 0 },
        exit: { scaleY: 1 },
    };

    const contentVariants = {
        initial: { opacity: 0, y: 30 },
        animate: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: -30 },
    };

    return (
        <AnimatePresence mode="wait">
            <div key={location.pathname} className="relative">
                {/* The Curtain Overlay */}
                <motion.div
                    className="fixed inset-0 bg-[#080808] z-[9999] origin-bottom pointer-events-none"
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    variants={curtainVariants}
                    transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
                />
                <motion.div
                    className="fixed inset-0 bg-[#080808] z-[9999] origin-top pointer-events-none"
                    initial={{ scaleY: 1 }}
                    animate={{ scaleY: 0 }}
                    transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
                />

                <motion.div
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    variants={contentVariants}
                    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
                    className="min-h-screen"
                >
                    {children}
                </motion.div>
            </div>
        </AnimatePresence>
    );
}
