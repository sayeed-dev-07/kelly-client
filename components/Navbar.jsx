'use client';

import React, { useRef, useContext, useState } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { IntroContext } from './intro/ClientLayout';
import AnimatedCTA from './helper/AnimatedCTA';
import { useLenis } from './lenis/LenisProvider';



gsap.registerPlugin(useGSAP, ScrollTrigger);

gsap.config({
  force3D: true
});

const navLinks = [
  { name: 'ABOUT', href: '#about' },
  { name: 'SERVICES', href: '#services' },
  { name: 'VIDEOS', href: '#videos' },
  { name: 'GALLERY', href: '#projects' },
  { name: 'REVIEWS', href: '#reviews' },
  { name: 'FAQ', href: '#faq' },
  { name: 'CONTACT', href: '#footer' },
];



// --- DESKTOP NAV ITEM ---
const NavItem = ({ link, index, registerRef }) => {
  const itemRef = useRef(null);
  const lineRef = useRef(null);

  const lenis = useLenis();


  const setRefs = (el) => {
    itemRef.current = el;
    registerRef(el, index);
  };

  const { contextSafe } = useGSAP({ scope: itemRef });

  const handleEnter = contextSafe(() => {
    gsap.to(lineRef.current, { scaleX: 1, duration: 0.35, ease: 'power3.out' });
  });

  const handleLeave = contextSafe(() => {
    gsap.to(lineRef.current, { scaleX: 0, duration: 0.35, ease: 'power3.out' });
  });

  // THE FIX: Intercept the click and smooth scroll manually
  const handleClick = (e) => {
    e.preventDefault();
    if (lenis) {
      // force: true tells Lenis to ignore current momentum and instantly go to target
      lenis.scrollTo(link.href, { force: true });
    } else {
      // Fallback just in case Lenis isn't loaded yet
      const target = document.querySelector(link.href);
      if (target) target.scrollIntoView({ behavior: 'smooth' });
    }
  };


  return (
    <a
      href={link.href}
      ref={setRefs}
      onClick={handleClick}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      className="relative flex flex-col justify-center font-helvic text-sm font-bold uppercase tracking-[0.16em] text-white/90 py-1"
    >
      {link.name}
      <span
        ref={lineRef}
        className="absolute bottom-0 left-0 h-0.5 w-full bg-white origin-left scale-x-0"
      />
    </a>
  );
};

