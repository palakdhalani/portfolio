import React, { useRef, useEffect } from 'react';
import SectionTitle from '../components/ui/SectionTitle';
import ParallaxImage from '../components/ui/ParallaxImage';
import gsap from 'gsap';
import AboutMeSection from '../sections/AboutMeSection';
import ProcessSection from '../sections/ProcessSection';
import MotionTrail from '../components/ui/MotionTrail';

// ── Team photos — Local imports ──
import palakImg from '../assets/Palak image.jpeg';
import panthImg from '../assets/Panth image.jpeg';

export default function About() {
    const containerRef = useRef(null);

    useEffect(() => {
        // Reveal team cards on scroll
        const ctx = gsap.context(() => {
            gsap.from('.team-card', {
                y: 100,
                opacity: 0,
                stagger: 0.1,
                duration: 1,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: '.team-grid',
                    start: 'top 80%',
                }
            });

            // Animate big numbers
            gsap.from('.stat-number', {
                textContent: 0,
                duration: 2,
                ease: 'power1.out',
                snap: { textContent: 1 },
                stagger: 0.2,
                scrollTrigger: {
                    trigger: '.stats-section',
                    start: 'top 80%',
                }
            });
        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <div ref={containerRef} className="w-full bg-background relative">
            <MotionTrail images={[
                '/trail-images/1.jpg', '/trail-images/2.jpg', '/trail-images/3.jpg',
                '/trail-images/4.jpg', '/trail-images/5.jpg', '/trail-images/6.jpg',
                '/trail-images/7.jpg', '/trail-images/8.jpg', '/trail-images/9.jpg',
                '/trail-images/10.jpg', '/trail-images/11.jpg', '/trail-images/12.jpg'
            ]} threshold={60} />

            <AboutMeSection />

            {/* Sticky Scroll Story Section */}
            <section className="py-32 relative border-t border-white/10">
                <div className="container mx-auto px-6 md:px-12">
                    <div className="flex flex-col lg:flex-row gap-20">

                        {/* Sticky Left Column */}
                        <div className="lg:w-1/3">
                            <div className="sticky top-40">
                                <h2 className="text-5xl font-bold mb-6">Our Philosophy</h2>
                                <p className="text-white/50 text-lg uppercase tracking-widest">Est. 2026</p>
                            </div>
                        </div>

                        {/* Scrolling Right Column */}
                        <div className="lg:w-2/3 space-y-32">
                            <div className="space-y-8 text-2xl font-light leading-relaxed text-white/80">
                                <p>Most agencies build websites. We build <span className="text-white font-medium">digital ecosystems</span> that breathe, react, and leave lasting impressions on users.</p>
                                <p>Based in New York, Palak Studio was founded when a motion designer and a systems engineer realized that the current web was too rigid.</p>
                            </div>

                            {/* Parallax Image Break */}
                            <div className="h-[60vh] w-full">
                                <ParallaxImage
                                    src="https://images.unsplash.com/photo-1497215728101-856f4ea42174?q=80&w=2000&auto=format&fit=crop"
                                    alt="Agency Office"
                                    speed={0.3}
                                />
                            </div>

                            <div className="space-y-8 text-2xl font-light leading-relaxed text-white/80">
                                <p>We don't use templates. We don't cut corners. Every line of code and every Bezier curve is mathematically calculated to ensure <span className="italic text-accent">perfection</span>.</p>
                            </div>
                        </div>

                    </div>
                </div>
            </section>

            {/* Process Section */}
            <ProcessSection />

            {/* Stats Section */}
            <section className="stats-section py-32 bg-black border-y border-white/5">
                <div className="container mx-auto px-6 md:px-12 grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
                    {[
                        { num: '42', label: 'Awards Won' },
                        { num: '150', label: 'Projects Completed' },
                        { num: '12', label: 'Creative Geniuses' },
                        { num: '99', label: 'Percent Client Satisfaction' },
                    ].map((stat, i) => (
                        <div key={i} className="flex flex-col items-center">
                            <div className="flex items-baseline">
                                <span className="stat-number text-6xl md:text-8xl font-black text-accent">{stat.num}</span>
                                {i === 3 && <span className="text-4xl text-accent">%</span>}
                            </div>
                            <span className="text-white/40 uppercase tracking-widest text-sm mt-4">{stat.label}</span>
                        </div>
                    ))}
                </div>
            </section>

            {/* Team Grid - 2 Members */}
            <section className="team-grid py-32 container mx-auto px-6 md:px-12">
                <div className="mb-24 flex justify-between items-end">
                    <SectionTitle>The Core Team</SectionTitle>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-20 max-w-4xl mx-auto">
                    {[
                        { name: 'Palak', role: 'Creative Director & Designer', img: palakImg },
                        { name: 'Panth', role: 'Lead Developer', img: panthImg },
                    ].map((member, i) => (
                        <div key={i} className="team-card group cursor-pointer">
                            <div className="w-full aspect-[3/4] mb-8 overflow-hidden rounded-xl relative">
                                <img
                                    src={member.img}
                                    alt={member.name}
                                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700 ease-out"
                                />
                                <div className="absolute inset-0 bg-black/40 group-hover:bg-transparent transition-colors duration-500" />
                            </div>
                            <h4 className="text-3xl font-bold mb-2 group-hover:text-accent transition-colors">{member.name}</h4>
                            <p className="text-white/40 uppercase tracking-widest text-sm">{member.role}</p>
                        </div>
                    ))}
                </div>
            </section>

        </div>
    );
}
