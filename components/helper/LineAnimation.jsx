'use client'
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import React, { useRef } from 'react';

gsap.registerPlugin(useGSAP, ScrollTrigger)

const LineAnimation = ({ black = true }) => {

    const containerRef = useRef(null)
    const lineRef = useRef(null)

    useGSAP(() => {

        if (!lineRef.current) return

        gsap.to(lineRef.current, {
            x: 0,
            duration: 0.6,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: lineRef.current,
                start: 'top 90%'
            }
        })

    }, { scope: containerRef })

    return (
        <div ref={containerRef} className='w-full py-2 overflow-hidden'>
            <div ref={lineRef} className={`w-full  h-0.5 -translate-x-full ${black ? 'bg-background' : 'bg-foreground'}`}></div>
        </div>
    );
};

export default LineAnimation;