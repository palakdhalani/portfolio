import React from 'react';
import LandscapeHero from '../components/home/LandscapeHero';
import HorizontalAccordion from '../components/home/HorizontalAccordion';
import ServicesSection from '../sections/ServicesSection';
import PortfolioSection from '../sections/PortfolioSection';
import GetInTouchSection from '../sections/GetInTouchSection';

export default function Home() {
    return (
        <div className="w-full bg-[#fdf3e7]">
            <LandscapeHero />
            <ServicesSection />
            <PortfolioSection />

            {/* "Choose Your Hero" Accordion Section */}
            <HorizontalAccordion />

            {/* Get In Touch Contact Section */}
            <GetInTouchSection />

            {/* Spacer to allow scrolling past portfolio into footer */}
            <div className="h-48 bg-background flex flex-col items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent z-0" />
                <span className="text-xs uppercase tracking-[0.3em] text-white/30 relative z-10 animate-pulse">End of Homepage</span>
            </div>
        </div>
    );
}
