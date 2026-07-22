"use client";

import React, { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ShieldCheck, Zap, Globe, ArrowUpRight } from "lucide-react";
import BlockReveal from "./helper/BlockReveal";
import RevealText from "./helper/RevealText";
import LineAnimation from "./helper/LineAnimation";

gsap.registerPlugin(useGSAP, ScrollTrigger);

gsap.config({
  force3D: true
})

// --- DATA OBJECT ---
const serviceTiers = [
  {
    name: "Residential Shield",
    desc: "Premium residential roofing systems for private estates and luxury homes.",
    highlight: "ESTATES & RESIDENCES",
    features: [
      "Historical Slate & Copper Detailing",
      "Designer Architectural Shingles",
      "Annual Diagnostic Inspections",
      "Storm Damage Response Dispatch",
      "15-Year Labor Guarantee"
    ],
    isPromoted: false
  },
  {
    name: "Commercial Pro",
    desc: "High-performance setups for commercial buildings, retail, and multifamily complexes.",
    highlight: "NATIONAL STANDARD",
    features: [
      "Thermoplastic Polyolefin (TPO) Membrane",
      "Ethylene Propylene Diene Terpolymer (EPDM)",
      "Zero-Disruption Project Execution",
      "Active UAV Thermal Inspection Reports",
      "25-Year Performance Warranty"
    ],
    isPromoted: true
  },
  {
    name: "Industrial Enterprise",
    desc: "Heavy-duty shielding engineered for warehouses, manufacturing, and distribution centers.",
    highlight: "HEAVY INFRASTRUCTURE",
    features: [
      "Reinforced Metal Standing Seams",
      "Elastomeric Sub-Sealing Barriers",
      "Chemical & Thermal Stress Resistance",
      "Lifetime Roof Management Plan",
      "Unlimited Workmanship Warranty"
    ],
    isPromoted: false
  }
];

