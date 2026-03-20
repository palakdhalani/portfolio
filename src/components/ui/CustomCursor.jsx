import { useEffect } from 'react';
import gsap from 'gsap';

export default function CustomCursor() {
    useEffect(() => {
        const cursor = document.getElementById('custom-cursor');
        if (!cursor) return;

        // We use GSAP quickTo for highly performant mouse following
        const xTo = gsap.quickTo(cursor, 'x', { duration: 0.15, ease: 'power3' });
        const yTo = gsap.quickTo(cursor, 'y', { duration: 0.15, ease: 'power3' });

        const handleMouseMove = (e) => {
            xTo(e.clientX);
            yTo(e.clientY);
        };

        const handleMouseEnter = (e) => {
            const target = e.target;
            if (
                target.tagName.toLowerCase() === 'a' ||
                target.tagName.toLowerCase() === 'button' ||
                target.closest('a') ||
                target.closest('button') ||
                target.classList.contains('magnetic') ||
                target.classList.contains('hover-reveal')
            ) {
                cursor.classList.add('hover');
            }
        };

        const handleMouseLeave = () => {
            cursor.classList.remove('hover');
        };

        window.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseover', handleMouseEnter);
        document.addEventListener('mouseout', handleMouseLeave);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseover', handleMouseEnter);
            document.removeEventListener('mouseout', handleMouseLeave);
        };
    }, []);

    return <div id="custom-cursor" aria-hidden="true"></div>;
}
