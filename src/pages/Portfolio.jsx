import React, { useRef } from 'react';
import DepthGallery from '../components/DepthGallery/DepthGallery';

export default function PortfolioPage() {
    const wrapperRef = useRef(null);

    return (
        // portfolio-scroll-wrapper class is REQUIRED — Scroll.js reads it by class name every frame
        <div
            ref={wrapperRef}
            id="portfolio-list"
            className="portfolio-scroll-wrapper"
            style={{ height: '500vh', position: 'relative', background: '#0a0a0a' }}
        >
            <div
                style={{
                    position: 'sticky',
                    top: 0,
                    width: '100%',
                    height: '100vh',
                    overflow: 'hidden',
                }}
            >
                <DepthGallery scrollWrapper={wrapperRef} />
            </div>
        </div>
    );
}
