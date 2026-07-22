"use client";

import React, { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Play, ArrowUpRight } from "lucide-react";

import BlockReveal from "../helper/BlockReveal";
import RevealText from "../helper/RevealText";
import LineAnimation from "../helper/LineAnimation";


gsap.registerPlugin(useGSAP, ScrollTrigger);

const videosData = [
  {
    title: "Mainland Drone Scan",
    location: "Dallas, TX",
    desc: "UAV thermal inspection logs for a 120k sqft retail center.",
    id: "LOG_0982",
    videoId: "Og3UoFwbl04" // You can swap these with real YouTube IDs
  },
  {
    title: "Thermal Analysis Protocol",
    location: "Chicago, IL",
    desc: "Analyzing sub-surface moisture intrusion on an industrial warehouse.",
    id: "LOG_4421",
    videoId: "Og3UoFwbl04"
  },
  {
    title: "High-Wind Integrity Run",
    location: "Miami, FL",
    desc: "Post-storm structural check verifying EPDM membrane performance.",
    id: "LOG_3398",
    videoId: "Og3UoFwbl04"
  },
  {
    title: "TPO Installation Logs",
    location: "Boston, MA",
    desc: "Time-lapse of 48-hour commercial roof membrane deployment.",
    id: "LOG_8820",
    videoId: "Og3UoFwbl04"
  },
  {
    title: "Emergency Roof Restore",
    location: "Houston, TX",
    desc: "Rapid deployment response to repair active leaks on a manufacturing site.",
    id: "LOG_1105",
    videoId: "Og3UoFwbl04"
  },
  {
    title: "Slate & Copper Envelope",
    location: "Denver, CO",
    desc: "Precision restoration detailing on a historical residential estate.",
    id: "LOG_7752",
    videoId: "Og3UoFwbl04"
  }
];

