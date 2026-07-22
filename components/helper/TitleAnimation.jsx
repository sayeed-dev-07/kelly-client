'use client'
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import React from 'react';
gsap.registerPlugin(ScrollTrigger, SplitText, useGSAP)

const TitleAnimation = () => {
    return (
        <div>

        </div>
    );
};

export default TitleAnimation;