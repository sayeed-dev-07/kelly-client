'use client';

import React, { useRef, forwardRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

gsap.registerPlugin(useGSAP);
gsap.config({ force3D: true });

const AnimatedCTA = forwardRef(({ text, href, className = "", func, ...props }, ref) => {
    const containerRef = useRef(null);
    const bgRef = useRef(null);
    const textRef = useRef(null);

    // Merge refs to ensure parent animations (like slide-from-right) still target it correctly
    const setRefs = (node) => {
        containerRef.current = node;
        if (typeof ref === "function") ref(node);
        else if (ref) ref.current = node;
    };

    const { contextSafe } = useGSAP({ scope: containerRef });

    useGSAP(() => {
        // Initial setup for the sliding background and text color
        gsap.set(bgRef.current, { xPercent: -101 });
        gsap.set(containerRef.current, { scale: 1 });
        gsap.set(textRef.current, { color: "#ffffff" }); // Tailwind text-white
    }, { scope: containerRef });

    const handleMouseEnter = contextSafe(() => {
        gsap.to(containerRef.current, { scale: 1.05, duration: 0.5, ease: "power3.out", overwrite: "auto" });
        gsap.to(bgRef.current, { xPercent: 0, duration: 0.5, ease: "power3.out", overwrite: "auto" });
        // Tweens to Tailwind neutral-950
        gsap.to(textRef.current, { color: "#0a0a0a", duration: 0.5, ease: "power3.out", overwrite: "auto" });
    });

    const handleMouseLeave = contextSafe(() => {
        gsap.to(containerRef.current, { scale: 1, duration: 0.5, ease: "power3.out", overwrite: "auto" });
        gsap.to(bgRef.current, { xPercent: -101, duration: 0.5, ease: "power3.out", overwrite: "auto" });
        gsap.to(textRef.current, { color: "#ffffff", duration: 0.5, ease: "power3.out", overwrite: "auto" });
    });

    return (
        <a
            href={href}
            ref={setRefs}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onClick={func}
            className={`relative inline-flex min-h-11 items-center justify-center border border-brand-red bg-brand-red px-5 py-3 font-helvic text-xs font-semibold uppercase tracking-[0.16em] overflow-hidden cursor-pointer will-change-transform focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-950 ${className}`}
            {...props}
        >
            {/* Sliding Background Layer (White) */}
            <span ref={bgRef} className="absolute inset-0 z-0 bg-white" />

            {/* Text Layer */}
            <span ref={textRef} className="relative z-10 w-full text-center">
                {text}
            </span>
        </a>
    );
});

AnimatedCTA.displayName = "AnimatedCTA";
export default AnimatedCTA;