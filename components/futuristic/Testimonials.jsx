"use client";

import React, { useRef } from "react";
import Image from "next/image"; // Added Next.js Image
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Star, CheckCircle } from "lucide-react";
import LineAnimation from "../helper/LineAnimation";
import RevealText from "../helper/RevealText";
import BlockReveal from "../helper/BlockReveal";

gsap.registerPlugin(useGSAP, ScrollTrigger);
gsap.config({ force3D: true });

const reviewsData = [
  {
    client: "Natasha Pierce",
    text: "Awesome roofer! He offered competitive pricing and worked closely with me to ensure that I was satisfied with the final product. He provided detailed information about the materials and techniques used in the roofing process, which helped me make an informed decision. Overall, I would highly recommend this roofer to anyone looking for a high-quality, affordable, and communicative roofing service.",
    rating: 5,
    services: ['Roof installation'],
    id: "0",
    img: '/reviewIcon/Natasha.png'
  },
  {
    client: "Rob Weldon",
    text: "These guys did a solid job installing my roof. Very good workmanship. Doug Kelley (CEO) is an honest dude. His crew worked sun up to sun down/ very respectful/ cleaned up after themselves, etc. Came back for a thorough final inspection. Very highly recommend for roof installs/ repairs!",
    rating: 5,
    services: ['Roof installation', 'Roof repair for storm & wind damage'],
    id: "1",
    img: '/reviewIcon/Rob.png'
  },
  {
    client: "Seseley Harvey",
    text: "Cannot say enough good things about this company. First of all, the salesman (Travis Rogers) who convinced us to hire Kelley R&R was a phenomenal communicator. He kept us updated from contract all the way to clean up and actually oversaw the entire roof job himself. It’s always nice to feel taken care of as a costumer, and Travis took wonderful care of us. The crew worked quickly, the clean up was flawless, and the roof looks absolutely amazing. Very pleasant experience and 10/10 would recommend. We will definitely be using Kelley R&R for all of our future roof repair/replacement needs.",
    rating: 5,
    services: ['Roof inspection', 'Roof installation'],
    id: "2",
    img: '/reviewIcon/Seseley.png'
  },
  {
    client: "C Capps",
    text: "This was by far one of the best home repair experiences I have had in my time of being a home owner! Mr. Kelley was every bit of professional and knowledgeable and answered all my questions and concerns. He was on time and never pressured me with choosing him to take care of our roof replacement. His crew was outstanding and did a fantastic job! We are so pleased with everything from start to finish. He was on time and delivered on everything he said they would do. His pricing was very fair and the quality we got for the money is beyond anything I could’ve hoped for. I highly recommend him for your roofing needs and will highly suggest his company to anyone looking to do any roof repairs or replacement. We are very thankful we found him and his crew, blessed to have gotten to business with such a wonderful company.",
    rating: 5,
    services: ['Attic venting', 'Roof installation'],
    id: "3",
    img: '/reviewIcon/C.png'
  },
  {
    client: "Rockeya Dasent",
    text: `Mr. Kelley came by to inspect my roof within 40 mins of my call. Although it wasn't my roof causing the leak in my ceiling, he still went over and beyond to assist and point me in the right direction. He is very knowledgeable and friendly. I am truly greatful for his services and will be hiring him in the future.
    Excellent service`,
    rating: 5,
    services: ['Roof inspection', 'Roof repair'],
    id: "4",
    img: '/reviewIcon/Rockeya.png'
  },
  {
    client: "Karen Ganske",
    text: `Doug Kelley was a pleasure to work with, he was excellent with communication, explanation of job scope and timeliness of work.  We had to have our roof replaced after hurricane damage.  We needed a roofer to protect the opening on the roof caused by the high winds. Since more rain was in the forecast we needed it done quickly.  All local roofers were inundated with business, but as busy as they were, Doug was able to cover our roof openings the next day and give us peace of mind.  Our new roof looks amazing and I would definitely call Doug again for any future roofing needs.`,
    rating: 5,
    services: ['Roof inspection', 'Roof installation', 'Roof repair'],
    id: "5",
    img: '/reviewIcon/Karen.png'
  },
];

