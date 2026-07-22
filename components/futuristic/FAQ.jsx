"use client";

import React, { useState, useRef, useId } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Plus } from "lucide-react";
import LineAnimation from "../helper/LineAnimation";
import RevealText from "../helper/RevealText";
import BlockReveal from "../helper/BlockReveal";

gsap.registerPlugin(ScrollTrigger);
gsap.config({ force3D: true });

// --- DATA OBJECT ---
const faqData = [
  {
    q: "What regions does Kelly Roofing USA cover?",
    a: "We deploy operations and specialized installation crews across the entire continental United States (48 mainland states). We manage commercial, industrial, residential, multifamily, and government projects from localized regional hubs for fast dispatch."
  },
  {
    q: "How do your drone thermal inspections work?",
    a: "We utilize commercial UAVs equipped with high-resolution FLIR thermal infrared cameras. These drone scans locate sub-surface moisture containment blocks, air-seal leaks, and structural stress points. This allows us to diagnose issues without drilling test holes or disrupting facility logistics."
  },
  {
    q: "What materials and systems do you install?",
    a: "We specialize in high-performance building envelopes, including Thermoplastic Polyolefin (TPO), EPDM membranes, architectural standing seam metal panels, historical slate and copper setups, and reflective elastomeric sub-seal coatings. All systems are rated up to 160 MPH wind tolerance."
  },
  {
    q: "Can you execute replacements with zero disruption?",
    a: "Yes. Zero facility down-time is our operating standard. Our project managers coordinate deployment windows directly with your logistical officers to execute deck teardowns, membrane sealing, and material staging during off-peak hours."
  },
  {
    q: "What warranties back your structural systems?",
    a: "We provide comprehensive workmanship and material performance warranties ranging from 15 to 25 years on full system replacements, depending on the asset classification (Commercial Pro vs Industrial Enterprise) and coating specifications."
  }
];

// --- SUB-COMPONENT: The Sliding Animated Line ---
const CardLine = () => {
  const lineRef = useRef(null);
  const lineContainerRef = useRef(null);

  useGSAP(() => {
    gsap.to(lineRef.current, {
      x: 0,
      duration: 0.9,
      ease: "power3.out",
      scrollTrigger: {
        trigger: lineContainerRef.current,
        start: "top 85%",
      }
    });
  }, { scope: lineContainerRef });

  return (
    <div ref={lineContainerRef} className="overflow-hidden w-full">
      <div ref={lineRef} className="w-full h-px bg-background/20 -translate-x-full" />
    </div>
  );
};

