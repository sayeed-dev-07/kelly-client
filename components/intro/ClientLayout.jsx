'use client';

import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import IntroAnimation from './IntroAnimation';
import Home from '@/app/page';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { Flip } from 'gsap/Flip';

import Navbar from '../Navbar';
import { useLenis, LenisProvider } from '../lenis/LenisProvider';
import { ScrollTrigger } from 'gsap/ScrollTrigger';


gsap.registerPlugin(Flip, useGSAP, ScrollTrigger);
gsap.config({ force3D: true });

export const IntroContext = React.createContext({ flipFinished: false });

// Lives INSIDE LenisProvider so useLenis() actually resolves
const ScrollLock = ({ active }) => {
    const lenis = useLenis();

    useEffect(() => {
        if (!lenis) return;
        if (active) {
            lenis.stop();
        } else {
            lenis.start();
        }
    }, [active, lenis]);

    // Keep this as a lightweight visual fallback only —
    // lenis.stop() is what actually kills the scroll motion.
    useEffect(() => {
        document.documentElement.style.overflow = active ? 'hidden' : '';
        document.body.style.touchAction = active ? 'none' : '';
        return () => {
            document.documentElement.style.overflow = '';
            document.body.style.touchAction = '';
        };
    }, [active]);

    return null;
};

const ClientLayout = () => {
    const mainAppRef = useRef(null);
    const [introActive, setIntroActive] = useState(true);
    const [flipFinished, setFlipFinished] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        // 1. Force a refresh once the window is fully loaded (catches late images)
        const handleLoad = () => ScrollTrigger.refresh();
        window.addEventListener('load', handleLoad);

        // 2. Create a ResizeObserver to watch for dynamic height changes (accordions/lazy images)
        const resizeObserver = new ResizeObserver(() => {
            ScrollTrigger.refresh();
        });

        // Watch the main body for any height shifts
        resizeObserver.observe(document.body);

        return () => {
            window.removeEventListener('load', handleLoad);
            resizeObserver.disconnect();
        };
    }, []);

    useLayoutEffect(() => {
        const played = sessionStorage.getItem("introPlayed");
        // const played = false
        if (played) {
            setIntroActive(false);
            setFlipFinished(true);
            if (mainAppRef.current) gsap.set(mainAppRef.current, { opacity: 1 });
        } else {
            if (mainAppRef.current) gsap.set(mainAppRef.current, { opacity: 0 });
        }
        setIsLoaded(true);
    }, []);

    // The old wheel/touchmove/keydown JS-lock effect is gone —
    // lenis.stop() inside ScrollLock replaces it entirely.

    const handleIntroComplete = () => {
        const state = Flip.getState('[data-flip-id="hero-flip"]');

        setIntroActive(false);
        gsap.set(mainAppRef.current, { opacity: 1 });

        requestAnimationFrame(() => {
            if (!state) return;

            Flip.from(state, {
                targets: '[data-flip-id="hero-flip"]',
                duration: 0.4,
                ease: 'power2.out',
                absolute: true,
                scale: true,
                onComplete: () => {
                    sessionStorage.setItem('introPlayed', 'true');
                    setFlipFinished(true);
                }
            });
        });
    };

    if (!isLoaded) return null;

    return (
        <LenisProvider>
            <ScrollLock active={introActive} />
            <IntroContext.Provider value={{ flipFinished }}>
                <div>
                    <Navbar />
                    {introActive && <IntroAnimation onComplete={handleIntroComplete} />}
                    <div ref={mainAppRef} style={{ opacity: introActive ? 0 : 1 }}>
                        <Home />
                    </div>
                </div>
            </IntroContext.Provider>
        </LenisProvider>
    );
};

export default ClientLayout;