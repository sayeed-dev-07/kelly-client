'use client';

import React, { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(useGSAP, ScrollTrigger);
gsap.config({
    force3D: true
})

const BlockReveal = ({ text, className = "", blockColor = "bg-brand-red" }) => {
    const containerRef = useRef(null);
    const blockRef = useRef(null);
    const textRef = useRef(null);

    useGSAP(() => {
        // 1. Initial State: Push text down 100% so it's hidden, ensure block covers everything
        gsap.set(textRef.current, { yPercent: 100, autoAlpha: 1 });
        gsap.set(blockRef.current, { yPercent: 0 });

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top 85%", // Triggers when the block is 15% up from the bottom of the screen
            }
        });

        // 2. Slide the red block UP and out of the hidden container
        tl.to(blockRef.current, {
            yPercent: -101, // 101 ensures no bleeding pixel lines are left behind
            duration: 0.75,
            ease: "power4.inOut",
            force3D: true
        });

        // 3. Slide the text UP from the bottom chasing the block
        tl.to(textRef.current, {
            yPercent: 0,
            duration: 0.75,
            ease: "power3.out",
            force3D: true
        }, "-=0.30"); // Overlap the animations heavily so it feels like one fluid motion

    }, { scope: containerRef });

    return (
        // inline-flex forces the container to be the EXACT width and height of the text inside it
        // overflow-hidden creates the "mask" that hides the elements when they slide outside
        <div ref={containerRef} className="relative overflow-hidden inline-flex m-0 p-0">

            {/* The Solid Reveal Block */}
            <div
                ref={blockRef}
                className={`absolute inset-0 z-20 w-full h-full will-change-transform ${blockColor}`}
            />

            {/* The Text Content */}
            <div
                ref={textRef}
                className={`relative z-10 invisible will-change-transform leading-none ${className}`}
            >
                {text}
            </div>
        </div>
    );
};

export default BlockReveal;