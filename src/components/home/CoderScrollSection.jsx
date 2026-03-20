import React, { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const SLIDES = [
    {
        headline: 'THE LOGIC OF CODE',
        subtext: 'ALGORITHMIC FOUNDATIONS / NEURAL PATTERNS',
    },
    {
        headline: 'ARCHITECT OF SYSTEMS',
        subtext: 'COMPLEX DATA STRUCTURES / SYSTEM DESIGN',
    },
    {
        headline: 'JOURNEY THROUGH SOURCE',
        subtext: 'IMMERSIVE REPOSITORIES / WEBGL',
    }
];

// --- Canvas Animations ---

class CanvasAnimator {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.width = canvas.width = window.innerWidth;
        this.height = canvas.height = window.innerHeight;
        this.slideIndex = 0;
        this.rafId = null;
        
        // Visual states
        this.particles = [];
        this.networkNodes = [];
        this.bridgeBlocks = [];
        
        this.initVisuals();
        
        window.addEventListener('resize', this.handleResize);
    }
    
    handleResize = () => {
        this.width = this.canvas.width = window.innerWidth;
        this.height = this.canvas.height = window.innerHeight;
        this.initVisuals();
    }
    
    initVisuals() {
        // Slide 0: Code Vertices (Matrix Rain simplified)
        this.particles = Array.from({ length: 100 }, () => ({
            x: Math.random() * this.width,
            y: Math.random() * this.height,
            size: Math.random() * 2 + 1,
            speedY: Math.random() * 2 + 0.5,
            chars: '01',
            char: '0'
        }));
        
        // Slide 1: Network Node Graph
        this.networkNodes = Array.from({ length: 50 }, () => ({
            x: Math.random() * this.width,
            y: Math.random() * this.height,
            vx: (Math.random() - 0.5) * 1,
            vy: (Math.random() - 0.5) * 1,
            radius: Math.random() * 3 + 1
        }));
        
        // Slide 2: Digital Bridge
        this.bridgeBlocks = Array.from({ length: 20 }, (v, i) => ({
            x: -200 - Math.random() * 500,
            y: this.height / 2 + (Math.random() - 0.5) * 200,
            width: Math.random() * 100 + 50,
            height: Math.random() * 20 + 5,
            speedX: Math.random() * 3 + 1
        }));
    }
    
    setSlide(index) {
        this.slideIndex = index;
    }
    
    start() {
        this.animate();
    }
    
    stop() {
        if (this.rafId) {
            cancelAnimationFrame(this.rafId);
        }
        window.removeEventListener('resize', this.handleResize);
    }
    
    animate = () => {
        // Subtle tail effect
        this.ctx.fillStyle = 'rgba(5, 5, 7, 0.2)'; // Use the premium background color
        this.ctx.fillRect(0, 0, this.width, this.height);
        
        // Use premium cyan instead of green
        this.ctx.fillStyle = '#00f0ff';
        this.ctx.strokeStyle = '#00f0ff';
        
        if (this.slideIndex < 0.5) {
            // Slide 0: Vertices
            this.particles.forEach(p => {
                p.y += p.speedY;
                if (Math.random() < 0.05) p.char = p.chars[Math.floor(Math.random() * p.chars.length)];
                if (p.y > this.height) {
                    p.y = 0;
                    p.x = Math.random() * this.width;
                }
                this.ctx.font = `${p.size * 10}px monospace`;
                this.ctx.fillText(p.char, p.x, p.y);
            });
        } else if (this.slideIndex < 1.5) {
            // Slide 1: Network
            this.networkNodes.forEach(node => {
                node.x += node.vx;
                node.y += node.vy;
                
                if (node.x < 0 || node.x > this.width) node.vx *= -1;
                if (node.y < 0 || node.y > this.height) node.vy *= -1;
                
                this.ctx.beginPath();
                this.ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
                this.ctx.fill();
                
                this.networkNodes.forEach(other => {
                    const dx = node.x - other.x;
                    const dy = node.y - other.y;
                    const dist = Math.sqrt(dx * dx + dy * dy);
                    if (dist < 150) {
                        this.ctx.beginPath();
                        this.ctx.moveTo(node.x, node.y);
                        this.ctx.lineTo(other.x, other.y);
                        this.ctx.lineWidth = 1 - dist / 150;
                        this.ctx.stroke();
                    }
                });
            });
        } else {
            // Slide 2: Bridge
            this.bridgeBlocks.forEach(block => {
                block.x += block.speedX;
                if (block.x > this.width) {
                    block.x = -block.width;
                    block.y = this.height / 2 + (Math.random() - 0.5) * 200;
                }
                this.ctx.fillRect(block.x, block.y, block.width, block.height);
            });
        }
        
        this.rafId = requestAnimationFrame(this.animate);
    }
}

