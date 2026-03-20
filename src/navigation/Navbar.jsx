import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import gsap from 'gsap';

// ── SVG Icons ─────────────────────────────────────────────
const HamburgerIcon = ({ isOpen }) => (
    <div className="relative w-8 h-6 flex flex-col justify-center items-center cursor-pointer overflow-hidden">
        <span
            className="absolute h-[2px] w-full bg-white transition-all duration-300 ease-out"
            style={{
                transform: isOpen ? 'rotate(45deg)' : 'translateY(-6px)',
                width: isOpen ? '100%' : '100%',
            }}
        />
        <span
            className="absolute h-[2px] w-full bg-white transition-all duration-300 ease-out"
            style={{
                opacity: isOpen ? 0 : 1,
                transform: isOpen ? 'translateX(20px)' : 'translateX(0)',
            }}
        />
        <span
            className="absolute h-[2px] bg-white transition-all duration-300 ease-out"
            style={{
                transform: isOpen ? 'rotate(-45deg)' : 'translateY(6px)',
                width: isOpen ? '100%' : '75%',
                right: '0',
            }}
        />
    </div>
);

const GithubIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
    </svg>
);
const InstagramIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
    </svg>
);
const LinkedInIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
);

// ── Full Screen Menu Overlay ─────────────────────────────────────────────
function FullScreenMenu({ isOpen, onClose }) {
    const navLinks = [
        { label: '01', title: 'Home', path: '/' },
        { label: '02', title: 'Work', path: '/portfolio' },
        { label: '03', title: 'Services', path: '/services' },
        { label: '04', title: 'About', path: '/about' },
        { label: '05', title: 'Contact', path: '/contact' },
    ];

    const overlayVariants = {
        closed: {
            clipPath: 'circle(0% at top right)',
            transition: { type: 'spring', damping: 40, stiffness: 400 }
        },
        open: {
            clipPath: 'circle(150% at top right)',
            transition: { type: 'spring', damping: 40, stiffness: 100, restDelta: 2 }
        }
    };

    const linkVariants = {
        closed: { y: '100%', opacity: 0, rotate: 5 },
        open: i => ({
            y: '0%', opacity: 1, rotate: 0,
            transition: {
                delay: 0.15 + (i * 0.08),
                duration: 0.6,
                ease: [0.33, 1, 0.68, 1]
            }
        })
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    className="fixed inset-0 z-[80] bg-[#111] overflow-hidden flex flex-col justify-center"
                    initial="closed"
                    animate="open"
                    exit="closed"
                    variants={overlayVariants}
                >
                    {/* Animated Grain Background / Texture effect */}
                    <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }} />

                    <div className="container mx-auto px-6 md:px-12 flex flex-col md:flex-row h-full pb-20 pt-32">
                        {/* Links section */}
                        <div className="w-full md:w-2/3 h-full flex flex-col justify-center relative z-10">
                            {navLinks.map((link, i) => (
                                <div key={i} className="overflow-hidden py-1 mb-2">
                                    <motion.div custom={i} variants={linkVariants}>
                                        <Link
                                            to={link.path}
                                            onClick={onClose}
                                            className="group flex items-baseline gap-4 w-fit"
                                        >
                                            <span className="text-sm md:text-base text-white/40 font-mono tracking-widest transition-colors group-hover:text-[#f7986f]">
                                                {link.label}
                                            </span>
                                            <span className="text-[10vw] md:text-[6vw] font-black text-white/70 group-hover:text-white uppercase tracking-tighter leading-[0.85] transition-all duration-400 group-hover:ml-4">
                                                {link.title}
                                            </span>
                                        </Link>
                                    </motion.div>
                                </div>
                            ))}
                        </div>

                        {/* Contact details / Info Section */}
                        <div className="w-full md:w-1/3 flex flex-col justify-end mt-12 md:mt-0 relative z-10 border-t border-white/10 md:border-none pt-8 md:pt-0">
                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.6, duration: 0.8 }}
                                className="mb-10"
                            >
                                <h4 className="text-[#f7986f] text-xs font-bold tracking-[0.2em] uppercase mb-4">Get in touch</h4>
                                <a href="mailto:palakdhalani17@gmail.com" className="text-xl md:text-2xl text-white hover:text-white/70 transition-colors font-light relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[1px] after:bg-white/30 after:hover:bg-white transition-all">
                                    palakdhalani17@gmail.com
                                </a>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.7, duration: 0.8 }}
                                className="mb-10"
                            >
                                <h4 className="text-[#f7986f] text-xs font-bold tracking-[0.2em] uppercase mb-4">Location</h4>
                                <p className="text-white/60 font-light">
                                    Gujarat, India<br />
                                    Available for remote work worldwide
                                </p>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.8, duration: 0.8 }}
                                className="flex gap-6 mt-4"
                            >
                                <a href="#" aria-label="GitHub" className="text-white/40 hover:text-white hover:-translate-y-1 transition-all"><GithubIcon /></a>
                                <a href="#" aria-label="Instagram" className="text-white/40 hover:text-white hover:-translate-y-1 transition-all"><InstagramIcon /></a>
                                <a href="#" aria-label="LinkedIn" className="text-white/40 hover:text-white hover:-translate-y-1 transition-all"><LinkedInIcon /></a>
                            </motion.div>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}

// ── Navbar ────────────────────────────────────────────────────────
export default function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const location = useLocation();

    // Close menu when route changes
    useEffect(() => {
        setIsMenuOpen(false);
    }, [location.pathname]);

    // Prevent body scroll when menu is open
    useEffect(() => {
        if (isMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => { document.body.style.overflow = 'unset'; };
    }, [isMenuOpen]);

    return (
        <>
            <FullScreenMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />

            <header
                className="fixed top-0 left-0 w-full z-[100] py-7 bg-transparent transition-all"
            >
                <div className="container mx-auto px-6 md:px-12 flex items-center justify-between">

                    {/* Logo */}
                    <Link
                        to="/"
                        onClick={() => setIsMenuOpen(false)}
                        className="text-2xl font-black tracking-tighter text-white hover:opacity-80 transition-all flex items-baseline relative z-[100]"
                    >
                        PALAK<span className="text-[#f7986f] text-3xl">.</span>
                    </Link>

                    {/* Hamburger Button (Desktop + Mobile) */}
                    <button
                        id="nav-menu-toggle"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className="p-2 z-[100] relative group flex gap-4 items-center"
                        aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                        aria-expanded={isMenuOpen}
                    >
                        <span className="hidden md:block uppercase tracking-[0.2em] text-xs font-bold text-white group-hover:text-[#f7986f] transition-colors">
                            {isMenuOpen ? 'Close' : 'Menu'}
                        </span>
                        <HamburgerIcon isOpen={isMenuOpen} />
                    </button>

                </div>
            </header>
        </>
    );
}