// --- SUB-COMPONENT: Safe GSAP Hover Card ---
// --- SUB-COMPONENT: Safe GSAP Hover Card ---
const VideoCard = ({ video }) => {
  const [isPlaying, setIsPlaying] = useState(false); // <-- Added state to track playback

  const cardRef = useRef(null);
  const borderRef = useRef(null);
  const titleRef = useRef(null);
  const btnBoxRef = useRef(null);
  const btnIconRef = useRef(null);

  const { contextSafe } = useGSAP({ scope: cardRef });

  const handleEnter = contextSafe(() => {
    gsap.to(borderRef.current, { autoAlpha: 1, duration: 0.4, ease: "power2.out" });
    gsap.to(titleRef.current, { color: "#ef4444", duration: 0.3, ease: 'power2.out' });
    gsap.to(btnBoxRef.current, { backgroundColor: "#ef4444", color: "#ffffff", duration: 0.3 });

  });

  const handleLeave = contextSafe(() => {
    gsap.to(borderRef.current, { autoAlpha: 0, duration: 0.4, ease: "power2.out" });
    gsap.to(titleRef.current, { color: "currentColor", duration: 0.3, ease: 'power2.out' });
    gsap.to(btnBoxRef.current, { backgroundColor: "rgba(128,128,128,0.1)", color: "currentColor", duration: 0.3 });

  });

  const startVideo = () => {
    setIsPlaying(true);
  };

  return (
    <div
      ref={cardRef}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      className="video-card relative flex flex-col bg-background/[0.02] border border-foreground/10 invisible will-change-transform"
    >
      {/* GSAP Hover Border Overlay */}
      <div ref={borderRef} className="absolute inset-0 border border-red-600 z-20 invisible pointer-events-none" />

      {/* Top Meta Data */}
      <div className="flex justify-between items-center px-6 py-4 border-b border-foreground/10">
        
        <div className="flex items-center gap-2">
          <span className="font-helvic text-[9px] uppercase tracking-widest text-red-600 font-bold">
            {isPlaying ? "PLAYING" : "REC"}
          </span>
          <div className={`w-1.5 h-1.5 rounded-full bg-red-600 ${isPlaying ? 'animate-ping' : 'animate-pulse'}`} />
        </div>
      </div>

      {/* Video iframe Container */}
      <div className="relative aspect-video w-full overflow-hidden bg-black">
        <iframe
          // Toggle pointer events based on playing state
          className={`w-full h-full object-cover ${isPlaying ? 'pointer-events-auto' : 'pointer-events-none'}`}
          // Dynamically append autoplay and controls when clicked
          src={`https://www.youtube.com/embed/${video.videoId}?si=px6KsgyFCF3YHrr7&controls=${isPlaying ? 1 : 0}${isPlaying ? "&autoplay=1" : ""}`}
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        ></iframe>

        {/* The Glass Shield: Now acts as a clickable play button. Disappears when playing. */}
        {!isPlaying && (
          <div
            onClick={startVideo}
            className="absolute inset-0 z-10 bg-transparent cursor-pointer"
          />
        )}
      </div>

      {/* Text Description Content */}
      <div className="p-4 flex flex-col justify-between flex-1 gap-6">
        <div className="flex flex-col gap-3">
          <h3 ref={titleRef} className="font-futura font-black text-xl md:text-2xl uppercase tracking-tighter text-foreground">
            {video.title}
          </h3>
          <p className="font-helvic text-foreground/60 text-sm leading-relaxed font-light">
            {video.desc}
          </p>
        </div>

        <div className="flex flex-col gap-6 mt-auto">
          <hr className="border-foreground/10" />

          {/* Location & Action row */}
          <div className="flex justify-end items-center">
            

            {/* Bottom Play Button also triggers the video */}
            <div
              ref={btnBoxRef}
              onClick={startVideo}
              className="p-2.5 bg-foreground/10 rounded-full text-foreground will-change-transform cursor-pointer"
            >
              <div ref={btnIconRef} className="will-change-transform">
                <Play className="w-3 h-3 ml-0.5" fill="currentColor" />
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

// --- MAIN VIDEOS SECTION ---
export default function VideoGrid() {
  const containerRef = useRef(null);

  useGSAP(() => {
    // Stagger animate video cards up when entering viewport
    gsap.fromTo(
      ".video-card",
      { autoAlpha: 0, y: 50 },
      {
        autoAlpha: 1,
        y: 0,
        stagger: 0.15,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".videos-grid",
          start: "top 80%",
        }
      }
    );
  }, { scope: containerRef });

  return (
    <section
      ref={containerRef}
      id="videos"
      // Solid background, perfectly matching site flow
      className="relative w-full py-12 lg:py-20 bg-background text-foreground border-t border-foreground/5 px-4 md:px-12 flex flex-col items-center overflow-hidden"
    >
      <div className="w-full flex flex-col">

        {/* Top Header Label */}
        <div className="flex flex-col items-start w-full mb-6 lg:mb-20">
          <div className="w-fit max-w-[200px]">
            <div className="mb-4">
              <BlockReveal
                text="Videos"
                className="font-futura text-[8vw] md:text-[4vw] uppercase  text-foreground pb-1"
              />
            </div>
            <LineAnimation black={false} />
          </div>
        </div>

        {/* Section Header Content */}
        <div className="flex flex-col items-start gap-6 w-full mb-16">
          <span className="font-helvic text-[10px] tracking-[0.3em] text-red-600 uppercase font-bold">
            // ACTIVE DRONE SURVEILLANCE
          </span>

          <div className="leading-[0.85]">
            <RevealText
              text="DRONE FOOTAGE"
              className="font-futura font-black text-[clamp(2.5rem,7vw,7.5rem)] leading-[clamp(2.5rem,7vw,7.5rem)] uppercase tracking-tighter text-foreground"
            />
            <RevealText
              text="OF OUR WORK."
              className="font-futura font-black text-[clamp(2.5rem,7vw,7.5rem)] leading-[clamp(2.5rem,7vw,7.5rem)] uppercase tracking-tighter text-red-600"
            />
          </div>

          <p className="max-w-2xl font-helvic text-foreground/60 text-sm md:text-base leading-relaxed font-light mt-4">
            Review raw operational footage. We believe in total transparency, delivering structural integrity and absolute precision for every client.
          </p>
        </div>

        {/* Videos Grid - Grid Layout matching Projects and Services */}
        <div className="videos-grid w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 xl:gap-8 items-stretch mt-8">
          {videosData.map((video, index) => (
            <VideoCard key={index} video={video} />
          ))}
        </div>

      </div>
    </section>
  );
}