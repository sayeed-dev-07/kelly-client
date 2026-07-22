import localFont from "next/font/local";
import { Noto_Serif_Display } from "next/font/google";
import "./globals.css";

import ClientLayout from "@/components/intro/ClientLayout";


//  Fonts 


const futura = localFont({
  src: "./fonts/Futura-Bold.woff2",
  variable: "--font-futura",
  display: "swap",
  preload: true,
});

const social = localFont({
  src: "./fonts/ABCSocialMono-Regular.woff2",
  variable: "--font-social",
  display: "swap",
  preload: true,
});

const helvic = localFont({
  src: "./fonts/HelveticaNowText-Regular.woff2",
  variable: "--font-helvic",
  display: "swap",
  preload: true,
});

const fontNoto = Noto_Serif_Display({
  variable: "--font-noto-serif-display",
  subsets: ["latin"],
  display: "swap",
});

// Constants

const SITE_URL = "https://kelleyrandr.com";
const BRAND_NAME = "Kelley R&R";
const COMPANY_NAME = "Kelley R&R";
const PHONE = "+1 (346) 528-7499";
const EMAIL = "info@kelleyrr.com"; 
const LOGO = `${SITE_URL}/logo.jpeg`;
const OG_IMAGE = `${SITE_URL}/og-image.png`;
const FAVICON = "/favicon.ico";

//  Viewport

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#ffffff",
  colorScheme: "light",
  interactiveWidget:"resizes-content"
};

//  Metadata