// --- SUB-COMPONENT: Safe GSAP Hover Card ---
const ReviewCard = ({ review, index }) => {
  const cardRef = useRef(null);
  const borderRef = useRef(null);

  const { contextSafe } = useGSAP({ scope: cardRef });

  const handleEnter = contextSafe(() => {
    gsap.to(borderRef.current, { autoAlpha: 1, duration: 0.4, ease: "power2.out" });
    gsap.to(cardRef.current, { y: -10, duration: 0.5, ease: "power3.out" });
  });

  const handleLeave = contextSafe(() => {
    gsap.to(borderRef.current, { autoAlpha: 0, duration: 0.4, ease: "power2.out" });
    gsap.to(cardRef.current, { y: 0, duration: 0.5, ease: "power3.out" });
  });

  // Mathematically scatter the cards based on your requested layout logic
  let alignment = 'md:self-start';
  if (index % 3 === 1) alignment = 'md:self-end md:mr-[5%]';
  if (index % 3 === 2) alignment = 'md:self-center md:ml-[10%]';

  return (
    <div className={`review-card-wrapper invisible w-full md:w-[45%] lg:w-[450px] xl:w-[500px] will-change-transform ${alignment}`}>
      <div
        ref={cardRef}
        onMouseEnter={handleEnter}
        onMouseLeave={handleLeave}
        className="relative flex flex-col bg-background/80 border border-foreground/10 p-4 md:p-10 cursor-pointer will-change-transform h-full"
      >
        {/* Hover Border Overlay */}
        <div ref={borderRef} className="absolute inset-0 border border-red-600 z-20 invisible pointer-events-none" />

        <div className="flex flex-col gap-8 flex-grow">
          {/* Top indicator bar */}
          <div className="flex justify-end items-center text-[9px] font-helvic text-foreground/40 border-b border-foreground/10 pb-4">
            
            <span className="flex items-center gap-2 text-red-600 font-bold uppercase tracking-[0.2em]">
              <CheckCircle className="w-3.5 h-3.5" />
              VERIFIED
            </span>
          </div>

          {/* Quote Text */}
          <div className="flex flex-col gap-4">
            <div className="flex gap-1.5 text-red-600">
              {Array.from({ length: review.rating }).map((_, idx) => (
                <Star key={idx} className="w-4 h-4 fill-current" />
              ))}
            </div>
            <p className="font-helvic text-foreground/80 text-sm md:text-base leading-relaxed font-light italic">
              "{review.text}"
            </p>
          </div>
        </div>

        {/* UPDATED: Client Profile & Services */}
        <div className="flex flex-col gap-4 pt-6 border-t border-foreground/10 mt-10">
          <div className="flex items-center gap-4">
            {/* Avatar Image */}
            <div className="relative w-12 h-12 rounded-full overflow-hidden border border-foreground/10 bg-foreground/5 shrink-0">
              <Image
                src={review.img}
                alt={`${review.client} avatar`}
                fill
                sizes="48px"
                className="object-cover"
              />
            </div>

            {/* Name */}
            <div className="flex flex-col justify-center">
              <span className="font-futura font-black text-lg text-foreground uppercase tracking-tighter leading-none">
                {review.client}
              </span>
            </div>
          </div>

          {/* Services Tags */}
          <div className="flex flex-wrap gap-2 mt-1">
            {review.services.map((service, i) => (
              <span
                key={i}
                className="font-social text-[9px] font-bold uppercase tracking-[0.2em] text-red-600 bg-red-600/10 px-2 py-1"
              >
                {service}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// --- MAIN TESTIMONIALS SECTION ---
export default function Testimonials() {
  const containerRef = useRef(null);
  const titleRef = useRef(null);

  useGSAP(() => {
    // 1. The Background Text Shrink Effect
    gsap.to(titleRef.current, {
      scale: 0.9,
      autoAlpha: 0.15,
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "bottom bottom",
        scrub: 1.2
      }
    });

    // 2. Individual Card Scrub Entrance
    gsap.utils.toArray('.review-card-wrapper').forEach((card) => {
      gsap.from(card, {
        y: 40,
        autoAlpha: 0,
        scrollTrigger: {
          trigger: card,
          start: "top 95%",
          end: "top 80%",
          scrub: 1.2,
        }
      });
    });
  }, { scope: containerRef });

  return (
    <section
      ref={containerRef}
      id="reviews"
      className="relative w-full bg-background text-foreground border-t border-foreground/5"
    >
      {/* THE BACKGROUND TEXT - Sticky Z-0 */}
      <div className="sticky top-0 h-screen w-full flex items-center justify-center z-0 pointer-events-none overflow-hidden">
        <h2
          ref={titleRef}
          className="font-futura font-black text-[18vw] text-foreground uppercase tracking-tighter leading-none select-none will-change-transform"
        >
          REVIEWS
        </h2>
      </div>

      {/* FOREGROUND CONTENT */}
      <div className="relative z-10 w-full flex flex-col mt-[-100vh] pt-[100vh] pb-[20vh] px-4 md:px-12 ">

        {/* Top Header Label */}
        <div className="flex flex-col items-start w-full mb-6 lg:mb-20">
          <div className="w-fit max-w-[200px]">
            <div className="mb-4">
              <BlockReveal
                text="Feedback"
                className="font-futura text-[8vw] md:text-[4vw] uppercase  text-foreground pb-1"
              />
            </div>
            <LineAnimation black={false} />
          </div>
        </div>

        {/* Section Header Content */}
        <div className="flex flex-col items-start gap-6 w-full mb-12 md:mb-20">
          <span className="font-social text-[10px] tracking-[0.3em] text-red-600 uppercase font-bold">
            // CLIENT TESTIMONIALS
          </span>

          <div className="leading-[0.85]">
            <RevealText
              text="VERIFIED SYSTEM"
              className="font-futura font-black text-[clamp(2.5rem,7vw,7.5rem)] leading-[clamp(2.5rem,7vw,7.5rem)] uppercase tracking-tighter text-foreground"
            />
            <RevealText
              text="INTEGRITY."
              className="font-futura font-black text-[clamp(2.5rem,7vw,7.5rem)] leading-[clamp(2.5rem,7vw,7.5rem)] uppercase tracking-tighter text-red-600"
            />
          </div>

          <RevealText className="max-w-2xl font-helvic text-foreground/60 text-sm md:text-base leading-relaxed font-light mt-4" text={`Empirical validation from our commercial, industrial, residential, and government partners across the United States.`} />
        </div>

        {/* SCATTERED REVIEWS CONTAINER */}
        <div className="flex flex-col gap-y-12 md:gap-y-40 w-full">
          {reviewsData.map((review, index) => (
            <ReviewCard key={index} review={review} index={index} />
          ))}
        </div>

      </div>
    </section>
  );
}