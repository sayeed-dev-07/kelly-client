'use client';

import { useContext, useRef, useLayoutEffect } from 'react';
import Image from 'next/image';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import { IntroContext } from './intro/ClientLayout';
import AnimatedCTA from './helper/AnimatedCTA';

gsap.registerPlugin(useGSAP, ScrollTrigger, SplitText);

const imgData = [
  { src: '/img2.webp', alt: '' },
  { src: '/img1.webp', alt: '' },
  { src: '/img3.webp', alt: '' },
  { src: '/img4.webp', alt: '' },
  { src: '/img5.webp', alt: '' },
];

const heroContent = {
  eyebrow: '// KELLEY R&R // NATIONWIDE SCALE',
  tag: 'COMMERCIAL FOCUS',
  titleLine1: 'Shield the',
  titleLine2: 'Super Structure.',
  left: 'Commercial roofing for large-scale properties that need disciplined crews, clear communication, and durable protection.',
  description: 'Elite nationwide roofing services specializing in commercial, industrial, and multi-family assets. Built for complex sites, tight windows, and high-integrity structural defense.',
  cta: 'Book an Appointment',
};

const Hero = () => {
  const container = useRef(null);
  const bgRef = useRef(null);

  const titleRef = useRef(null);
  const leftContentRef = useRef(null);
  const rightContentRef = useRef(null);

  const { flipFinished } = useContext(IntroContext);

  // Track if this is a fresh load or a refresh
  const isFreshLoad = useRef(true);

  useLayoutEffect(() => {
    // Check session storage before any animations trigger
    if (typeof window !== 'undefined') {
      isFreshLoad.current = sessionStorage.getItem("introPlayed") !== "true";
    }
  }, []);

  useGSAP(() => {
    const slides = gsap.utils.toArray('.hero-slide');
    const overlays = gsap.utils.toArray('.hero-overlay');

    // Initial resets
    gsap.set(slides.slice(1), { autoAlpha: 0, zIndex: 0, scale: 1 });
    gsap.set(overlays, { autoAlpha: 0 });

    if (!flipFinished) return;

    // --- 1. OVERLAYS FADE IN ---
    gsap.to(overlays, {
      autoAlpha: 1,
      duration: 1.2,
      ease: 'power2.out'
    });

    // --- 2. SLIDESHOW LOOP ---
    gsap.set(slides[0], { zIndex: 1 });
    let currentIndex = 0;
    gsap.to(slides[0], { scale: 1.05, duration: 6, ease: 'none' });

    let timer;
    const nextSlide = () => {
      const nextIndex = (currentIndex + 1) % slides.length;
      const currentEl = slides[currentIndex];
      const nextEl = slides[nextIndex];

      gsap.set(nextEl, { autoAlpha: 0, zIndex: 2, scale: 1 });

      gsap.to(nextEl, {
        autoAlpha: 1,
        duration: 1.5,
        ease: 'power2.inOut',
        onComplete: () => {
          gsap.set(currentEl, { autoAlpha: 0, zIndex: 0 });
          gsap.set(nextEl, { zIndex: 1 });
          currentIndex = nextIndex;
          timer = gsap.delayedCall(2, nextSlide);
        }
      });
      gsap.to(nextEl, { scale: 1.05, duration: 5, ease: 'none' });
    };

    timer = gsap.delayedCall(3.5, nextSlide);

    // --- 3. THE TEXT ENTRANCE SEQUENCE ---
    const mm = gsap.matchMedia();

    mm.add({
      isDesktop: "(min-width: 768px)",
      isMobile: "(max-width: 767px)"
    }, (context) => {
      const { isDesktop, isMobile } = context.conditions;

      // Condition: Always animate on Desktop. On Mobile, only animate if it's a fresh load.
      if (isDesktop || (isMobile && isFreshLoad.current)) {

        document.fonts.ready.then(() => {
          // Unhide parent containers safely
          gsap.set([titleRef.current, leftContentRef.current, rightContentRef.current], { autoAlpha: 1 });

          // DOUBLE SPLIT: Main Title
          const titleParent = new SplitText(titleRef.current, { type: 'lines', linesClass: 'overflow-hidden' });
          const titleChild = new SplitText(titleParent.lines, { type: 'lines', linesClass: 'split-child will-change-transform' });

          // DOUBLE SPLIT: Side Paragraphs
          const sideTextParents = new SplitText('.split-text-side', { type: 'lines', linesClass: 'overflow-hidden pb-1' });
          const sideTextChildren = new SplitText(sideTextParents.lines, { type: 'lines', linesClass: 'split-child will-change-transform' });

          // Push all split text down beneath their masks
          gsap.set([titleChild.lines, sideTextChildren.lines], { yPercent: 135 });

          // Master Entrance Timeline
          const entranceTl = gsap.timeline({
            delay: 0.6,
            defaults: { force3D: true }
          });

          // 1. Reveal Title
          entranceTl.to(titleChild.lines, {
            yPercent: 0,
            duration: 1.2,
            stagger: 0.12,
            ease: 'power4.out',
          })
            // 2. Reveal Side Paragraphs
            .to(sideTextChildren.lines, {
              yPercent: 0,
              duration: 1,
              stagger: 0.05,
              ease: 'power3.out',
            }, "-=0.8")
            // 3. Slide in Left Elements
            .fromTo('.slide-from-left',
              { x: -30, autoAlpha: 0 },
              { x: 0, autoAlpha: 1, duration: 0.85, ease: 'power3.out' },
              "-=0.9"
            )
            // 4. Slide in Right Elements
            .fromTo('.slide-from-right',
              { x: 30, autoAlpha: 0 },
              { x: 0, autoAlpha: 1, duration: 0.85, ease: 'power3.out' },
              "-=0.9"
            );
        });

      } else {
        // Mobile Refresh Fallback: Skip animation, just instantly reveal the text
        gsap.set([titleRef.current, leftContentRef.current, rightContentRef.current], { autoAlpha: 1 });
      }
    });

    // --- 4. PINNING ---
    const pin = ScrollTrigger.create({
      trigger: bgRef.current,
      start: 'top top',
      endTrigger: 'html',
      end: 'bottom bottom',
      pin: true,
      pinSpacing: false,
    });

    return () => {
      if (timer) timer.kill();
      gsap.killTweensOf(slides);
      pin.kill();
    };

  }, { dependencies: [flipFinished], scope: container });

  return (
    <main ref={container} className="relative w-full overflow-hidden bg-neutral-950 text-white">

      {/* FIXED BACKGROUND */}
      <div ref={bgRef} className="absolute left-0 top-0 z-0 min-h-dvh w-full overflow-hidden bg-neutral-950">
        {imgData.map((img, index) => (
          <div
            key={img.src}
            data-flip-id={index === 0 ? 'hero-flip' : undefined}
            aria-hidden="true"
            className="hero-slide absolute inset-0 h-full w-full will-change-transform"
          >
            <Image
              src={img.src}
              alt={img.alt}
              fill
              priority={index === 0}
              className="object-cover"
              sizes="100vw"
              loading='eager'
            />
          </div>
        ))}
        {/* Overlays */}
        <div className="hero-overlay absolute inset-0 z-20 bg-gradient-to-t from-black/95 via-black/45 to-black/10" />
        <div className="hero-overlay absolute inset-0 z-20 bg-[linear-gradient(to_right,rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.06)_1px,transparent_1px)] bg-[size:56px_56px] opacity-40" />
      </div>

      {/* FOREGROUND CONTENT */}
      <section
        aria-labelledby="hero-title"
        className="relative z-30 flex min-h-dvh w-full flex-col justify-end  pb-5 pt-[80px]  sm:pt-[150px]  sm:pb-6 px-4 md:px-6 pointer-events-none"
      >
        <div className="mb-[clamp(1.5rem,5vw,5rem)] grid w-full gap-6 md:grid-cols-2 md:items-end md:gap-10 pointer-events-auto">

          {/* LEFT SIDE CONTENT */}
          <div ref={leftContentRef} className="invisible max-w-sm">
            {/* Wrapper for sliding elements (Eyebrow & Tag) */}
            <div className="slide-from-left">
              <p className="mb-3 font-helvic text-[11px] uppercase tracking-[0.18em] text-white/72 sm:text-xs">
                {heroContent.eyebrow}
              </p>
              <p className="w-fit border border-white/20 bg-white/10 px-3 py-1.5 font-helvic text-[10px] uppercase tracking-[0.2em] text-white/90 backdrop-blur-sm">
                {heroContent.tag}
              </p>
            </div>

            {/* Target for Double Split line animation */}
            <p className="split-text-side mt-4 max-w-[32ch] font-helvic text-sm leading-3.5 text-white/76 sm:text-base sm:leading-4">
              {heroContent.left}
            </p>
          </div>

          {/* RIGHT SIDE CONTENT */}
          <div ref={rightContentRef} className="invisible flex max-w-md flex-col items-start gap-5 md:ml-auto md:items-end md:text-right">
            {/* Target for Double Split line animation */}
            <p className="split-text-side leading-3.5 sm:leading-4 font-helvic text-sm  text-white/78 sm:text-base md:text-lg text-left md:text-right">
              {heroContent.description}
            </p>

            {/* Target for sliding element (Button) */}
            {/* <AnimatedCTA
              href="#contact"
              text={heroContent.cta}
              className="slide-from-right"
            /> */}
          </div>
        </div>

        {/* BOTTOM TITLE */}
        <div className="w-full pointer-events-auto">
          <p
            id="hero-title"
            ref={titleRef}
            className="invisible m-0 p-0 font-futura text-[clamp(3.4rem,10.2vw,10.5rem)] uppercase leading-[clamp(3.4rem,10.2vw,10.5rem)] text-white wrap-break-word"
          >
            {heroContent.titleLine1}{' '}{heroContent.titleLine2}
          </p>
        </div>

      </section>
    </main>
  );
};

export default Hero;