
import React from 'react'
import Contact from './components/Contact'
import BannerContact from './components/BannerContact'

const keywords = [
  "DNK Real Estate",
  "Contact real estate team",
  "Get in touch for property inquiries",
  "Real estate contact page",
  "Property assistance",
  "Real estate consultation",
  "Buy or sell property",
  "Contact for property investment",
  "Dubai real estate experts",
  "Real estate agent contact details",
  "Property services assistance",
  "Register with us",
  "Call Us",
  "Booking",
  "Contact Details",
  "Registration",
  "Address",
  "Map",
  "Google Map",
];

const description =
  "Contact DNK Real Estate's expert team for property inquiries, consultations, or to schedule an appointment in Dubai.";

export const metadata = {
  title: {
    default: "Contact Our Expert Real Estate Team | Get in Touch for Property Assistance",
  },
  description,
  keywords: keywords.join(", "),
  alternates: {
    canonical: "https://www.dnkre.com/contact",
  },
  openGraph: {
    title: "Contact Our Expert Real Estate Team | Get in Touch for Property Assistance",
    description,
    url: "https://www.dnkre.com/contact",
    siteName: "DNK Real Estate",
    images: [
      {
        url: "https://www.dnkre.com/logo.webp",
        width: 200,
        height: 200,
        alt: "DNK Real Estate Properties",
        type: "image/webp",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact Our Expert Real Estate Team | Get in Touch for Property Assistance",
    description,
    images: ["https://www.dnkre.com/logo.webp"],
  },
  robots: "index, follow",
  author: "DNK Real Estate",
};

const jsonLdSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": "#website",
  headline: "Contact Our Expert Real Estate Team | Get in Touch for Property Assistance",
  url: "https://www.dnkre.com/contact",
  name: "DNK Real Estate",
  alternateName: ["DNK Real Estate", "dnkre.com"],
  keywords: keywords.join(", "),
  description,
  image: "https://www.dnkre.com/logo.webp",
  inLanguage: {
    "@type": "Language",
    name: "English",
  },
  copyrightHolder: {
    "@type": "Organization",
    name: "DNK Real Estate",
    logo: "https://www.dnkre.com/logo.webp",
    url: "https://www.dnkre.com/",
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+971555769195",
      contactType: "Sales",
      email: "info@dnkre.com",
      areaServed: "United Arab Emirates",
    },
    address: {
      "@type": "PostalAddress",
      addressCountry: "AE",
      streetAddress: "Suite No: 603, Sama Building, Al Barsha 1 - Al Barsha, Dubai, United Arab Emirates",
      addressLocality: "Al Barsha",
      addressRegion: "Dubai",
      postalCode: "26048",
    },
  },
};



export default function page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdSchema) }}
      />
      <BannerContact />
      <Contact />
    </>
  )
}