// --- SUB-COMPONENT: The Individual FAQ Accordion Row ---
const FaqItem = ({ faq }) => {
  const containerRef = useRef(null);
  const titleRef = useRef(null);
  const iconRef = useRef(null);
  const contentWrapperRef = useRef(null);

  const [isOpen, setIsOpen] = useState(false);
  const contentId = useId();

  // 1. Initial Scroll Entrance Animations
  useGSAP(() => {
    let mm = gsap.matchMedia();

    mm.add("(min-width: 768px)", () => {
      gsap.from(titleRef.current, {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 85%",
        },
        yPercent: 100,
        opacity: 0,
        duration: 1.2,
        ease: "power4.out",
        force3D: true,
      });

      gsap.from(iconRef.current, {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 85%",
        },
        scale: 0,
        duration: 0.8,
        delay: 0.2,
        ease: "back.out(1.7)",
      });
    });
  }, { scope: containerRef });

  // 2. Accordion Interaction Animations (GSAP Clip-Path + Auto Height + Rotation)
  useGSAP(() => {
    if (isOpen) {
      // Rotate the icon
      gsap.to(iconRef.current, { 
        rotate: 45, 
        duration: 0.5, 
        ease: "power3.out" 
      });
      // Expand and reveal content
      gsap.to(contentWrapperRef.current, {
        height: "auto",
        clipPath: "inset(0% 0% 0% 0%)",
        opacity: 1,
        duration: 0.5,
        ease: "power3.inOut"
      });
    } else {
      // Reset rotation
      gsap.to(iconRef.current, { 
        rotate: 0, 
        duration: 0.5, 
        ease: "power3.out" 
      });
      // Collapse and mask content
      gsap.to(contentWrapperRef.current, {
        height: 0,
        clipPath: "inset(0% 0% 100% 0%)",
        opacity: 0,
        duration: 0.4,
        ease: "power3.inOut"
      });
    }
  }, [isOpen]); // Fires every time isOpen changes

  return (
    <div ref={containerRef} className="w-full relative">
      <button
        className="w-full cursor-pointer flex justify-between items-center py-6 md:py-10 group text-left focus:outline-none will-change-transform focus-visible:ring-2 focus-visible:ring-red-600 focus-visible:ring-offset-4 focus-visible:ring-offset-foreground rounded-sm"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-controls={contentId}
      >
        <div className="overflow-hidden py-1 pr-6">
          <h2
            ref={titleRef}
            className={`font-futura text-2xl md:text-3xl lg:text-4xl uppercase tracking-tighter transition-colors duration-300 leading-[0.9] ${isOpen ? "text-red-600" : "text-background group-hover:text-red-600"}`}
          >
            {faq.q}
          </h2>
        </div>

        {/* Removed CSS rotation, leaving GSAP to handle it */}
        <div
          ref={iconRef}
          className={`flex-shrink-0 will-change-transform ${isOpen ? "text-red-600" : "text-background transition-colors duration-300"}`}
        >
          <Plus className="w-8 h-8 md:w-10 md:h-10" strokeWidth={1.5} />
        </div>
      </button>

      {/* The GSAP Target Wrapper 
        Starts with 0 height, 0 opacity, and clipped from the bottom up.
      */}
      <div
        id={contentId}
        ref={contentWrapperRef}
        className="h-0 opacity-0 overflow-hidden [clip-path:inset(0%_0%_100%_0%)] will-change-[height,clip-path,opacity]"
      >
        <div className="pb-8 md:pb-12 pr-12 md:pr-24">
          <div className="border-l-2 border-red-600 pl-6">
            <p className="font-helvic text-background/70 text-base md:text-lg leading-relaxed font-light">
              {faq.a}
            </p>
          </div>
        </div>
      </div>

      <CardLine />
    </div>
  );
};

// --- MAIN FAQ SECTION ---
export default function FAQ() {
  return (
    <section
      id="faq"
      className="relative w-full py-12 lg:py-20 bg-foreground text-background overflow-hidden"
    >
      <div className="w-full flex flex-col px-4 md:px-12">
        <div className="flex flex-col items-start w-full mb-6 lg:mb-20">
          <div className="w-fit max-w-[200px]">
            <div className="mb-4">
              <BlockReveal
                text="Protocol"
                className="font-futura text-[8vw] md:text-[4vw] uppercase text-background pb-1"
              />
            </div>
            <LineAnimation />
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-12 gap-16 items-start">
          <div className="xl:col-span-5 flex flex-col gap-6 xl:sticky xl:top-32">
            <span className="font-social text-[10px] tracking-[0.3em] text-red-600 uppercase font-bold">
              // GENERAL QUERY PROTOCOL
            </span>

            <div className="leading-[0.85]">
              <RevealText
                text="FREQUENTLY"
                className="font-futura font-black text-[clamp(2.5rem,6vw,5.5rem)] leading-[clamp(2.5rem,6vw,5.5rem)] uppercase tracking-tighter text-background"
              />
              <RevealText
                text="ASKED"
                className="font-futura font-black text-[clamp(2.5rem,6vw,5.5rem)] leading-[clamp(2.5rem,6vw,5.5rem)] uppercase tracking-tighter text-background"
              />
              <RevealText
                text="QUESTIONS."
                className="font-futura font-black text-[clamp(2.5rem,6vw,5.5rem)] leading-[clamp(2.5rem,6vw,5.5rem)] uppercase tracking-tighter text-red-600"
              />
            </div>

            <RevealText text={`Review detailed specifications regarding our mainland mobilization, diagnostics, and warranty protocols.`} className="max-w-md font-helvic text-background/60 text-sm md:text-base leading-relaxed font-light mt-4" />
          </div>

          <div className="xl:col-span-7 flex flex-col mt-8 xl:mt-0">
            <CardLine />
            {faqData.map((faq, index) => (
              <FaqItem key={index} faq={faq} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}