"use client";

import React, { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Shield, Award, MapPin, Users } from "lucide-react";
import LineAnimation from "./helper/LineAnimation";
import RevealText from "./helper/RevealText";
import BlockReveal from "./helper/BlockReveal";


gsap.registerPlugin(useGSAP, ScrollTrigger);

// --- DATA OBJECT ---
const aboutContent = {
  titleLine1: "DEFENDING AMERICA'S",
  titleLine2: "INFRASTRUCTURE.",
  description:
    "Since founding, Kelly Roofing USA has engineered high-integrity building envelope shields for commercial, industrial, residential, and institutional assets across the US mainland. We eliminate operational disruption by utilizing high-precision drone inspections, automated diagnostics, and certified structural roof coatings standard with 25-year performance warranties.",
  quote:
    "\"We don't install shingles; we deploy permanent physical armor that survives continental stress models.\"",
  stats: [
    { icon: Award, value: "25+ YEARS", label: "ROOFING INDUSTRY EXPERIENCE" },
    { icon: MapPin, value: "12 STATES", label: "ACTIVE CONTINENTAL OPERATIONS" },
    { icon: Shield, value: "100% RATE", label: "GUARANTEED INSURANCE SAFETY" },
    { icon: Users, value: "10K+ SITES", label: "EXPERIENCE THATS UNMATCHED" },
  ],
};

// --- SUB-COMPONENT: Safe GSAP Hover Cards ---
const StatCard = ({ stat }) => {
  const cardRef = useRef(null);
  const iconRef = useRef(null);
  const borderRef = useRef(null);

  const { contextSafe } = useGSAP({ scope: cardRef });

  const handleEnter = contextSafe(() => {
    gsap.to(cardRef.current, { y: -5, duration: 0.4, ease: "power3.out" });
    gsap.to(borderRef.current, { autoAlpha: 1, duration: 0.4, ease: "power2.out" });
    gsap.to(iconRef.current, { scale: 1.15, rotate: 5, color: "#ef4444", duration: 0.4, ease: "back.out(1.5)" });
  });

  const handleLeave = contextSafe(() => {
    gsap.to(cardRef.current, { y: 0, duration: 0.4, ease: "power3.out" });
    gsap.to(borderRef.current, { autoAlpha: 0, duration: 0.4, ease: "power2.out" });
    gsap.to(iconRef.current, { scale: 1, rotate: 0, color: "currentColor", duration: 0.4, ease: "power3.out" });
  });

  const IconComponent = stat.icon;

  return (
    <div
      ref={cardRef}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      className="stat-card relative flex flex-col gap-6 p-8 bg-white/[0.02] border border-white/10 cursor-pointer will-change-transform invisible"
    >
      <div ref={borderRef} className="absolute inset-0 border border-brand-red invisible pointer-events-none" />

      <div ref={iconRef} className="text-white/60 w-fit origin-left will-change-transform">
        <IconComponent className="w-7 h-7" strokeWidth={1.5} />
      </div>

      <div className="flex flex-col gap-1 mt-auto">
        <span className="font-futura font-black text-2xl md:text-3xl text-white uppercase tracking-tighter">
          {stat.value}
        </span>
        <span className="font-helvic text-[9px] md:text-[10px] text-white/50 uppercase tracking-[0.2em] font-bold">
          {stat.label}
        </span>
      </div>
    </div>
  );
};


// --- MAIN ABOUT SECTION ---
export default function About() {
  const containerRef = useRef(null);

  useGSAP(() => {
    // 1. Entrance animation for the paragraphs
    gsap.fromTo(".fade-up-text",
      { y: 30, autoAlpha: 0 },
      {
        y: 0,
        autoAlpha: 1,
        duration: 1,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".fade-up-trigger",
          start: "top 85%",
        }
      }
    );

    // 2. Entrance animation for the Stats Grid
    gsap.fromTo(".stat-card",
      { y: 40, autoAlpha: 0 },
      {
        y: 0,
        autoAlpha: 1,
        duration: 1,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".stats-grid-trigger",
          start: "top 85%",
        }
      }
    );

  }, { scope: containerRef });

  return (
    <section
      id="about"
      ref={containerRef}
      className="relative w-full min-h-screen py-12 lg:py-20 bg-neutral-950 text-white px-4 md:px-12 overflow-hidden"
    >
      {/* Top Header */}
      <div className="flex flex-col items-start w-full mb-6 lg:mb-20">
          <div className="w-fit max-w-[200px]">
            <div className="mb-4">
              <BlockReveal
                text="About"
                className="font-futura text-[8vw] md:text-[4vw] uppercase  text-foreground pb-1"
              />
            </div>
            <LineAnimation black={false} />
          </div>
        </div>

      <div className=" grid grid-cols-1 md:grid-cols-12 gap-x-8 gap-y-6 relative">

        {/* Decorative Vertical Text */}
        <div className="hidden md:flex col-span-1 justify-center">
          <p className="font-helvic text-[10px] uppercase tracking-[0.3em] text-white/30 [writing-mode:vertical-lr] rotate-180">
            // Company Profile // Core Legacy
          </p>
        </div>

        {/* --- MAIN CONTENT AREA (FLEXBOX REFACTOR) --- */}
        <div className="md:col-span-11 flex flex-col w-full gap-y-6 sm:gap-y-12">

          {/* 1. Huge Reveal Title - Left Aligned */}
          <div className="w-full flex items-start justify-start">
            <div className="flex flex-col gap-0 leading-[0.85] w-full">
              <RevealText
                text={aboutContent.titleLine1}
                className="font-futura text-[clamp(2.5rem,7vw,7.5rem)] font-black uppercase tracking-tighter leading-[clamp(2.5rem,7vw,7.5rem)]"
              />
              <RevealText
                text={aboutContent.titleLine2}
                className="font-futura text-[clamp(2.5rem,7vw,7.5rem)] leading-[clamp(2.5rem,7vw,7.5rem)]  font-black text-brand-red uppercase tracking-tighter"
              />
            </div>
          </div>

          {/* 2. Asymmetrical Description & Quote - Right Aligned via Flex */}
          <div className="w-full flex justify-end fade-up-trigger mt-4 lg:mt-8">
            <div className="flex flex-col gap-10 w-full max-w-200">

              <RevealText text={aboutContent.description} className="font-helvic text-base md:text-lg md:leading-5 leading-4.5 text-white/70 font-light" />

              <div className="fade-up-text invisible flex gap-6">
                {/* Minimalist vertical line marker */}
                <div className="w-0.5 bg-brand-red flex-shrink-0" />
                <RevealText text={aboutContent.quote} className="font-social italic text-xl md:text-2xl text-white/90 w-full leading-snug tracking-wide" />
              </div>

            </div>
          </div>

          {/* 3. Stats Grid */}
          <div className="w-full mt-10 lg:mt-20 stats-grid-trigger">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
              {aboutContent.stats.map((stat, i) => (
                <StatCard key={i} stat={stat} />
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}