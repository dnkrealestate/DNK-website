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

export const metadata = {
  metadataBase: new URL("https://dnkre.com/contact"),
  title: {
    default: "Privacy Policy - DNK Real Estate",
  },
  description:
    "At DNK Real Estate, accessible from www.dnkre.com, we are committed to protecting the privacy and confidentiality of your personal information.This Privacy Policy outlines how we collect, use, and safeguard your data when you interact with our website.",
  keywords: keywords.join(", "),
  alternates: {
    canonical: "https://dnkre.com/contact",
  },
  openGraph: {
    title: "Privacy Policy - DNK Real Estate",
    description:
      "At DNK Real Estate, accessible from www.dnkre.com, we are committed to protecting the privacy and confidentiality of your personal information.This Privacy Policy outlines how we collect, use, and safeguard your data when you interact with our website.",
    url: "https://dnkre.com/contact",
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
    description:
      "At DNK Real Estate, accessible from www.dnkre.com, we are committed to protecting the privacy and confidentiality of your personal information.This Privacy Policy outlines how we collect, use, and safeguard your data when you interact with our website.",
    images: ["https://www.dnkre.com/logo.webp"],
  },
  robots: "index, follow",
  author: "DNK Real Estate",
  favicon: "https://www.dnkre.com/logo.ico",
  appleTouchIcon: "https://www.dnkre.com/logo.webp",
  openGraphMetaTags: {
    url: "https://www.dnkre.com/contact",
    title: "Privacy Policy - DNK Real Estate",
    description:
      "At DNK Real Estate, accessible from www.dnkre.com, we are committed to protecting the privacy and confidentiality of your personal information.This Privacy Policy outlines how we collect, use, and safeguard your data when you interact with our website.",
    image: "https://www.dnkre.com/logo.webp",
  },
  schemaMarkup: {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": "#website",
    headline:
      "Privacy Policy - DNK Real Estate",
    url: "https://dnkre.com/contact",
    name: "DNK Real Estate",
    alternateName: ["DNK Real Estate", "dnkre.com"],
    keywords:
      keywords.join(", "),
    description:
      "At DNK Real Estate, accessible from www.dnkre.com, we are committed to protecting the privacy and confidentiality of your personal information.This Privacy Policy outlines how we collect, use, and safeguard your data when you interact with our website.",
    image: "https://www.dnkre.com/logo.webp",
    inLanguage: {
      "@type": "Language",
      name: ["Arabic", "English", "Hindi"],
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
  },
};

export default function page() {
  return (
      <>
        <SubBanner />
        <PrivacyPolicy />
      </>
  )
}