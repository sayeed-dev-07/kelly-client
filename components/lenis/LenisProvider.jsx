/* eslint-disable react-hooks/set-state-in-effect */
'use client';

import { useEffect, useRef, useState, createContext, useContext } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

gsap.registerPlugin(ScrollTrigger);

const LenisContext = createContext(null);
export const useLenis = () => useContext(LenisContext);

export const LenisProvider = ({ children }) => {
    const [lenis, setLenis] = useState(null);
    const lenisRef = useRef(null);

    useEffect(() => {
        const instance = new Lenis({
            duration: 1.5,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            smoothWheel: true,
            wheelMultiplier: 0.5,
            touchMultiplier: 1.5,
            syncTouch: false,
            autoResize: true,
        });

        lenisRef.current = instance;
        setLenis(instance);

        const onScroll = () => ScrollTrigger.update();
        const refreshScroll = () => {
            if (lenisRef.current !== instance) return;

            instance.resize();
            ScrollTrigger.refresh();
        };
        const onRefresh = () => instance.resize();

        instance.on('scroll', onScroll);
        ScrollTrigger.addEventListener('refresh', onRefresh);
        window.addEventListener('load', refreshScroll);
        window.addEventListener('resize', refreshScroll);

        const update = (time) => {
            if (lenisRef.current !== instance) return;
            instance.raf(time * 1000);
        };

        gsap.ticker.add(update);
        gsap.ticker.lagSmoothing(0);
        requestAnimationFrame(refreshScroll);

        return () => {
            instance.off('scroll', onScroll);
            ScrollTrigger.removeEventListener('refresh', onRefresh);
            window.removeEventListener('load', refreshScroll);
            window.removeEventListener('resize', refreshScroll);
            gsap.ticker.remove(update);
            lenisRef.current = null;
            setLenis(null);
            instance.destroy();
        };
    }, [setLenis]);

    return (
        <LenisContext.Provider value={lenis}>
            {children}
        </LenisContext.Provider>
    );
};