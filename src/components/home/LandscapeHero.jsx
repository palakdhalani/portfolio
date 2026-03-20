import React, { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import palakWebp from '../../assets/videos/palak.webp';

gsap.registerPlugin(ScrollTrigger);

// ── Story slides ──────────────────────────────────────────────────────────────
const SLIDES = [
    {
        title: "Hi, I'm Palak",
        subtitle: '',
    },
    {
        label: '01 / Role', title: 'Full Stack\nDeveloper',
        subtitle: 'Building Modern Web Experiences',
    },
    {
        title: 'Shopify\nDeveloper',
        subtitle: 'Crafting Powerful E-commerce Stores',
    },
    {
        title: 'Freelancer',
        subtitle: 'Turning Ideas Into Real Websites',
    },
];

// ── Component ────────────────────────────────────────────────────────────────
export default function LandscapeHero() {
    const scrollWrapRef = useRef(null);
    const stickyRef = useRef(null);
    const canvasRef = useRef(null);
    const imgFallbackRef = useRef(null);

    // Slide refs
    const slide0 = useRef(null);
    const slide1 = useRef(null);
    const slide2 = useRef(null);
    const slide3 = useRef(null);
    const slideRefs = [slide0, slide1, slide2, slide3];

    const [loadProgress, setLoadProgress] = useState(0); // 0–100
    const [ready, setReady] = useState(false);           // all frames cached

    useEffect(() => {
        let cancelled = false;
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx2d = canvas.getContext('2d', { alpha: false });

        // ── Try ImageDecoder (Chrome/Edge 94+) ───────────────────────────────
        // Strategy:
        //   1. Decode ALL frames into ImageBitmaps → frameCache[]
        //   2. Only THEN set up GSAP/ScrollTrigger scrubbing
        //   3. On each scroll tick, simply drawImage from cache — zero decode cost

        if (typeof ImageDecoder === 'undefined') {
            // Browser doesn't support ImageDecoder → show static fallback image
            if (imgFallbackRef.current) imgFallbackRef.current.style.display = 'block';
            canvas.style.display = 'none';
            setReady(true);
            return;
        }

        async function buildFrameCache() {
            try {
                const res = await fetch(palakWebp);
                const buffer = await res.arrayBuffer();
                if (cancelled) return;

                const decoder = new ImageDecoder({
                    data: new Uint8Array(buffer),
                    type: 'image/webp',
                });
                await decoder.tracks.ready;
                if (cancelled) return;

                const track = decoder.tracks.selectedTrack;
                // Wait for decoder to report total frames
                await decoder.completed.catch(() => { });
                if (cancelled) return;

                const frameCount = Math.max(track.frameCount || 1, 2);
                const frameCache = new Array(frameCount).fill(null);
                let firstFrameSet = false;

                // Decode every frame up-front, report progress
                for (let i = 0; i < frameCount; i++) {
                    if (cancelled) return;
                    try {
                        const result = await decoder.decode({ frameIndex: i });
                        const bitmap = await createImageBitmap(result.image);
                        frameCache[i] = bitmap;

                        // Set canvas dimensions from first frame
                        if (!firstFrameSet) {
                            canvas.width = result.image.displayWidth;
                            canvas.height = result.image.displayHeight;
                            ctx2d.drawImage(bitmap, 0, 0, canvas.width, canvas.height);
                            canvas.style.display = 'block';
                            if (imgFallbackRef.current) imgFallbackRef.current.style.display = 'none';
                            firstFrameSet = true;
                        }

                        setLoadProgress(Math.round(((i + 1) / frameCount) * 100));
                    } catch (_) { /* skip bad frame */ }
                }

                if (cancelled) return;

                // ── All frames ready — wire up scroll scrubbing ──────────────
                setReady(true);

                const proxy = { frame: 0 };
                let pendingRaf = false;

                function drawFrame(idx) {
                    const bmp = frameCache[Math.round(idx)];
                    if (!bmp || pendingRaf) return;
                    pendingRaf = true;
                    requestAnimationFrame(() => {
                        if (!cancelled && canvas && ctx2d) {
                            ctx2d.drawImage(bmp, 0, 0, canvas.width, canvas.height);
                        }
                        pendingRaf = false;
                    });
                }

                // Draw first frame immediately
                drawFrame(0);

                // GSAP scrub: maps scroll progress (0→1) to frame index (0→frameCount-1)
                gsap.to(proxy, {
                    frame: frameCount - 1,
                    ease: 'none',
                    scrollTrigger: {
                        trigger: scrollWrapRef.current,
                        start: 'top top',
                        end: 'bottom bottom',
                        scrub: 0.8,       // slight inertia so it feels smooth
                    },
                    onUpdate() {
                        drawFrame(proxy.frame);
                    },
                });

                ScrollTrigger.refresh();

            } catch (err) {
                console.warn('[Hero] ImageDecoder failed, using static image:', err);
                if (imgFallbackRef.current) imgFallbackRef.current.style.display = 'block';
                canvas.style.display = 'none';
                setReady(true);
            }
        }

        buildFrameCache();

        return () => { cancelled = true; };
    }, []);

    // ── GSAP text + overlay animations (run after frames ready) ───────────────
    useEffect(() => {
        if (!ready) return;
        const ctx = gsap.context(() => {
            setupGsapTextAnimations(scrollWrapRef, slideRefs);
        }, scrollWrapRef);
        return () => ctx.revert();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [ready]);

    return (
        <div
            ref={scrollWrapRef}
            className="relative w-full bg-black"
            style={{ height: `${(SLIDES.length + 1) * 100}vh` }}
        >
            {/* INNER sticky viewport */}
            <div ref={stickyRef} className="sticky top-0 w-full h-screen overflow-hidden">

                {/* ── Background canvas (frame scrubbing) ── */}
                <div className="absolute inset-0 z-0 bg-black overflow-hidden">
                    <canvas
                        ref={canvasRef}
                        style={{ display: 'none' }}
                        className="absolute inset-0 w-full h-full object-cover object-center pointer-events-none select-none"
                    />
                    {/* Static fallback for unsupported browsers */}
                    <img
                        ref={imgFallbackRef}
                        src={palakWebp}
                        alt=""
                        style={{ display: 'none' }}
                        className="absolute inset-0 w-full h-full object-cover object-center pointer-events-none select-none"
                    />
                    {/* Dark overlay */}
                    <div className="hero-overlay absolute inset-0 bg-black" style={{ opacity: 0.35 }} />
                </div>

                {/* ── Loading bar (shown while frames decode) ── */}
                {!ready && (
                    <div className="absolute inset-0 z-30 flex flex-col items-center justify-center bg-black/80 backdrop-blur-sm">
                        <div className="w-48 h-[2px] bg-white/10 rounded-full overflow-hidden">
                            <div
                                className="h-full bg-white rounded-full transition-all duration-200"
                                style={{ width: `${loadProgress}%` }}
                            />
                        </div>
                        <span className="mt-4 text-[10px] uppercase tracking-[0.3em] text-white/40">
                            Loading — {loadProgress}%
                        </span>
                    </div>
                )}

                {/* ── Slide texts ── */}
                <div className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none">
                    {SLIDES.map((s, i) => (
                        <div
                            key={i}
                            ref={slideRefs[i]}
                            className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center"
                            style={{ opacity: i === 0 ? 1 : 0 }}
                        >
                            <h1
                                className="text-[13vw] sm:text-[10vw] md:text-[8vw] font-black text-white leading-[1.1] tracking-normal whitespace-pre-line"
                                style={{
                                    textShadow: '0 8px 48px rgba(0,0,0,0.55)',
                                    wordSpacing: '0.15em',
                                }}
                            >
                                {s.title}
                            </h1>

                            <div className="mt-6 h-[2px] w-16 rounded-full bg-white/60" />

                            {s.subtitle && (
                                <p className="mt-4 text-white/70 text-sm md:text-base tracking-[0.2em] uppercase font-light">
                                    {s.subtitle}
                                </p>
                            )}
                        </div>
                    ))}
                </div>

                {/* ── Scroll progress dots ── */}
                <div className="absolute right-8 top-1/2 -translate-y-1/2 z-20 hidden md:flex flex-col gap-3">
                    {SLIDES.map((_, i) => (
                        <div
                            key={i}
                            className="w-1.5 h-1.5 rounded-full bg-white/40"
                        />
                    ))}
                </div>

                {/* ── Scroll indicator ── */}
                <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 opacity-40 pointer-events-none">
                    <span className="text-[9px] uppercase tracking-[0.35em] text-white">Scroll</span>
                    <svg width="2" height="40" viewBox="0 0 2 40" fill="none">
                        <defs>
                            <linearGradient id="sg" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="0%" stopColor="white" stopOpacity="1" />
                                <stop offset="100%" stopColor="white" stopOpacity="0" />
                            </linearGradient>
                        </defs>
                        <line x1="1" y1="0" x2="1" y2="40" stroke="url(#sg)" strokeWidth="1.5" />
                    </svg>
                </div>

            </div>{/* /sticky */}
        </div>
    );
}

// ── Text animation helper (called after frames ready) ─────────────────────────
function setupGsapTextAnimations(scrollWrapRef, slideRefs) {
    if (!scrollWrapRef?.current) return;

    const tl = gsap.timeline({
        scrollTrigger: {
            trigger: scrollWrapRef.current,
            start: 'top top',
            end: 'bottom bottom',
            scrub: 0.5,
        },
    });

    slideRefs.forEach((ref, i) => {
        if (!ref.current) return;
        const fadeTime = 0.25;
        const isFirst = i === 0;
        const isLast = i === slideRefs.length - 1;

        if (isFirst) {
            tl.to(
                ref.current,
                { opacity: 0, y: -60, filter: 'blur(6px)', duration: fadeTime, ease: 'power2.in' },
                i + 1 - fadeTime
            );
        } else if (isLast) {
            tl.fromTo(
                ref.current,
                { opacity: 0, y: 70, filter: 'blur(8px)' },
                { opacity: 1, y: 0, filter: 'blur(0px)', duration: fadeTime, ease: 'power2.out' },
                i
            );
        } else {
            tl
                .fromTo(
                    ref.current,
                    { opacity: 0, y: 70, filter: 'blur(8px)' },
                    { opacity: 1, y: 0, filter: 'blur(0px)', duration: fadeTime, ease: 'power2.out' },
                    i
                )
                .to(
                    ref.current,
                    { opacity: 0, y: -60, filter: 'blur(6px)', duration: fadeTime, ease: 'power2.in' },
                    i + 1 - fadeTime
                );
        }
    });

    // Overlay darkens as you scroll
    gsap.fromTo(
        '.hero-overlay',
        { opacity: 0.35 },
        {
            opacity: 0.60,
            ease: 'none',
            scrollTrigger: {
                trigger: scrollWrapRef.current,
                start: 'top top',
                end: 'bottom bottom',
                scrub: true,
            },
        }
    );
}