// --- SUB-COMPONENT: Safe GSAP Hover Card ---
const ServiceCard = ({ tier }) => {
  const cardRef = useRef(null);
  const iconRef = useRef(null);
  const borderRef = useRef(null);
  const btnRef = useRef(null);
  const btnIconRef = useRef(null);

  const { contextSafe } = useGSAP({ scope: cardRef });

  const handleEnter = contextSafe(() => {
    // Lift the card slightly
    gsap.to(cardRef.current, { y: -10, duration: 0.5, ease: "power3.out" });
    // Reveal the red border
    gsap.to(borderRef.current, { autoAlpha: 1, duration: 0.4, ease: "power2.out" });
    // Pop the top icon
    gsap.to(iconRef.current, { scale: 1.15, color: "#ef4444", duration: 0.4, ease: "back.out(1.5)" });
    // Button hover effect (turns red with white text)
    gsap.to(btnRef.current, { backgroundColor: "#ef4444", color: "#ffffff", borderColor: "#ef4444", duration: 0.3 });
    gsap.to(btnIconRef.current, { x: 4, y: -4, duration: 0.3, ease: "power2.out" });
  });

  const handleLeave = contextSafe(() => {
    gsap.to(cardRef.current, { y: 0, duration: 0.5, ease: "power3.out" });
    gsap.to(borderRef.current, { autoAlpha: 0, duration: 0.4, ease: "power2.out" });

    // For light theme, the default unhovered icon is a dark transparent color or solid red if promoted
    gsap.to(iconRef.current, {
      scale: 1,
      color: tier.isPromoted ? "#ef4444" : "rgba(0, 0, 0, 0.3)",
      duration: 0.4,
      ease: "power3.out"
    });

    // Revert button to original dark theme colors
    gsap.to(btnRef.current, {
      backgroundColor: tier.isPromoted ? "#ef4444" : "transparent",
      color: tier.isPromoted ? "#ffffff" : "#0a0a0a", // Using #0a0a0a to simulate 'text-background'
      borderColor: tier.isPromoted ? "#ef4444" : "#0e0e0e",
      duration: 0.3
    });

    gsap.to(btnIconRef.current, { x: 0, y: 0, duration: 0.3, ease: "power2.out" });
  });

  return (
    <div
      ref={cardRef}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      // Light theme adjustments: bg-background/[0.04] gives a very subtle dark tint to the white card
      className={`service-card cursor-pointer relative flex flex-col justify-between p-4 md:p-6 xl:p-12 bg-background/[0.04] border invisible will-change-transform ${tier.isPromoted ? "border-red-600/50" : "border-background/10"
        }`}
    >
      {/* GSAP Hover Border Overlay */}
      <div ref={borderRef} className="absolute inset-0 border border-red-600 invisible pointer-events-none" />

      {/* Promoted Tag */}
      {tier.isPromoted && (
        <span className="absolute -top-3 left-8 font-helvic text-[9px] font-bold bg-red-600 text-white py-1 px-3 uppercase tracking-widest">
          MOST REQUESTED
        </span>
      )}

      {/* Card Top Section */}
      <div className="flex flex-col gap-3">
        <div className="flex justify-between items-start">
          <span className="font-social text-[10px] text-background/50 uppercase tracking-[0.2em] font-bold">
            {tier.highlight}
          </span>
          <div ref={iconRef} className="will-change-transform">
            {tier.isPromoted ? (
              <Zap className="w-5 h-5 text-red-600" />
            ) : (
              // Light theme inactive icon color
              <Globe className="w-5 h-5 text-background/30" />
            )}
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <h3 className="font-futura font-black text-3xl uppercase tracking-tighter text-background">
            {tier.name}
          </h3>
          <p className="font-helvic text-sm text-background/60 leading-relaxed font-light py-3">
            {tier.desc}
          </p>
        </div>

        <hr className="border-background/10 " />

        {/* Features List */}
        <ul className="flex flex-col gap-2 my-2">
          {tier.features.map((feature, idx) => (
            <li key={idx} className="flex items-start gap-3 font-helvic text-xs text-background/80 leading-relaxed">
              <ShieldCheck className="w-4 h-4 text-red-600 shrink-0 mt-[2px]" />
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Card Button */}
      <div className="mt-10">
        <a href="#footer">
          <button
            ref={btnRef}
            onClick={() => {
              const contactSection = document.getElementById("contact");
              if (contactSection) contactSection.scrollIntoView({ behavior: "smooth" });
            }}
            // Used inline styles for initial state so GSAP can animate them cleanly
            style={{
              backgroundColor: tier.isPromoted ? "#ef4444" : "transparent",
              borderColor: tier.isPromoted ? "#ef4444" : "#0e0e0e",
              color: tier.isPromoted ? "#ffffff" : "currentColor"
            }}
            className={`w-full py-4 text-[10px] font-social font-bold uppercase tracking-[0.2em] border flex items-center justify-center gap-2 cursor-pointer focus:outline-none ${tier.isPromoted ? 'text-white' : 'text-background'
              }`}
          >
            <span>Contact US</span>
            <div ref={btnIconRef} className="will-change-transform">
              <ArrowUpRight className="w-4 h-4" />
            </div>
          </button>
        </a>
      </div>

    </div>
  );
};

// --- MAIN SERVICES SECTION ---
export default function Services() {
  const containerRef = useRef(null);

  useGSAP(() => {
    // Stagger the service cards up when the grid enters the viewport
    gsap.fromTo(".service-card",
      { y: 50, autoAlpha: 0 },
      {
        y: 0,
        autoAlpha: 1,
        duration: 1,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".services-grid",
          start: "top 80%",
        }
      }
    );
  }, { scope: containerRef });

  return (
    <section
      id="services"
      ref={containerRef}
      // Background is foreground (white), border is background/5 (dark transparent)
      className="relative w-full py-12 lg:py-20 bg-foreground border-t border-background/5 px-4 md:px-12 flex flex-col overflow-hidden"
    >

      {/* Top Header Label */}
      <div className="flex flex-col items-start w-full mb-6 lg:mb-20">
        <div className="w-fit max-w-[200px]">
          <div className="mb-4">
            <BlockReveal
              text="Services"
              className="font-futura text-[8vw] md:text-[4vw] uppercase  text-background pb-1"
            />
          </div>
          <LineAnimation />
        </div>
      </div>

      {/* Main Section Header */}
      <div className="flex flex-col items-start gap-6 w-full mb-16">
        <span className="font-social text-[10px] tracking-[0.3em] text-red-600 uppercase font-bold">
          // MAINLAND PROGRAM SPECS
        </span>

        {/* Custom Double Split Reveal */}
        <div className="leading-[0.85]">
          <RevealText
            text="SELECT WORK"
            className="font-futura font-black text-[clamp(2.5rem,7vw,7.5rem)] leading-[clamp(2.5rem,7vw,7.5rem)] uppercase tracking-tighter text-background"
          />
          <RevealText
            text="PROGRAM."
            className="font-futura font-black text-[clamp(2.5rem,7vw,7.5rem)] leading-[clamp(2.5rem,7vw,7.5rem)] uppercase tracking-tighter text-red-600"
          />
        </div>

        <RevealText className="max-w-2xl font-helvic text-background/60 text-sm md:text-base leading-relaxed font-light mt-4" text={'Engineered roofing architectures built to survive. Select a program classification to secure your physical capital.'} />
      </div>

      {/* Tiers Grid - Full Width */}
      <div className="services-grid w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 xl:gap-8 items-stretch">
        {serviceTiers.map((tier, index) => (
          <ServiceCard key={index} tier={tier} />
        ))}
      </div>

    </section>
  );
}