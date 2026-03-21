import React, { useEffect, useRef } from 'react';
import { Engine } from '@/Experience/Engine';
import './canvas.css';

export default function DepthGallery() {
    const containerRef = useRef(null);

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        // StrictMode-safe: create canvas dynamically so each mount gets a fresh WebGL context
        const canvas = document.createElement('canvas');
        canvas.className = 'webgl';
        container.appendChild(canvas);

        let engine;

        (async () => {
            try {
                // Set canvas to exact window size immediately before init
                canvas.style.width = '100vw';
                canvas.style.height = '100vh';
                canvas.width = window.innerWidth;
                canvas.height = window.innerHeight;

                engine = new Engine(canvas);
                await engine.init();

                // Force another resize after browser paint so renderer dimensions are correct
                requestAnimationFrame(() => {
                    if (engine) engine.resize();
                });

                // Move debug overlays into scoped container (prevents footer bleed)
                requestAnimationFrame(() => {
                    document.querySelectorAll(
                        '.plane-label-overlay, .velocity-visualizer, .tp-dfwv, .fps-stats'
                    ).forEach(el => container.appendChild(el));
                });

                // Disable codrops internal wheel/touch — Scroll.js drives camera from DOM rect
                const scroll = engine.scroll;
                if (scroll) {
                    window.removeEventListener('wheel', scroll.onWheel);
                    window.removeEventListener('touchstart', scroll.onTouchStart);
                    window.removeEventListener('touchmove', scroll.onTouchMove);
                }
            } catch (err) {
                console.error('DepthGallery init error:', err);
            }
        })();

        return () => {
            if (engine && typeof engine.dispose === 'function') engine.dispose();

            // Clean up any overlay elements
            container.querySelectorAll(
                '.plane-label-overlay, .velocity-visualizer, .tp-dfwv, .fps-stats'
            ).forEach(el => el.remove());

            if (container.contains(canvas)) {
                container.removeChild(canvas);
            }
        };
    }, []);

    return (
        <div
            ref={containerRef}
            style={{
                position: 'absolute',
                inset: 0,
                width: '100%',
                height: '100%',
            }}
        />
    );
}
