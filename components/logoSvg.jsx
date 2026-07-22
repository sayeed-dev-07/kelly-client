import React from 'react'

const LogoSvg = () => {
    return (
        <svg
            viewBox="0 0 420 120"
            role="img"
            aria-label="Kelley Roofing USA Logo"
            xmlns="http://www.w3.org/2000/svg"
            className="w-[800px] h-auto transition-all duration-500"
        >
            <title>Kelley Roofing USA Logo</title>
            {/* Stacked offset chevrons suggesting layered rooflines */}
            

            {/* KELLEY Text (Changes from white to dark black when scrolled) */}
            <text
                x="100"
                y="62"
                fontFamily="var(--font-heading), Arial, sans-serif"
                fontWeight="700"
                fontSize="45"
                fill={'#FFFFFF'}
                letterSpacing="-1"
                className="transition-colors duration-500 font-bold"
                textLength="265"
                lengthAdjust="spacing"
            >
                KELLEY <tspan fontFamily="var(--font-noto-serif-display), 'Noto Serif Display', Georgia, serif" fontWeight="400" className="randr_font">R&R</tspan>
            </text>

            {/* ROOF REPAIR & REPLACEMENT Text (Stays Red) */}
            <text
                x="100"
                y="86"
                fontFamily="var(--font-subheading), Arial, sans-serif"
                fontWeight="400"
                fontSize="12.5"
                fill="#E63B2E"
                className="font-normal"
                textLength="265"
                lengthAdjust="spacing"
            >
                ROOF REPAIR & REPLACEMENT
            </text>
        </svg>
    )
}

export default LogoSvg