export const metadata = {
  metadataBase: new URL(SITE_URL),
  applicationName: BRAND_NAME,
  title: {
    default: "Kelley R&R | Roof Repair & Replacement",
    template: "%s | Kelley R&R",
  },
  description:
    "Nationwide commercial roofing company specializing in roof repair, replacement, industrial roofing, drone inspections, TPO, EPDM, and structural roofing systems across the United States.",
  category: "Roofing Contractor",
  classification: "Business",
  alternates: {
    canonical: SITE_URL,
  },
  authors: [
    {
      name: COMPANY_NAME,
      url: SITE_URL,
    },
  ],
  creator: COMPANY_NAME,
  publisher: COMPANY_NAME,
  referrer: "origin-when-cross-origin",
  formatDetection: {
    telephone: true, 
    email: true,
    address: true,
  },
  icons: {
    icon: [
      { url: FAVICON },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180" },
    ],
    shortcut: FAVICON,
  },
  manifest: "/site.webmanifest",
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",

    phoneNumbers:[PHONE],

    url: SITE_URL,
    siteName: BRAND_NAME,
    title: "Kelley R&R | Nationwide Commercial Roof Repair & Replacement",
    description:
      "Elite nationwide commercial roofing services engineered for industrial, commercial, and multi-family properties. Roof replacement, repair, drone inspections, TPO, EPDM, and structural roofing solutions.",
    images: [
      {
        url: OG_IMAGE,
        width: 1200,
        height: 630,
        alt: "Kelley R&R Nationwide Roofing",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Kelley R&R | Nationwide Commercial Roof Repair & Replacement",
    description:
      "Trusted nationwide roofing specialists providing commercial roof replacement, inspections, maintenance, industrial roofing, and long-term structural protection.",
    // creator: "@yourtwitter", 
    images: [OG_IMAGE],
  },
  appleWebApp: {
    capable: true,
    title: BRAND_NAME,
    statusBarStyle: "default",
  },
};



export default function RootLayout({ children }) {
  
  // Google Algorithm Entity Mapping- Unified Graph Schema 
  const jsonLdGraph = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${SITE_URL}/#organization`,
        "name": BRAND_NAME,
        "legalName": "Kelley R&R",
        "url": SITE_URL,
        "logo": {
          "@type": "ImageObject",
          "@id": `${SITE_URL}/#logo`,
          "url": LOGO,
          "caption": BRAND_NAME
        },
        "image": {
          "@type": "ImageObject",
          "@id": `${SITE_URL}/#ogimage`
        },
        "description": "Nationwide commercial roofing company specializing in roof repair, replacement, industrial roofing, drone inspections, TPO, EPDM, and structural roofing systems.",
        "slogan": "Shield the Super Structure.",
        "foundingDate": "2019",
        "email": EMAIL,
        "telephone": PHONE,
        "knowsAbout": [
          "Commercial Roofing",
          "Industrial Roofing",
          "Residential Roofing",
          "Roof Replacement",
          "Roof Repair",
          "Drone Roof Inspection",
          "Roof Coatings",
          "Roof Restoration",
          "Storm Damage Roofing",
          "EPDM Roofing",
          "TPO Roofing",
          "Standing Seam Metal Roofing",
          "Preventative Roof Maintenance",
        ],
        "sameAs": [
          "https://www.facebook.com/kelley.rr",
          "https://www.instagram.com/kelley.rr",
          "https://www.youtube.com/@kelleyrandr",
          "https://www.bbb.org/us/tx/houston/profile/roofing-contractors/kelley-rr-roofing-restoration-0915-90059999/",
          "https://www.yelp.com/biz/kelley-r-and-r-roofing-brownsville/"
        ],
        "contactPoint": {
          "@type": "ContactPoint",
          "telephone": PHONE,
          "contactType": "customer service",
          "areaServed": "US",
          "availableLanguage": ["English"]
        }
      },
      {
        "@type": "RoofingContractor",
        "@id": `${SITE_URL}/#roofingcontractor`,
        "name": BRAND_NAME,
        "url": SITE_URL,
        "logo": LOGO,
        "image": OG_IMAGE,
        "email": EMAIL,
        "telephone": PHONE,
        "priceRange": "$$$",
        "description": "Commercial, industrial and residential roofing specialists providing nationwide roof repair, replacement, inspections and structural roofing solutions.",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "505 N. Sam Houston Pkwy. E, Unit 450",
          "addressLocality": "Houston",
          "addressRegion": "TX",
          "postalCode": "77060",
          "addressCountry": "US"
        },
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": "29.9405",
          "longitude": "-95.4095"
        },
        "openingHoursSpecification": [
          {
            "@type": "OpeningHoursSpecification",
            "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
            "opens": "08:00",
            "closes": "18:00"
          },
          {
            "@type": "OpeningHoursSpecification",
            "dayOfWeek": ["Saturday"],
            "opens": "09:00",
            "closes": "15:00"
          }
        ],
        "paymentAccepted": ["Cash", "Credit Card", "Debit Card", "Bank Transfer", "Check"],
        "currenciesAccepted": "USD",
        "memberOf": {
          "@id": `${SITE_URL}/#organization`
        },
        "areaServed": [
          { "@type": "Country", "name": "United States" },
          { "@type": "State", "name": "Texas" },
          { "@type": "State", "name": "Florida" },
          { "@type": "State", "name": "Georgia" },
          { "@type": "State", "name": "North Carolina" },
          { "@type": "State", "name": "South Carolina" },
          { "@type": "State", "name": "Tennessee" },
          { "@type": "State", "name": "Louisiana" },
          { "@type": "State", "name": "Alabama" },
          { "@type": "State", "name": "Mississippi" },
          { "@type": "State", "name": "Arkansas" },
          { "@type": "State", "name": "Oklahoma" },
          { "@type": "State", "name": "New Mexico" }
        ],
        "hasOfferCatalog": {
          "@type": "OfferCatalog",
          "name": "Nationwide Roofing Services",
          "itemListElement": [
            { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Commercial Roof Replacement" } },
            { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Commercial Roof Repair" } },
            { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Industrial Roofing" } },
            { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Residential Roofing" } },
            { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Drone Roof Inspection" } },
            { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Roof Maintenance" } },
            { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Storm Damage Roof Repair" } },
            { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Roof Coating" } },
            { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "EPDM Roofing" } },
            { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "TPO Roofing" } }
          ]
        }
      }
    ]
  };

  return (
    <html
      lang="en"
      className={`${helvic.variable} ${futura.variable} ${social.variable} ${fontNoto.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLdGraph),
          }}
        />
      </head>

      <body className="min-h-full flex flex-col bg-bg-offwhite text-text-black">
        <ClientLayout>
          {children}
        </ClientLayout>
      </body>
    </html>
  );
}