// --- MAIN NAVBAR COMPONENT ---
const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const headerRef = useRef(null);
  const logoRef = useRef(null);
  const linksRef = useRef([]);
  const btnRef = useRef(null);
  const mobileBtnRef = useRef(null);
  const lenis = useLenis();

  const mobileOverlayRef = useRef(null);
  const mobileLinksRef = useRef([]);

  const menuTl = useRef(null);
  const isInitialRender = useRef(true);

  const { flipFinished } = useContext(IntroContext);

  const registerLinkRef = (el, index) => {
    linksRef.current[index] = el;
  };

  const registerMobileLinkRef = (el, index) => {
    mobileLinksRef.current[index] = el;
  };



  // THE FIX: Mobile click interceptor
  const handleMobileClick = (e, href) => {
    e.preventDefault();
    setIsMenuOpen(false); // Close menu first

    setTimeout(() => {
      if (lenis) {
        lenis.scrollTo(href, { force: true });
      } else {
        const target = document.querySelector(href);
        if (target) {
          target.scrollIntoView({ behavior: 'smooth' });
        }
      }
    }, 400);
  };


  // Add this handler inside your Navbar component (near your other click handlers)
  const handleLogoClick = (e) => {
    e.preventDefault();
    if (lenis) {
      // Tells Lenis to smoothly scroll to 0 pixels (the very top)
      lenis.scrollTo(0, { force: true });
    } else {
      // Fallback just in case
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };


  useGSAP(() => {
    menuTl.current = gsap.timeline({ paused: true })
      .to(mobileOverlayRef.current, {
        autoAlpha: 1,
        duration: 0.4,
        ease: 'power2.out'
      })
      .fromTo(mobileLinksRef.current,
        { x: 40, autoAlpha: 0 },
        { x: 0, autoAlpha: 1, duration: 0.5, stagger: 0.08, ease: 'power3.out' },
        "-=0.2"
      );
  }, []);

  useGSAP(() => {
    if (isInitialRender.current) {
      isInitialRender.current = false;
      return;
    }

    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
      menuTl.current.play();
    } else {
      document.body.style.overflow = '';
      menuTl.current.reverse();
    }
  }, { dependencies: [isMenuOpen] });

  useGSAP(() => {
    gsap.set(headerRef.current, { yPercent: -100, autoAlpha: 0 });
    gsap.set(logoRef.current, { autoAlpha: 0, x: -20 });
    gsap.set(linksRef.current, { autoAlpha: 0, y: -10 });
    gsap.set(btnRef.current, { autoAlpha: 0, x: 20 });
    gsap.set(mobileBtnRef.current, { autoAlpha: 0, scale: 0.8 });

    if (flipFinished) {
      const tl = gsap.timeline({
        delay: 0.5,
        defaults: { force3D: true },
        onComplete: () => {
          ScrollTrigger.create({
            start: "top -150",
            onUpdate: (self) => {
              if (self.direction === 1) {
                gsap.to(headerRef.current, { yPercent: -100, duration: 0.4, ease: 'power3.out', overwrite: 'auto' });
              } else {
                gsap.to(headerRef.current, { yPercent: 0, duration: 0.4, ease: 'power3.out', overwrite: 'auto' });
              }
            }
          });
        }
      });

      tl.to(headerRef.current, { yPercent: 0, autoAlpha: 1, duration: 0.8, ease: 'power3.out' })
        .to(logoRef.current, { autoAlpha: 1, x: 0, duration: 0.6, ease: 'power2.out' }, "-=0.4")
        .to(linksRef.current, { autoAlpha: 1, y: 0, duration: 0.5, stagger: 0.08, ease: 'power2.out' }, "-=0.4")
        .to(btnRef.current, { autoAlpha: 1, x: 0, duration: 0.6, ease: 'power2.out' }, "-=0.6")
        .to(mobileBtnRef.current, { autoAlpha: 1, scale: 1, duration: 0.6, ease: 'back.out(1.5)' }, "-=0.6");
    }
  }, { dependencies: [flipFinished] });

  return (
    <>
      {/* --- DESKTOP TOP HEADER --- */}
      <header ref={headerRef} className="fixed top-0 left-0 w-full z-[90] px-2 py-2.5 md:px-6  sm:py-4 pointer-events-none invisible bg-black/30">
        <div className="flex justify-between items-center w-full pointer-events-auto">

          <div ref={logoRef} onClick={handleLogoClick} className="shrink-0 cursor-pointer">
            <svg viewBox="0 0 420 120" role="img" aria-label="Kelley Roofing USA Logo" xmlns="http://www.w3.org/2000/svg" className="h-10 md:h-12 w-auto transition-transform duration-500 hover:scale-105">
              <polyline points="28,74 60,44 92,74" fill="none" stroke="#E63B2E" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" opacity="0.28"></polyline>
              <polyline points="28,62 60,32 92,62" fill="none" stroke="#E63B2E" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" opacity="0.6"></polyline>
              <polyline points="28,50 60,20 92,50" fill="none" stroke="#E63B2E" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round"></polyline>
              <line x1="28" y1="82" x2="92" y2="82" stroke="#E63B2E" strokeWidth="2.5" strokeLinecap="round"></line>
              <line x1="112" y1="18" x2="112" y2="96" stroke="#E63B2E" strokeWidth="1" opacity="0.3"></line>
              <text x="128" y="62" fontFamily="var(--font-heading), Arial, sans-serif" fontWeight="700" fontSize="45" fill="#FFFFFF" letterSpacing="-1" className="font-bold">
                KELLEY <tspan fill="#E63B2E" fontFamily="var(--font-noto-serif-display), 'Georgia', serif" fontWeight="400">R&amp;R</tspan>
              </text>
              <text x="128" y="86" fontFamily="var(--font-subheading), Arial, sans-serif" fontWeight="400" fontSize="12.5" fill="#E63B2E" className="font-normal">
                ROOF REPAIR &amp; REPLACEMENT
              </text>
            </svg>
          </div>

          <nav className="hidden xl:flex items-center gap-6 xl:gap-6 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
            {navLinks.map((link, i) => (
              <NavItem key={link.name} link={link} index={i} registerRef={registerLinkRef} />
            ))}
          </nav>

          <div className="hidden sm:flex items-center">
            <AnimatedCTA
              ref={btnRef}
              href="#footer"
              text="BOOK APPOINTMENT"
              className="rounded-full px-6! !xl:px-8 py-2!  text-black"
            />
          </div>
        </div>
      </header>

      {/* --- MOBILE FULLSCREEN MENU OVERLAY --- */}
      <div
        ref={mobileOverlayRef}
        className="fixed inset-0  z-[95] invisible bg-neutral-950/95 backdrop-blur-lg flex flex-col justify-end items-end pt-10 pb-24 pr-8 sm:pr-12 pointer-events-auto"
      >
        <nav className="flex flex-col items-end gap-4">
          {navLinks.map((link, i) => (
            <a
              key={link.name}
              href={link.href}
              onClick={(e) => handleMobileClick(e, link.href)}
              ref={(el) => registerMobileLinkRef(el, i)}
              className="font-futura text-2xl sm:text-4xl font-bold uppercase tracking-widest text-white transition-colors hover:text-brand-red invisible"
            >
              {link.name}
            </a>
          ))}
          <div ref={(el) => registerMobileLinkRef(el, navLinks.length)} className="mt-4 invisible">
            <AnimatedCTA func={(e) => handleMobileClick(e, '#footer')} href="#footer" text="BOOK APPOINTMENT" />
          </div>
        </nav>
      </div>

      {/* --- MOBILE BOTTOM-RIGHT FIXED BUTTON --- */}
      <button
        ref={mobileBtnRef}
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        className="xl:hidden invisible fixed bottom-6 right-6 z-[100] w-14 h-14  border-2 border-white/20 flex flex-col bg-black/80 items-center justify-center gap-[2px] transition-colors duration-300 hover:border-white focus:outline-none pointer-events-auto"
      >
        {isMenuOpen ? (
          <div className="flex flex-col items-center justify-center transform transition-transform duration-300">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="square" strokeLinejoin="miter">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
            <span className="text-[9px] font-helvic uppercase tracking-widest text-white mt-1">Close</span>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center transform transition-transform duration-300">
            <div className="flex flex-col gap-[3px] w-5 mb-1">
              <div className="flex items-center justify-between"><div className="h-[2px] w-[70%] bg-white" /><div className="h-[2px] w-[2px] bg-white" /></div>
              <div className="flex items-center justify-between"><div className="h-[2px] w-[70%] bg-white" /><div className="h-[2px] w-[2px] bg-white" /></div>
              <div className="flex items-center justify-between"><div className="h-[2px] w-[70%] bg-white" /><div className="h-[2px] w-[2px] bg-white" /></div>
            </div>
            <span className="text-[9px] font-helvic uppercase tracking-widest text-white">Menu</span>
          </div>
        )}
      </button>
    </>
  );
};

export default Navbar;