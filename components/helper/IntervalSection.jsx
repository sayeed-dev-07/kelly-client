

import React from 'react';
import Image from 'next/image';




const IntervalSection = ({ imgLink = '/img3.webp' }) => {



    return (
        <div className='relative h-[80vh] md:h-screen w-full [clip-path:inset(0)]'>

            <div className=" absolute inset-0 z-20 bg-linear-to-t from-black/50 via-black/25 to-black/10" />
            <div className='fixed top-0 left-0 z-0 h-screen w-full'>
                <Image src={imgLink || '/img3.webp'} className='object-cover' fill sizes='100vw' alt='intervalImg' />
            </div>


        </div>
    );
};

export default IntervalSection;