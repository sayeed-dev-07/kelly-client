'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

gsap.config({
    force3D: true // Forces hardware12 acceleration
});

const imgData = [
    { src: '/img1.webp', alt: 'img1' },
    { src: '/img3.webp', alt: 'img3' },
    { src: '/img4.webp', alt: 'img4' },
    { src: '/img5.webp', alt: 'img5' },
    { src: '/img2.webp', alt: 'img2' },
];

const IntroAnimation = ({ onComplete }) => {
    const container = useRef(null);
    const counterRef = useRef(null);
    const textRef = useRef(null); // Ref for the dynamic status text

    useGSAP(() => {
        const photos = gsap.utils.toArray('.photo-card');
        const ww = window.innerWidth;
        const wh = window.innerHeight;

        // --- 1. SETUP INITIAL STATES ---
        photos.forEach((photo, i) => {
            const isLast = i === photos.length - 1;
            const isEven = i % 2 === 0;

            const startX = isEven ? -(ww * 1.5) : (ww * 1.5);
            const startRotation = isLast ? 0 : (isEven ? -20 : 20);

            gsap.set(photo, {
                x: startX,
                yPercent: -50,
                xPercent: -50,
                rotation: startRotation,
                scale: isLast ? 1.15 : 1,
            });
        });

        // Function to update numbers and dynamic text
        const counter = { value: 0 };
        const updateText = () => {
            let val = Math.round(counter.value);
            if (counterRef.current) {
                counterRef.current.innerText = val + "%";
            }
            if (textRef.current) {
                if (val === 100) {
                    textRef.current.innerText = "Ready to go!";
                } else if (val > 80) {
                    textRef.current.innerText = "Almost there...";
                } else if (val > 60) {
                    textRef.current.innerText = "Loading images...";
                } else if (val > 40) {
                    textRef.current.innerText = "Loading fonts...";
                } else if (val > 20) {
                    textRef.current.innerText = "Loading components...";
                } else {
                    textRef.current.innerText = "Initializing website...";
                }
            }
        };

        // --- 2. THE MASTER TIMELINE ---
        // Start paused so we can control the flow manually
        const masterTl = gsap.timeline({ paused: true, onComplete: onComplete });

        // Phase A: Animate to 99% quickly
        masterTl.to(counter, {
            value: 99,
            duration: 5,
            ease: "expo.out",
            delay: 0.5,
            onUpdate: updateText
        });

        // Phase B: THE GATEKEEPER (Wait for assets to load)
        masterTl.add(() => {
            masterTl.pause(); // Pause the timeline at 99%

            const checkReady = setInterval(() => {
                // document.readyState === 'complete' means ALL images, CSS, and iframes on the site have finished downloading.
                if (document.readyState === 'complete') {
                    clearInterval(checkReady); // Stop checking

                    // Smoothly finish the counter to 100%
                    gsap.to(counter, {
                        value: 100,
                        duration: 0.5,
                        ease: "power2.out",
                        onUpdate: updateText,
                        onComplete: () => {
                            // Once it hits 100%, resume the rest of the cinematic animation
                            masterTl.play();
                        }
                    });
                }
            }, 100); // Checks the loading status every 100 milliseconds
        });

        // Phase C: Fade out the counter and text
        masterTl.to([counterRef.current, textRef.current], {
            y: -30,
            autoAlpha: 0,
            duration: 0.6,
            stagger: 0.1,
            ease: "power3.inOut"
        }, "+=0.2");

        // --- 3. CREATE IMAGE SUB-TIMELINE ---
        const imgTl = gsap.timeline();
        let timelinePosition = 0;

        photos.forEach((photo, i) => {
            const isFirst = i === 0;
            const isLast = i === photos.length - 1;
            const isEven = i % 2 === 0;

            const customDuration = isFirst ? 1.6 : (isLast ? 1.5 : 0.85);
            const customEase = isFirst ? 'power2.out' : (isLast ? 'power3.out' : 'power4.out');

            imgTl.to(photo, {
                x: 0,
                rotation: isLast ? 0 : (isEven ? -6 : 6),
                scale: 1,
                duration: customDuration,
                ease: customEase,
            }, timelinePosition);

            if (isFirst) {
                timelinePosition += 1;
            } else if (i === photos.length - 2) {
                timelinePosition += 0.8;
            } else if (!isLast) {
                timelinePosition += 0.3;
            }
        });

        // Cinematic Expansion of the final photo
        const lastPhoto = photos[photos.length - 1];
        imgTl.to(lastPhoto, {
            width: ww,
            height: wh,
            padding: 0,
            borderRadius: 0,
            duration: 1.5,
            ease: 'expo.inOut',
        }, "+=0.35");

        // Add the image sequence to the master timeline
        masterTl.add(imgTl);

        // START THE ANIMATION
        masterTl.play();

    }, { scope: container });

    return (
        <div ref={container} className="fixed inset-0 z-[99999] h-dvh w-full overflow-hidden bg-neutral-950">

            {/* The Loading Text & Counter */}
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none z-50 gap-4">
                <span
                    ref={counterRef}
                    className="text-white font-futura font-black text-6xl md:text-8xl tracking-tighter will-change-transform"
                >
                    0%
                </span>

                {/* Dynamic Status Text */}
                <span
                    ref={textRef}
                    className="text-white/50 font-helvic text-[9px] md:text-[10px] uppercase tracking-[0.3em] font-bold will-change-transform transition-colors duration-300"
                >
                    // ESTABLISHING SECURE CONNECTION...
                </span>
            </div>

            {/* The Image Container */}
            <div className="relative h-full w-full z-10">
                {imgData.map((img, index) => {
                    const isLast = index === imgData.length - 1;

                    return (
                        <div
                            key={index}
                            data-flip-id={isLast ? "hero-flip" : ""}
                            className="photo-card absolute top-1/2 left-1/2 w-[85%] sm:w-[70%] md:w-[60%] lg:w-[45%] xl:w-[35%] aspect-[4/3] bg-white p-3 sm:p-4 pb-12 sm:pb-16 shadow-xl will-change-transform overflow-hidden"
                        >
                            <div className="relative h-full w-full overflow-hidden bg-neutral-900">
                                <Image
                                    src={img.src}
                                    alt={img.alt}
                                    fill
                                    priority
                                    className="object-cover"
                                    sizes="(max-width: 768px) 100vw, 50vw"
                                />
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default IntroAnimation;