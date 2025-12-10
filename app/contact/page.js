
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

export const metadata = {
  metadataBase: new URL("https://dnkre.com/contact"),
  title: {
    default: "Contact Our Expert Real Estate Team | Get in Touch for Property Assistance",
  },
  description:
    "Our professional team is available 24/7 to assist you. Whether you have questions, concerns, or suggestions, we’d love to hear from you. Feel free to reach out via email by completing the form on the right, or schedule an appointment to meet us in person at one of our listed contact points below. We're here to help just be sure to arrange a meeting in advance. All contact details are provided below.",
  keywords: keywords.join(", "),
  alternates: {
    canonical: "https://dnkre.com/contact",
  },
  openGraph: {
    title: "Contact Our Expert Real Estate Team | Get in Touch for Property Assistance",
    description:
      "Our professional team is available 24/7 to assist you. Whether you have questions, concerns, or suggestions, we’d love to hear from you. Feel free to reach out via email by completing the form on the right, or schedule an appointment to meet us in person at one of our listed contact points below. We're here to help just be sure to arrange a meeting in advance. All contact details are provided below.",
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
    title: "Contact Our Expert Real Estate Team | Get in Touch for Property Assistance",
    description:
      "Our professional team is available 24/7 to assist you. Whether you have questions, concerns, or suggestions, we’d love to hear from you. Feel free to reach out via email by completing the form on the right, or schedule an appointment to meet us in person at one of our listed contact points below. We're here to help just be sure to arrange a meeting in advance. All contact details are provided below.",
    images: ["https://www.dnkre.com/logo.webp"],
  },
  robots: "index, follow",
  author: "DNK Real Estate",
  favicon: "https://www.dnkre.com/logo.ico",
  appleTouchIcon: "https://www.dnkre.com/logo.webp",
  openGraphMetaTags: {
    url: "https://www.dnkre.com/contact",
    title: "Contact Our Expert Real Estate Team | Get in Touch for Property Assistance",
    description:
      "Our professional team is available 24/7 to assist you. Whether you have questions, concerns, or suggestions, we’d love to hear from you. Feel free to reach out via email by completing the form on the right, or schedule an appointment to meet us in person at one of our listed contact points below. We're here to help just be sure to arrange a meeting in advance. All contact details are provided below.",
    image: "https://www.dnkre.com/logo.webp",
  },
  schemaMarkup: {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": "#website",
    headline:
      "Contact Our Expert Real Estate Team | Get in Touch for Property Assistance",
    url: "https://dnkre.com/contact",
    name: "DNK Real Estate",
    alternateName: ["DNK Real Estate", "dnkre.com"],
    keywords:
      keywords.join(", "),
    description:
      "Our professional team is available 24/7 to assist you. Whether you have questions, concerns, or suggestions, we’d love to hear from you. Feel free to reach out via email by completing the form on the right, or schedule an appointment to meet us in person at one of our listed contact points below. We're here to help just be sure to arrange a meeting in advance. All contact details are provided below.",
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
      <BannerContact />
      <Contact />
    </>
  )
}