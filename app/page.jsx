import About from '@/components/About';
import Hero from '@/components/Hero';
import React from 'react';
import IntervalSection from '@/components/helper/IntervalSection';
import Services from '@/components/Services';
import VideoGrid from '@/components/futuristic/VideoGrid';

import Projects from '@/components/futuristic/Projects';
import Testimonials from '@/components/futuristic/Testimonials';
import FAQ from '@/components/futuristic/FAQ';
import FooterBottom from '@/components/FooterBottom';

// v12

const Home = () => {
  return (
    <div>
      <Hero />
      <div className="relative z-20 min-h-screen w-full">
        <About />
        <Projects />
        <IntervalSection />
        <VideoGrid />
        <Services />
        <IntervalSection imgLink={'/img2.webp'} />
        <Testimonials />
        <FAQ />
        <FooterBottom />
      </div>
    </div>
  );
};

export default Home;