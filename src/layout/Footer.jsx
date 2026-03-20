import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebookF, FaInstagram, FaLinkedinIn } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6'; // Correct icon for X/Twitter

export default function Footer() {
    return (
        <footer className="relative bg-[#050507] text-white pt-24 pb-8 overflow-hidden font-sans border-t border-white/10">
            <div className="container mx-auto px-6 md:px-12 flex flex-col">
                
                {/* Top Section: Giant 3D Text */}
                <div className="w-full flex justify-center items-center mb-8 select-none">
                    <h1 
                        className="text-[20vw] font-black uppercase leading-none tracking-tighter text-white"
                        style={{
                            textShadow: `
                                1px 1px 0 #333,
                                2px 2px 0 #333,
                                3px 3px 0 #333,
                                4px 4px 0 #222,
                                5px 5px 0 #222,
                                6px 6px 0 #222,
                                7px 7px 0 #111,
                                8px 8px 0 #111,
                                9px 9px 0 #111,
                                10px 10px 0 #000,
                                11px 11px 20px rgba(0,0,0,0.8)
                            `
                        }}
                    >
                        PALAK
                    </h1>
                </div>

                {/* Social Icons Row */}
                <div className="w-full flex gap-6 mb-16 text-white/70">
                    <a href="#" className="hover:text-white transition-colors duration-300">
                        <FaFacebookF size={20} />
                    </a>
                    <a href="#" className="hover:text-white transition-colors duration-300">
                        <FaInstagram size={20} />
                    </a>
                    <a href="#" className="hover:text-white transition-colors duration-300">
                        <FaXTwitter size={20} />
                    </a>
                    <a href="#" className="hover:text-white transition-colors duration-300">
                        <FaLinkedinIn size={20} />
                    </a>
                </div>

                {/* Middle Section: CTA & Split Links Grid */}
                <div className="w-full flex flex-col lg:flex-row justify-between mb-24 gap-16 lg:gap-8">
                    
                    {/* Left Side: Call to Action */}
                    <div className="lg:w-1/3 flex flex-col items-start gap-8">
                        <h2 className="text-4xl md:text-5xl lg:text-5xl font-black uppercase leading-[1.1] tracking-tight text-white">
                            READY TO TAKE <br />
                            CONTROL OF YOUR <br />
                            DIGITAL FUTURE
                        </h2>
                        <Link 
                            to="/contact" 
                            className="bg-white text-black font-bold uppercase tracking-wider text-sm px-8 py-3 rounded-full hover:bg-gray-200 transition-colors duration-300 inline-block"
                        >
                            GET STARTED
                        </Link>
                    </div>

                    {/* Right Side: 4-Column Links Grid */}
                    <div className="lg:w-2/3 grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4 w-full">
                        {/* Column 1 */}
                        <div className="flex flex-col gap-4">
                            <h4 className="text-white font-bold text-sm mb-2">Services</h4>
                            <Link to="#" className="text-white/60 hover:text-white text-sm transition-colors">Web Design</Link>
                            <Link to="#" className="text-white/60 hover:text-white text-sm transition-colors">Development</Link>
                            <Link to="#" className="text-white/60 hover:text-white text-sm transition-colors">Branding</Link>
                            <Link to="#" className="text-white/60 hover:text-white text-sm transition-colors">Consulting</Link>
                            <Link to="#" className="text-white/60 hover:text-white text-sm transition-colors">Strategy</Link>
                        </div>
                        
                        {/* Column 2 */}
                        <div className="flex flex-col gap-4">
                            <h4 className="text-white font-bold text-sm mb-2">Company</h4>
                            <Link to="#" className="text-white/60 hover:text-white text-sm transition-colors">About us</Link>
                            <Link to="#" className="text-white/60 hover:text-white text-sm transition-colors">Blog</Link>
                            <Link to="#" className="text-white/60 hover:text-white text-sm transition-colors">Careers</Link>
                            <Link to="#" className="text-white/60 hover:text-white text-sm transition-colors">Cookie Policy</Link>
                        </div>

                        {/* Column 3 */}
                        <div className="flex flex-col gap-4">
                            <h4 className="text-white font-bold text-sm mb-2">Resource</h4>
                            <Link to="#" className="text-white/60 hover:text-white text-sm transition-colors">Customers</Link>
                            <Link to="#" className="text-white/60 hover:text-white text-sm transition-colors">Strategic</Link>
                            <Link to="#" className="text-white/60 hover:text-white text-sm transition-colors">E books & Guides</Link>
                            <Link to="#" className="text-white/60 hover:text-white text-sm transition-colors">Webinar</Link>
                        </div>

                        {/* Column 4 */}
                        <div className="flex flex-col gap-4">
                            <h4 className="text-white font-bold text-sm mb-2">Support</h4>
                            <Link to="#" className="text-white/60 hover:text-white text-sm transition-colors">Help Center</Link>
                            <Link to="#" className="text-white/60 hover:text-white text-sm transition-colors">Contact</Link>
                        </div>
                    </div>

                </div>

                {/* Bottom Bar */}
                <div className="w-full flex flex-col md:flex-row items-center justify-between border-t border-white/20 pt-6 text-xs text-white/50 font-medium">
                    <p>© {new Date().getFullYear()} Palak Studio</p>
                    <p className="flex-1 text-center my-4 md:my-0">All Rights Reserved.</p>
                    <div className="flex gap-6">
                        <Link to="#" className="hover:text-white transition-colors">Terms of Service</Link>
                        <Link to="#" className="hover:text-white transition-colors">Privacy Policy</Link>
                    </div>
                </div>

            </div>
        </footer>
    );
}
