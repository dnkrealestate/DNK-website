import React from 'react'
import PrivacyPolicy from './components/PrivacyPolicy'
import SubBanner from '../components/subBanners/SubBanner'

const keywords = [
  "Privacy Policy",
  "DNK Real Estate",
  "Contact real estate team",
  "Property assistance",
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
  "Read DNK Real Estate's Privacy Policy to learn how we collect, use, and protect your personal information when you use www.dnkre.com.";

export const metadata = {
  title: {
    default: "Privacy Policy - DNK Real Estate",
  },
  description,
  keywords: keywords.join(", "),
  alternates: {
    canonical: "https://www.dnkre.com/privacy-policy",
  },
  openGraph: {
    title: "Privacy Policy - DNK Real Estate",
    description,
    url: "https://www.dnkre.com/privacy-policy",
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
    title: "Privacy Policy - DNK Real Estate",
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
  headline: "Privacy Policy - DNK Real Estate",
  url: "https://www.dnkre.com/privacy-policy",
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
        <SubBanner />
        <PrivacyPolicy />
      </>
  )
}