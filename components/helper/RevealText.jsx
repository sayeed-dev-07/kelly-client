'use client';

import React, { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';

gsap.registerPlugin(useGSAP, ScrollTrigger, SplitText);

gsap.config({
    force3D: true
});

const RevealText = ({ text, className = "", elementType: Element = "p" }) => {
    const containerRef = useRef(null);

    useGSAP(() => {
        if (!containerRef.current) return;

        // Wait for fonts to load to ensure accurate line splitting
        document.fonts.ready.then(() => {

            // Unhide the container safely for ALL screen sizes (FOUC prevention)
            gsap.set(containerRef.current, { autoAlpha: 1 });

            let mm = gsap.matchMedia();

            // Only run the complex SplitText animation on screens md (768px) and larger
            mm.add("(min-width: 768px)", () => {

                // The Double Split technique for line masking
                const parentSplit = new SplitText(containerRef.current, { type: 'lines', linesClass: 'overflow-hidden' });
                const childSplit = new SplitText(parentSplit.lines, { type: 'lines', linesClass: 'split-child will-change-transform' });

                // Push the inner text down beneath the mask
                gsap.set(childSplit.lines, { yPercent: 115, rotateX: -10 });

                // Animate up when it hits 90% of the viewport
                gsap.to(childSplit.lines, {
                    yPercent: 0,
                    rotateX: 0,
                    duration: 1.2,
                    stagger: 0.1,
                    ease: 'power4.out',
                    force3D: true,
                    scrollTrigger: {
                        trigger: containerRef.current,
                        start: 'top 90%',
                    }
                });

                // Crucial cleanup: Revert the text back to normal HTML when resizing down to mobile
                return () => {
                    parentSplit.revert();
                };
            });

        });
    }, { scope: containerRef });

    return (
        // Starts invisible to prevent Flash of Unstyled Content
        <Element ref={containerRef} className={`invisible wrap-break-word w-full m-0 p-0 ${className}`}>
            {text}
        </Element>
    );
};

export default RevealText;