export default function CoderScrollSection() {
    const scrollWrapRef = useRef(null);
    const canvasRef = useRef(null);
    const slideRefs = [useRef(null), useRef(null), useRef(null)];
    const animatorRef = useRef(null);

    useEffect(() => {
        if (!canvasRef.current) return;
        
        const animator = new CanvasAnimator(canvasRef.current);
        animatorRef.current = animator;
        animator.start();

        const ctx = gsap.context(() => {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: scrollWrapRef.current,
                    start: 'top top',
                    end: 'bottom bottom',
                    scrub: 1.5, // Smooth scrubbing
                },
                onUpdate: () => {
                   if(animatorRef.current) {
                        animatorRef.current.setSlide(tl.progress() * 3);
                   }
                }
            });

            slideRefs.forEach((ref, i) => {
                if (!ref.current) return;
                
                const headline = ref.current.querySelector('.coder-headline');
                const subtext = ref.current.querySelector('.coder-subtext');
                
                const fadeTime = 0.3; 
                const isFirst = i === 0;
                const isLast = i === slideRefs.length - 1;

                if (isFirst) {
                    // First slide fades out dramatically towards viewer (Netflix style)
                    tl.to(
                        headline,
                        { opacity: 0, scale: 8, filter: 'blur(30px)', duration: fadeTime, ease: 'power3.in' },
                        i + 1 - fadeTime
                    ).to(
                        subtext,
                        { opacity: 0, scale: 3, duration: fadeTime, ease: 'power3.in' },
                        i + 1 - fadeTime
                    );
                } else if (isLast) {
                    // Last slide fades in
                    tl.fromTo(
                        headline,
                        { opacity: 0, scale: 0.2, filter: 'blur(20px)' },
                        { opacity: 1, scale: 1, filter: 'blur(0px)', duration: fadeTime, ease: 'power2.out' },
                        i
                    ).fromTo(
                        subtext,
                        { opacity: 0, scale: 0.5, y: 20 },
                        { opacity: 1, scale: 1, y: 0, duration: fadeTime, ease: 'power2.out' },
                        i
                    );
                } else {
                    // Middle slide fades in from small, then out to huge
                    tl
                        .fromTo(
                            headline,
                            { opacity: 0, scale: 0.2, filter: 'blur(20px)' },
                            { opacity: 1, scale: 1, filter: 'blur(0px)', duration: fadeTime, ease: 'power2.out' },
                            i
                        )
                        .fromTo(
                            subtext,
                            { opacity: 0, scale: 0.5, y: 20 },
                            { opacity: 1, scale: 1, y: 0, duration: fadeTime, ease: 'power2.out' },
                            i
                        )
                        .to(
                            headline,
                            { opacity: 0, scale: 8, filter: 'blur(30px)', duration: fadeTime, ease: 'power3.in' },
                            i + 1 - fadeTime
                        )
                        .to(
                            subtext,
                            { opacity: 0, scale: 3, duration: fadeTime, ease: 'power3.in' },
                            i + 1 - fadeTime
                        );
                }
            });
            
            // Subtle UI parallax/fade on scroll
            gsap.to('.ui-element', {
                opacity: 0.3,
                y: 10,
                scrollTrigger: {
                    trigger: scrollWrapRef.current,
                    start: 'top top',
                    end: 'bottom bottom',
                    scrub: true
                }
            });

        }, scrollWrapRef);

        return () => {
            ctx.revert();
            if(animatorRef.current) animatorRef.current.stop();
        };
    }, []);

    return (
        <div
            ref={scrollWrapRef}
            className="relative w-full bg-[#050507]" // Deepest space black
            style={{ height: `${SLIDES.length * 100}vh` }}
        >
            <div className="sticky top-0 w-full h-screen overflow-hidden text-white">
                {/* Premium Canvas Background */}
                <canvas 
                    ref={canvasRef}
                    className="absolute inset-0 z-0 w-full h-full"
                />
                
                {/* Refined Vignette & Noise Textures for depth */}
                <div className="absolute inset-0 z-0 pointer-events-none bg-gradient-to-t from-[#050507] via-transparent to-[#050507] opacity-90" />
                <div className="absolute inset-0 z-0 pointer-events-none bg-radial-gradient from-transparent to-[#050507] opacity-80" style={{ background: 'radial-gradient(circle, transparent 10%, #050507 100%)' }} />
                <div className="absolute inset-0 z-0 pointer-events-none opacity-[0.03]" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }}></div>

                {/* Cyber-Premium Header */}
                <header className="ui-element absolute top-0 left-0 w-full px-8 md:px-12 py-8 flex justify-between items-center z-50 mix-blend-difference text-white/80">
                    <div className="text-xs tracking-[0.3em] font-mono font-bold flex items-center gap-3">
                        <div className="w-2 h-2 rounded-full bg-[#00f0ff] animate-pulse shadow-[0_0_10px_#00f0ff]"></div>
                        CYBER_VISION //
                    </div>
                    <nav className="font-mono flex gap-12 text-[10px] tracking-[0.2em] uppercase hidden md:flex">
                        <Link to="/" className="hover:text-[#00f0ff] transition-colors duration-300">Home</Link>
                        <span className="opacity-50 hover:text-[#00f0ff] hover:opacity-100 cursor-pointer transition-colors duration-300">Docs</span>
                        <span className="opacity-50 hover:text-[#00f0ff] hover:opacity-100 cursor-pointer transition-colors duration-300">Metrics</span>
                    </nav>
                </header>

                {/* Cinematic Slides */}
                <div className="absolute inset-0 z-10 flex items-center px-8 md:px-16 lg:px-24 pointer-events-none">
                    {SLIDES.map((s, i) => (
                        <div
                            key={i}
                            ref={slideRefs[i]}
                            className="absolute inset-0 flex flex-col justify-center px-8 md:px-24 w-full"
                            style={{ opacity: i === 0 ? 1 : 0, isolation: 'isolate' }}
                        >
                            <div className="w-full flex justify-center text-center">
                                {/* Premium gradient text for the Netflix scale-up headline */}
                                <h1 className="coder-headline text-[10vw] md:text-[8vw] lg:text-[7vw] font-black leading-[1.1] tracking-tighter"
                                    style={{ 
                                        WebkitTextFillColor: 'transparent',
                                        WebkitBackgroundClip: 'text',
                                        backgroundImage: 'linear-gradient(to right, #ffffff, #a0a0a0)',
                                        textShadow: '0 20px 50px rgba(0, 240, 255, 0.15)'
                                    }}>
                                    {s.headline}
                                </h1>
                            </div>
                            
                            <div className="absolute bottom-1/3 left-1/2 -translate-x-1/2 md:translate-x-0 md:left-auto md:right-24 md:bottom-1/4">
                                {/* Glassmorphism tech badge */}
                                <div className="coder-subtext font-mono text-[#00f0ff] text-xs md:text-sm tracking-[0.4em] uppercase py-3 px-6 
                                              border border-[#00f0ff]/20 bg-[#00f0ff]/5 backdrop-blur-md rounded-sm
                                              shadow-[0_0_30px_rgba(0,240,255,0.1)] flex items-center gap-3">
                                    <span className="w-1.5 h-1.5 bg-[#b53cff] block rounded-full" />
                                    {s.subtext}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Premium Footer */}
                <footer className="ui-element absolute bottom-0 left-0 w-full px-8 md:px-12 py-10 flex justify-between items-end z-50 font-mono text-white/40 text-[10px] tracking-[0.2em] uppercase">
                    <div className="hidden md:flex flex-col gap-2 border-l border-white/10 pl-4">
                        <span className="hover:text-white transition-colors">SYS.ARCHITECTURE_v2.4</span>
                        <span className="hover:text-white transition-colors">QUANTUM.RENDERING</span>
                        <span className="hover:text-white transition-colors">GLOBAL.NETWORK: STABLE</span>
                    </div>
                    
                    <div className="flex flex-col items-center gap-6 animate-pulse opacity-80 mx-auto md:mx-0">
                        <span className="transform rotate-90 origin-right translate-x-3 mb-6 tracking-[0.4em] text-[#00f0ff]">//DESCEND</span>
                        <div className="w-[1px] h-12 bg-gradient-to-b from-[#00f0ff] to-transparent"></div>
                    </div>
                </footer>
            </div>
        </div>
    );
}
