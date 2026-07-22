"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import {
    FaMapMarkerAlt,
    FaFacebookF,
    FaInstagram,
    FaYoutube,
    FaYelp,
    FaPhoneAlt,
    FaArrowUp
} from "react-icons/fa";
import { BsShieldFillCheck } from "react-icons/bs";

// Wrapped in a distinct block to perfectly calculate the seamless loop distance
const ColumnItems = ({ images }) => (
    <div className="marquee-part flex flex-col gap-2 md:gap-4 pb-2 md:pb-4 w-full">
        {images.map((img, idx) => (
            <div key={idx} className="relative w-full aspect-[3/4] md:aspect-square overflow-hidden bg-white/5 shrink-0">
                <img
                    src={img}
                    alt="Kelly R&R Roofing"
                    loading="lazy"
                    className="w-full h-full object-cover opacity-80"
                />
            </div>
        ))}
    </div>
);

const FooterBottom = () => {
    const containerRef = useRef(null);

    const col1 = ['/projectImg/1.webp', '/projectImg/2.webp', '/projectImg/3.webp', '/projectImg/4.webp'];
    const col2 = ["/projectImg/5.webp", "/projectImg/6.webp", "/projectImg/7.webp", "/projectImg/8.webp"];
    const col3 = ["/projectImg/9.webp", "/projectImg/10.webp", "/projectImg/1.webp", "/projectImg/2.webp"];
    const col4 = ["/projectImg/3.webp", "/projectImg/10.webp", "/projectImg/5.webp", "/projectImg/6.webp"];

    useGSAP(() => {
        const columns = containerRef.current?.querySelectorAll(".marquee-column");
        let tweens = [];

        const createTweens = () => {
            // Clear out old tweens on resize to prevent stacking animations
            tweens.forEach(t => t.kill());
            tweens = [];

            columns?.forEach((col, index) => {
                // Measure exactly one half of the duplicated content
                const part = col.querySelector('.marquee-part');
                if (!part) return;

                const loopDistance = part.offsetHeight;
                const isEven = index % 2 === 0;

                // Hardware accelerated fromTo ensures a perfect, jump-free reset
                const tween = gsap.fromTo(col,
                    { y: isEven ? 0 : -loopDistance },
                    {
                        y: isEven ? -loopDistance : 0,
                        duration: 35, // Adjust duration to control speed
                        ease: "none",
                        repeat: -1,
                        force3D: true // Forces GPU rendering for mobile performance
                    }
                );
                tweens.push(tween);
            });
        };

        // Initialize tweens
        createTweens();

        // Recalculate pixel distances if screen dimensions change (e.g., rotating a phone)
        const resizeObserver = new ResizeObserver(() => {
            createTweens();
        });

        columns.forEach(col => resizeObserver.observe(col));

        return () => {
            resizeObserver.disconnect();
            tweens.forEach(t => t.kill());
        };
    }, { scope: containerRef });

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    return (
        <footer
            id="footer"
            ref={containerRef}
            className="relative w-full min-h-screen bg-[#0a0a0a] flex flex-col"
        >
            {/* --- BACKGROUND MARQUEE --- */}
            {/* Removed mobile padding (px-0), reduced gaps */}
            <div className="absolute inset-0 grid grid-cols-2 gap-2 md:grid-cols-3 md:gap-4 xl:grid-cols-4 px-0 md:px-4 pointer-events-none overflow-hidden">
                <div className="marquee-column flex flex-col will-change-transform">
                    <ColumnItems images={col1} />
                    <ColumnItems images={col1} />
                </div>
                <div className="marquee-column flex flex-col will-change-transform">
                    <ColumnItems images={col2} />
                    <ColumnItems images={col2} />
                </div>
                <div className="marquee-column hidden md:flex flex-col will-change-transform">
                    <ColumnItems images={col3} />
                    <ColumnItems images={col3} />
                </div>
                <div className="marquee-column hidden xl:flex flex-col will-change-transform">
                    <ColumnItems images={col4} />
                    <ColumnItems images={col4} />
                </div>
            </div>

            {/* --- GLASS MASK --- */}
            <div className="absolute inset-0 bg-black/40 md:bg-black/50 z-10 pointer-events-none" />

            {/* --- FOREGROUND CONTENT --- */}
            <div className="relative z-20 flex-grow flex flex-col justify-between p-4 md:p-8 text-white">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 w-full pt-8">
                    <a href="https://maps.app.goo.gl/9wGhQNqCGmYmV2TB7" target="_blank" rel="noopener noreferrer" className="group flex flex-col gap-2 w-fit">
                        <span className="font-social text-[9px] tracking-[0.3em] text-white/40 uppercase font-bold">Google Map Location</span>
                        <div className="flex items-center gap-3 font-helvic text-xs md:text-sm uppercase tracking-[0.1em] font-bold text-white group-hover:text-red-500 transition-colors duration-300">
                            <FaMapMarkerAlt className="w-4 h-4 text-red-600" />
                            <span>NAVIGATE TO OUR LOCATION</span>
                        </div>
                    </a>
                    <a href="tel:+13465287499" className="group flex flex-col md:items-end gap-2 w-fit">
                        <span className="font-social text-[9px] tracking-[0.3em] text-white/40 uppercase font-bold">Direct Line</span>
                        <div className="flex items-center gap-3 font-futura text-xl md:text-2xl uppercase tracking-tighter text-white group-hover:text-red-500 transition-colors duration-300">
                            <FaPhoneAlt className="w-4 h-4 text-red-600" />
                            <span>+1 (346) 528-7499</span>
                        </div>
                    </a>
                </div>

                <div className="py-12 w-full flex items-center justify-center pointer-events-none">
                    <svg viewBox="0 0 420 120" role="img" aria-label="Kelley Roofing USA Logo" xmlns="http://www.w3.org/2000/svg" className="h-[30vh] w-auto transition-transform duration-500">
                        <polyline points="28,74 60,44 92,74" fill="none" stroke="#E63B2E" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" opacity="0.28"></polyline>
                        <polyline points="28,62 60,32 92,62" fill="none" stroke="#E63B2E" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" opacity="0.6"></polyline>
                        <polyline points="28,50 60,20 92,50" fill="none" stroke="#E63B2E" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round"></polyline>
                        <line x1="28" y1="82" x2="92" y2="82" stroke="#E63B2E" strokeWidth="2.5" strokeLinecap="round"></line>
                        <line x1="112" y1="18" x2="112" y2="96" stroke="#E63B2E" strokeWidth="1" opacity="0.3"></line>
                        <text x="128" y="62" fontFamily="var(--font-heading), Arial, sans-serif" fontWeight="700" fontSize="45" fill="#FFFFFF" letterSpacing="-1" className="font-bold">
                            KELLEY <tspan fill="#E63B2E" fontFamily="var(--font-noto-serif-display), 'Georgia', serif" fontWeight="400">R&R</tspan>
                        </text>
                        <text x="128" y="86" fontFamily="var(--font-subheading), Arial, sans-serif" fontWeight="400" fontSize="12.5" fill="#E63B2E" className="font-normal">
                            ROOF REPAIR & REPLACEMENT
                        </text>
                    </svg>
                </div>

                <div className="w-full flex flex-col gap-8">
                    <div className="flex flex-wrap items-center justify-between gap-6 border-b border-white/10 pb-8">
                        <div className="flex flex-wrap items-center gap-4 md:gap-8">
                            <a href="https://www.facebook.com/kelley.rr/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 font-helvic text-[10px] md:text-xs uppercase tracking-[0.2em] font-bold hover:text-red-500 transition-colors">
                                <FaFacebookF className="w-4 h-4" /> FB
                            </a>
                            <a href="https://www.instagram.com/kelley.rr/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 font-helvic text-[10px] md:text-xs uppercase tracking-[0.2em] font-bold hover:text-red-500 transition-colors">
                                <FaInstagram className="w-4 h-4" /> IG
                            </a>
                            <a href="https://www.youtube.com/@kelleyrandr" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 font-helvic text-[10px] md:text-xs uppercase tracking-[0.2em] font-bold hover:text-red-500 transition-colors">
                                <FaYoutube className="w-4 h-4" /> YT
                            </a>
                            {/* --- YELP ADDED HERE --- */}
                            <a href="https://www.yelp.com/biz/kelley-r-and-r-roofing-brownsville" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 font-helvic text-[10px] md:text-xs uppercase tracking-[0.2em] font-bold hover:text-red-500 transition-colors">
                                <FaYelp className="w-4 h-4" /> YELP
                            </a>
                        </div>
                        <a href="https://www.bbb.org/us/tx/houston/profile/roofing-contractors/kelley-rr-roofing-restoration-0915-90059999" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 px-5 py-2.5 bg-white/5 border border-white/10 hover:border-red-600 hover:bg-red-600/10 transition-colors duration-300">
                            <BsShieldFillCheck className="w-4 h-4 text-red-600" />
                            <span className="font-helvic text-[10px] md:text-xs uppercase tracking-[0.2em] font-bold">BBB Verified Rating</span>
                        </a>
                    </div>
                    <div className="flex flex-col-reverse md:flex-row justify-between items-center gap-3 font-social text-[9px] md:text-[10px] uppercase tracking-[0.3em] text-white/40 font-bold">
                        <div className="flex flex-col md:flex-row items-center gap-2 md:gap-8 text-center md:text-left">
                            <span>© {new Date().getFullYear()} KELLEY R&R. ALL RIGHTS SECURED.</span>
                            <span className="hidden md:block">|</span>
                            <a href="#" className="hover:text-white transition-colors">PRIVACY POLICY</a>
                        </div>
                        <button onClick={scrollToTop} className="flex cursor-pointer items-center gap-2 hover:text-red-500 transition-colors p-3 md:p-0 bg-white/5 md:bg-transparent rounded-full md:rounded-none border border-white/10 md:border-none">
                            <span className="hidden md:block">SCROLL TO TOP</span>
                            <div className="md:p-2 md:bg-white/10 rounded-full md:border md:border-white/20 flex items-center justify-center">
                                <FaArrowUp className="w-3 h-3" />
                            </div>
                        </button>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default FooterBottom;