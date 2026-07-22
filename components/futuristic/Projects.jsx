"use client";

import React from "react";
import Image from "next/image"; // 1. Added Next.js Image import

import gsap from "gsap";
import BlockReveal from "../helper/BlockReveal";
import LineAnimation from "../helper/LineAnimation";
import RevealText from "../helper/RevealText";


gsap.config({ force3D: true });

const ProjectImg = [
  '/projectImg/1.webp',
  '/projectImg/2.webp',
  '/projectImg/3.webp',
  '/projectImg/4.webp',
  '/projectImg/5.webp',
  '/projectImg/6.webp',
  '/projectImg/7.webp',
  '/projectImg/8.webp',
  '/projectImg/9.webp',
  '/projectImg/10.webp',
];

// --- SUB-COMPONENT: Editorial Parallax Image ---
const GalleryImage = ({ src, index }) => {


  // Removed the forced aspect-ratio classes. 
  // Now the container will perfectly wrap the 100% natural height of the image.
  const getGridStyle = (i) => {
    const styles = [
      "col-span-1 md:col-span-1 w-full mt-0 md:mt-12",
      "col-span-1 md:col-span-2 w-[90%] md:w-[75%] justify-self-end mt-16 md:mt-48",
      "col-span-1 md:col-span-1 w-[85%] justify-self-center mt-12 md:mt-0",
      "col-span-1 md:col-span-1 w-[100%] mt-24 md:mt-64",
      "col-span-1 md:col-span-2 w-[80%] justify-self-center mt-12 md:mt-32",
      "col-span-1 md:col-span-1 w-[70%] md:w-[90%] justify-self-end mt-20 md:-mt-12",
    ];
    return styles[i % styles.length];
  };

  return (
    // 1. The Entrance Wrapper: Handles the fade-up without flickering
    <div className={` relative ${getGridStyle(index)}`}>

      <div
        className="relative w-full overflow-hidden bg-background/5 border border-background/10 "
      >
        <Image
          src={src}
          alt={`Visual Archive ${index + 1}`}
          width={1200}
          height={800}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 75vw, 50vw"
          className="w-full h-auto object-contain "
        />

      </div>
    </div>
  );
};

// --- MAIN GALLERY SECTION ---
export default function Projects() {

  return (
    <section

      id="projects"
      className=" w-full py-12 lg:py-20 pb-32 lg:pb-48 bg-foreground border-t border-background/5 px-4 md:px-12 flex flex-col items-center overflow-hidden"
    >
      <div className="w-full flex flex-col  relative z-20">

        {/* Section Header */}
        <div className="flex flex-col items-start w-full mb-16 lg:mb-24">
          <div className="w-fit max-w-50">
            <div className="mb-4">
              <BlockReveal
                text="Gallery"
                className="font-futura text-[8vw] md:text-[4vw] uppercase  text-background pb-1"
              />
            </div>
            <LineAnimation />
          </div>

          <div className="mt-8 md:mt-12 max-w-2xl">
            <span className="font-social text-[10px] tracking-[0.3em] text-red-600 uppercase font-bold block mb-4">
              // VISUAL FIELD DOCUMENTATION
            </span>
            <RevealText
              text="Raw, unfiltered field captures. Observe the absolute precision and scale of our deployed envelope systems across the mainland operations."
              className="font-helvic text-background/60 text-sm md:text-base leading-relaxed font-light"
            />
          </div>
        </div>

        {/* The Scattered Grid Container */}
        <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-4 md:gap-x-12 gap-y-12 items-start mt-8">
          {ProjectImg.map((src, index) => (
            <GalleryImage key={index} src={src} index={index} />
          ))}
        </div>

      </div>
    </section>
  );
}