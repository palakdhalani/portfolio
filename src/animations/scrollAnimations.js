import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SplitType from 'split-type';

gsap.registerPlugin(ScrollTrigger);

export const animateTextReveal = (elementRef) => {
    if (!elementRef.current) return;

    const text = new SplitType(elementRef.current, { types: 'lines, words, chars' });

    gsap.from(text.chars, {
        scrollTrigger: {
            trigger: elementRef.current,
            start: 'top 85%',
        },
        y: 100,
        opacity: 0,
        stagger: 0.02,
        duration: 0.8,
        ease: 'power3.out',
    });
};

export const animateFadeUp = (elements, parentTrigger) => {
    gsap.fromTo(
        elements,
        { y: 50, opacity: 0 },
        {
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.1,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: parentTrigger,
                start: 'top 80%',
            },
        }
    );
};
