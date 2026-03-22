import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { Flip } from 'gsap/Flip';
import SplitType from 'split-type';
import Lenis from '@studio-freight/lenis';
import './TestimonialSection.css';

gsap.registerPlugin(Flip);

export default function TestimonialSection() {
    const sectionRef = useRef(null);

    useEffect(() => {
        if (!sectionRef.current) return;

        let lenisInstance;
        let rafId;

        const ctx = gsap.context(() => {
            const scrollWrapper = sectionRef.current.querySelector('[data-scroll="wrapper"]');
            const scrollContent = sectionRef.current.querySelector('[data-scroll="content"]');

            // Initialize smooth scrolling for horizontal
            lenisInstance = new Lenis({
                wrapper: scrollWrapper,
                content: scrollContent,
                orientation: 'horizontal',
                lerp: 0.05,
                wheelMultiplier: 0.85,
                smoothWheel: true,
                smoothTouch: true,
                touchMultiplier: 2,
            });

            function raf(time) {
                lenisInstance.raf(time);
                rafId = requestAnimationFrame(raf);
            }
            rafId = requestAnimationFrame(raf);

            const galleryImagesWrapper = sectionRef.current.querySelectorAll('[data-gallery="image-wrapper"]');
            const galleryImages = sectionRef.current.querySelectorAll('[data-gallery="image"]');
            const sectionContentUI = sectionRef.current.querySelector('[data-content="section"]');
            const contents = sectionRef.current.querySelectorAll('[data-content="details"]');
            const contentWrappers = sectionRef.current.querySelectorAll('[data-content="details-wrapper"]');
            const contentWrapperImages = sectionRef.current.querySelectorAll('[data-content="details-wrapper"] .testi-image_container');
            const cursor = sectionRef.current.querySelector('[data-cursor="container"]');

            let listOfSplits = [];
            let currentOpenIndex = null;
            let isAnimating = false;
            let currentAnimation = null;
            let cursorRafId = null;
            let cursorX = 0;
            let cursorY = 0;
            let targetX = 0;
            let targetY = 0;

            scrollWrapper.classList.remove('testi-is-hidden');

            contents.forEach((content, index) => {
                content.classList.add('testi-is-hidden');
                listOfSplits[index] = initializeSplitText(content);
            });
            contentWrapperImages.forEach(image => image.remove());

            function updateCursor() {
                cursorX += (targetX - cursorX) * 0.15;
                cursorY += (targetY - cursorY) * 0.15;
                if (cursor) cursor.style.transform = `translate3d(${cursorX}px, ${cursorY}px, 0)`;
                cursorRafId = requestAnimationFrame(updateCursor);
            }

            function handleMouseMove(e) {
                if (!cursor) return;
                const cursorBounds = cursor.getBoundingClientRect();
                targetX = e.clientX - (cursorBounds.width * 3) / 4;
                targetY = e.clientY - (cursorBounds.height * 3) / 4;
                if (!cursorRafId) {
                    cursorRafId = requestAnimationFrame(updateCursor);
                }
            }

            function handleTouchStart(e, index) {
                if (e.touches.length === 1) {
                    handleImageClick(index);
                }
            }

            function handleImageClick(index) {
                if (currentOpenIndex === null) {
                    openContent(index);
                }
            }

            function handleWrapperClick(index) {
                if (currentOpenIndex === index) {
                    hideContent(index);
                }
            }

            function initializeSplitText(content) {
                if (!content) return null;

                const contentTitleTop = content.querySelectorAll('[data-content="text-top"] div');
                const contentTitleBottom = content.querySelectorAll('[data-content="text-bottom"] div');
                const contentTextLeft = content.querySelectorAll('[data-content="text-left"] div');
                const contentTextRight = content.querySelectorAll('[data-content="text-right"] div');

                const titleTopSplits = Array.from(contentTitleTop, n => new SplitType(n, { types: 'chars' }));
                const titleBottomSplits = Array.from(contentTitleBottom, n => new SplitType(n, { types: 'chars' }));

                titleTopSplits[0]?.chars?.forEach(char => {
                    const wrapper = document.createElement('div');
                    wrapper.classList.add('char-wrap');
                    char.parentNode.insertBefore(wrapper, char);
                    wrapper.appendChild(char);
                });

                const textLeftSplits = Array.from(contentTextLeft, n => new SplitType(n, { types: 'lines' }));
                const textRightSplits = Array.from(contentTextRight, n => new SplitType(n, { types: 'lines' }));

                [textLeftSplits, textRightSplits].forEach(splits => {
                    splits.forEach(split => {
                        split.lines?.forEach(line => {
                            const wrapper = document.createElement('div');
                            wrapper.classList.add('line-wrap');
                            line.parentNode.insertBefore(wrapper, line);
                            wrapper.appendChild(line);
                        });
                    });
                });

                return { titleTopSplits, titleBottomSplits, textLeftSplits, textRightSplits };
            }

            const openContent = index => {
                if (isAnimating) return;
                isAnimating = true;
                contents[index].classList.remove('testi-is-hidden');
                const currentWrapper = contentWrappers[index];
                const splits = listOfSplits[index];

                splits.titleTopSplits[0]?.chars?.forEach(char => {
                    char.style.willChange = 'transform, clip-path';
                });

                currentAnimation = gsap.timeline({
                    duration: 1.25,
                    ease: 'power4.inOut',
                    onStart: () => {
                        sectionContentUI.classList.remove('testi-is-hidden');
                    },
                    onComplete: () => {
                        isAnimating = false;
                        currentOpenIndex = index;
                        lenisInstance.stop();
                        scrollWrapper.classList.add('testi-is-hidden');
                        if (cursor) cursor.classList.add('is-open');
                        currentAnimation = null;
                        splits.titleTopSplits[0]?.chars?.forEach(char => {
                            char.style.willChange = 'auto';
                        });
                    },
                });

                currentAnimation
                    .addLabel('start', 0)
                    .add(() => {
                        const flipState = Flip.getState(galleryImages[index]);
                        currentWrapper.appendChild(galleryImages[index]);
                        Flip.from(flipState, { duration: 1.25, ease: 'power4.inOut' });
                    }, 'start')
                    .to(
                        gsap.utils.toArray(galleryImagesWrapper).filter((img, i) => i !== index),
                        { clipPath: 'inset(100% 0 0 0)', duration: 0.75, ease: 'power3.inOut' },
                        0
                    )
                    .fromTo(
                        [splits.titleTopSplits[0]?.elements, splits.titleBottomSplits[0]?.elements].filter(Boolean),
                        { xPercent: 15 },
                        { xPercent: 0, duration: 1, ease: 'power3.out' },
                        'start+=1.25'
                    )
                    .fromTo(
                        [...(splits.titleTopSplits[0]?.chars || []), ...(splits.titleBottomSplits[0]?.chars || [])],
                        { clipPath: 'inset(0 100% 0 0)', xPercent: 10 },
                        { clipPath: 'inset(0 0% 0 0)', xPercent: 0, duration: 0.75, ease: 'power3.out' },
                        'start+=1.25'
                    )
                    .fromTo(
                        [
                            ...splits.textLeftSplits.flatMap(split => split.lines || []),
                            ...splits.textRightSplits.flatMap(split => split.lines || []),
                        ],
                        { yPercent: 100, opacity: 0 },
                        { yPercent: 0, opacity: 1, stagger: 0.025 },
                        'start+=1.2'
                    );
            };

            const hideContent = index => {
                if (isAnimating || currentOpenIndex === null) return;
                isAnimating = true;
                const currentWrapper = contentWrappers[index];
                const splits = listOfSplits[index];
                lenisInstance.start();
                scrollWrapper.classList.remove('testi-is-hidden');

                currentAnimation = gsap.timeline({
                    duration: 1.25,
                    ease: 'power4.inOut',
                    onComplete: () => {
                        isAnimating = false;
                        currentOpenIndex = null;
                        currentAnimation = null;
                        if (cursor) cursor.classList.remove('is-open');
                        sectionContentUI.classList.add('testi-is-hidden');
                        contents[index].classList.add('testi-is-hidden');
                    },
                });

                currentAnimation
                    .addLabel('start', 0)
                    .fromTo(
                        [splits.titleTopSplits[0]?.elements, splits.titleBottomSplits[0]?.elements].filter(Boolean),
                        { xPercent: 0 },
                        { xPercent: 10, ease: 'power3.out', duration: 1 },
                        'start'
                    )
                    .fromTo(
                        [...(splits.titleTopSplits[0]?.chars || []), ...(splits.titleBottomSplits[0]?.chars || [])],
                        { clipPath: 'inset(0 0% 0 0)', xPercent: 0 },
                        { clipPath: 'inset(0 100% 0 0)', xPercent: 10, ease: 'power3.out', duration: 0.75 },
                        'start'
                    )
                    .to(
                        [
                            ...splits.textLeftSplits.flatMap(split => split.lines || []),
                            ...splits.textRightSplits.flatMap(split => split.lines || []),
                        ],
                        { yPercent: 100, stagger: 0.025, duration: 0.75 },
                        'start'
                    )
                    .add(() => {
                        const contentWrapperImage = currentWrapper.querySelector('.testi-image_container');
                        if (!contentWrapperImage) return;
                        const flipState = Flip.getState(contentWrapperImage);
                        galleryImagesWrapper[index].appendChild(contentWrapperImage);
                        Flip.from(flipState, { duration: 1.25, ease: 'power3.inOut' });
                    }, 'start+=0.25')
                    .to(
                        gsap.utils.toArray(galleryImagesWrapper).filter((img, i) => i !== index),
                        { clipPath: 'inset(0% 0 0 0)' }
                    )
                    .set(galleryImagesWrapper, { clipPath: 'none' });
            };

            galleryImagesWrapper.forEach((image, index) => {
                image.addEventListener('click', () => handleImageClick(index));
                image.addEventListener('touchstart', e => handleTouchStart(e, index));
                image.addEventListener('mouseenter', () => cursor?.classList.add('is-visible'));
                image.addEventListener('mouseleave', () => cursor?.classList.remove('is-visible'));
            });

            contentWrappers.forEach((content, index) => {
                content.addEventListener('click', () => handleWrapperClick(index));
                content.addEventListener('mouseenter', () => cursor?.classList.add('is-visible'));
                content.addEventListener('mouseleave', () => cursor?.classList.remove('is-visible'));
            });

            window.addEventListener('mousemove', handleMouseMove);

            return () => {
                window.removeEventListener('mousemove', handleMouseMove);
                if (cursorRafId) cancelAnimationFrame(cursorRafId);
            };
        }, sectionRef);

        return () => {
            ctx.revert();
            if (lenisInstance) lenisInstance.destroy();
            if (rafId) cancelAnimationFrame(rafId);
        };
    }, []);

    const galleryData = [
        { id: 1, titleTop: 'CONFIDENCE', titleBottom: 'CHARISMA', leftTitle: 'CHARM', leftPhrase: 'Sharp wit, warm smile a magnetic presence. He walks in, and the room seems to pause, by his quiet strength.', rightTitle: 'Presence', rightPhrase: 'Striking confidence, captivating charm, and elegance in every glance. A timeless blend of poise and presence, effortlessly charismatic.', img: 'https://moussamamadou.github.io/flip-plugin-horizontal-scroll/images/photo-9.jpg' },
        { id: 2, titleTop: 'WISDOM', titleBottom: 'INTELLECT', leftTitle: 'BRILLIANCE', leftPhrase: 'Quick mind, deep thoughts, a scholarly presence. His ideas illuminate the room, guided by penetrating insight.', rightTitle: 'knowledge', rightPhrase: 'Deep understanding, thoughtful insights, and clarity in every word. A masterful blend of experience and intuition, naturally enlightening.', img: 'https://moussamamadou.github.io/flip-plugin-horizontal-scroll/images/photo-6.jpg' },
        { id: 3, titleTop: 'KINDNESS', titleBottom: 'GENEROSITY', leftTitle: 'Giving', leftPhrase: 'Open heart, helping hands, a benevolent force. His presence brings comfort, marked by selfless grace.', rightTitle: 'Compassion', rightPhrase: 'Gentle spirit, nurturing soul, and warmth in every action. A beautiful harmony of empathy and understanding, naturally caring.', img: 'https://moussamamadou.github.io/flip-plugin-horizontal-scroll/images/photo-8.jpg' },
        { id: 4, titleTop: 'CREATIVITY', titleBottom: 'ARTISTRY', leftTitle: 'Expression', leftPhrase: 'Fluid style, bold vision, a creative soul. He transforms the ordinary, through his unique perspective.', rightTitle: 'Innovation', rightPhrase: 'Boundless imagination, artistic flair, and vision in every creation. A stunning fusion of originality and skill, naturally inspiring.', img: 'https://moussamamadou.github.io/flip-plugin-horizontal-scroll/images/photo-12.jpg' },
        { id: 5, titleTop: 'LEADERSHIP', titleBottom: 'INFLUENCE', leftTitle: 'Impact', leftPhrase: 'Strong presence, clear purpose, a guiding light. He shapes the path forward, through determined leadership.', rightTitle: 'Guidance', rightPhrase: 'Natural authority, inspiring presence, and direction in every decision. A powerful combination of vision and influence, naturally commanding', img: 'https://moussamamadou.github.io/flip-plugin-horizontal-scroll/images/photo-5.jpg' },
        { id: 6, titleTop: 'GRACE', titleBottom: 'ELEGANCE', leftTitle: 'SOPHISTICATION', leftPhrase: 'Smooth demeanor, cultured taste, a refined presence. He elevates any setting, with natural elegance.', rightTitle: 'POLISH', rightPhrase: 'Refined movement, sophisticated manner, and style in every gesture. A perfect balance of poise and dignity, naturally flowing.', img: 'https://moussamamadou.github.io/flip-plugin-horizontal-scroll/images/photo-10.jpg' },
        { id: 7, titleTop: 'PASSION', titleBottom: 'INTENSITY', leftTitle: 'Drive', leftPhrase: 'Fierce determination, endless energy, a dynamic force. He ignites inspiration, through passionate pursuit.', rightTitle: 'Enthusiasm', rightPhrase: 'Burning drive, intense focus, and fire in every pursuit. An explosive blend of energy and dedication, naturally motivating.', img: 'https://moussamamadou.github.io/flip-plugin-horizontal-scroll/images/photo-4.jpg' }
    ];

    return (
        <div ref={sectionRef} className="testimonial-section-container">
            <div className="testi-cursor" data-cursor="container">
                <div className="testi-cross_button"></div>
            </div>

            <div className="testi-scroll-wrapper" data-scroll="wrapper">
                <section className="testi-scroll-content" data-scroll="content">
                    <div className="testi-gallery">
                        {galleryData.map((item, idx) => (
                            <div key={idx} className="testi-gallery_image" data-gallery="image-wrapper">
                                <div className="testi-image_container" data-gallery="image">
                                    <img src={item.img} loading="lazy" alt={`Photo ${idx}`} />
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            </div>

            <section className="testi-section_content testi-is-hidden" data-content="section">
                {galleryData.map((item, idx) => (
                    <div key={idx} className="testi-content testi-is-hidden" data-content="details">
                        <div className="testi-content_wrapper" data-content="details-wrapper">
                            <div className="content_title-top" data-content="text-top">
                                <div className="testi-title-big">{item.titleTop}</div>
                            </div>
                            <div className="content_title-bottom" data-content="text-bottom">
                                <div className="testi-title-big">{item.titleBottom}</div>
                            </div>
                            <div className="content_text-left" data-content="text-left">
                                <div className="testi-title-small">{item.leftTitle}</div>
                                <div className="testi-paragraph">{item.leftPhrase}</div>
                            </div>
                            <div className="content_text-right" data-content="text-right">
                                <div className="testi-title-small">{item.rightTitle}</div>
                                <div className="testi-paragraph">{item.rightPhrase}</div>
                            </div>
                            <div className="testi-image_container" data-content="image">
                                <img src={item.img} loading="lazy" alt={`Photo ${idx}`} />
                            </div>
                        </div>
                    </div>
                ))}
            </section>
        </div>
    );
}
