import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { getMouseDistance, getPointerPos, lerp } from '../../utils/motionTrailUtils';

function preloadImages(images) {
    return Promise.all(
        images.map(
            (src) =>
                new Promise((resolve) => {
                    const img = new Image();
                    img.onload = resolve;
                    img.onerror = resolve;
                    img.src = src;
                })
        )
    );
}

export default function MotionTrail({ images = [], threshold = 80 }) {
    const containerRef = useRef(null);
    const [isLoaded, setIsLoaded] = useState(false);

    // Global refs for mouse tracking
    const mousePos = useRef({ x: 0, y: 0 });
    const cacheMousePos = useRef({ x: 0, y: 0 });
    const lastMousePos = useRef({ x: 0, y: 0 });

    // Trail state
    const zIndexVal = useRef(100);
    const imgPosition = useRef(0);
    const activeImagesCount = useRef(0);
    const isIdle = useRef(true);
    const renderFrame = useRef(null);

    useEffect(() => {
        preloadImages(images).then(() => {
            setIsLoaded(true);
        });

        const handlePointerMove = (ev) => {
            mousePos.current = getPointerPos(ev);
        };

        window.addEventListener('mousemove', handlePointerMove);
        window.addEventListener('touchmove', handlePointerMove, { passive: true });

        const onInitialMove = () => {
            cacheMousePos.current = { ...mousePos.current };
            startRenderLoop();
            window.removeEventListener('mousemove', onInitialMove);
            window.removeEventListener('touchmove', onInitialMove);
        };

        window.addEventListener('mousemove', onInitialMove);
        window.addEventListener('touchmove', onInitialMove, { passive: true });

        return () => {
            window.removeEventListener('mousemove', handlePointerMove);
            window.removeEventListener('touchmove', handlePointerMove);
            window.removeEventListener('mousemove', onInitialMove);
            window.removeEventListener('touchmove', onInitialMove);
            if (renderFrame.current) cancelAnimationFrame(renderFrame.current);
        };
    }, [images]);

    const startRenderLoop = () => {
        const render = () => {
            let distance = getMouseDistance(mousePos.current, lastMousePos.current);

            cacheMousePos.current.x = lerp(cacheMousePos.current.x || mousePos.current.x, mousePos.current.x, 0.1);
            cacheMousePos.current.y = lerp(cacheMousePos.current.y || mousePos.current.y, mousePos.current.y, 0.1);

            if (distance > threshold) {
                showNextImage();
                lastMousePos.current = { ...mousePos.current };
            }

            if (isIdle.current && zIndexVal.current !== 100) {
                zIndexVal.current = 100;
            }

            renderFrame.current = requestAnimationFrame(render);
        };
        renderFrame.current = requestAnimationFrame(render);
    };

    const showNextImage = () => {
        if (!containerRef.current) return;
        const domImages = containerRef.current.querySelectorAll('.trail-img');
        if (domImages.length === 0) return;

        zIndexVal.current += 1;
        imgPosition.current = imgPosition.current < domImages.length - 1 ? imgPosition.current + 1 : 0;

        const imgEl = domImages[imgPosition.current];

        gsap.killTweensOf(imgEl);

        const rect = imgEl.getBoundingClientRect();

        gsap.timeline({
            onStart: () => {
                activeImagesCount.current++;
                isIdle.current = false;
            },
            onComplete: () => {
                activeImagesCount.current--;
                if (activeImagesCount.current <= 0) {
                    activeImagesCount.current = 0;
                    isIdle.current = true;
                }
            }
        })
            .fromTo(imgEl, {
                opacity: 1,
                scale: 1,
                zIndex: zIndexVal.current,
                x: cacheMousePos.current.x - rect.width / 2,
                y: cacheMousePos.current.y - rect.height / 2
            }, {
                duration: 0.4,
                ease: 'power1.out',
                x: mousePos.current.x - rect.width / 2,
                y: mousePos.current.y - rect.height / 2
            }, 0)
            .to(imgEl, {
                duration: 0.4,
                ease: 'power3.out',
                opacity: 0,
                scale: 0.2
            }, 0.4);
    };

    if (!isLoaded) return null;

    return (
        <div ref={containerRef} className="pointer-events-none fixed inset-0 z-50 overflow-hidden">
            {images.map((src, idx) => (
                <div
                    key={idx}
                    className="trail-img absolute top-0 left-0 opacity-0 overflow-hidden rounded-[7px] w-[190px] aspect-[1.1] will-change-transform mix-blend-screen"
                >
                    <div
                        className="w-[calc(100%+20px)] h-[calc(100%+20px)] absolute -top-[10px] -left-[10px] bg-center bg-cover"
                        style={{ backgroundImage: `url(${src})` }}
                    />
                </div>
            ))}
        </div>
    );
}
