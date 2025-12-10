import { Poppins } from "next/font/google";
import "./globals.css";
import { SplashProvider } from "./context/SplashContext";
import ClientWrapper from "./components/ClientWrapper";
import Script from 'next/script';
import { getLogo, getProjectList } from "@/services/projectServices";

const poppins = Poppins({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
  display: "swap",
});

const keywords = [
  "Best real estate companies in Dubai (UAE)","Best real estate companies (US)",
  "Can foreigners buy property in Dubai?", "Apartments for sale in UAE",
  "Buy an apartment in Downtown Dubai", "Property management companies in Dubai",
  "Dubai luxury apartments", "Damac Hills villas for sale", "House for sale in Palm Jumeirah, Dubai",
  "Beachfront villa in Dubai for sale", "Dubai Hills apartments", "Dubai townhouses for sale",
  "Dubai penthouses for sale", "Best property to buy in Dubai", "Off-plan properties for sale in Dubai"
];

const coverImageUrl = "https://lh3.googleusercontent.com/p/AF1QipMGg3wpa6l31rxUQyV7-wHeGDKZ0GKjyPsso52e=s1360-w1360-h1020";

export const metadata = {
  metadataBase: new URL("https://www.dnkre.com/"),
  title: {
    default: "Best Offplan Projects - Apartments, Villas, Townhouses, Penthouses",
  },
  description:
    "Discover your ideal property in Dubai with the help of our seasoned real estate experts. Whether you're looking for a dream home or a profitable investment opportunity, we provide personalized guidance to help you make the right choice.",
  keywords: keywords.join(", "),
  openGraph: {
    title: "Best Offplan Projects - Apartments, Villas, Townhouses, Penthouses",
    description:
      "Discover your ideal property in Dubai with the help of our seasoned real estate experts. Whether you're looking for a dream home or a profitable investment opportunity, we provide personalized guidance to help you make the right choice.",
    url: "https://www.dnkre.com/",
    siteName: "DNK Real Estate",
    type: 'website',
    images: [
      {
        url: coverImageUrl,
        width: 1200,
        height: 630,
        alt: "DNK Real Estate Dubai",
        type: "image/webp",
      },
    ],
    type: "website",
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-96x96.png", sizes: "96x96" },
      { url: "/favicon.svg", type: "image/svg+xml" }
    ],
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
  twitter: {
    card: "summary_large_image",
    title: "Best Offplan Projects - Apartments, Villas, Townhouses, Penthouses",
    description:
      "Discover your ideal property in Dubai with the help of our seasoned real estate experts. Whether you're looking for a dream home or a profitable investment opportunity, we provide personalized guidance to help you make the right choice.",
    images: [coverImageUrl],
  },
  robots: "index, follow",
  link: [
    { rel: "canonical", href: "https://www.dnkre.com/" },
    { rel: 'preload', as: 'image', href: coverImageUrl, type: 'image/webp', fetchpriority: 'high' },
    { rel: 'preload', as: 'image', href: "https://www.dnkre.com/favicon.ico", type: 'image/webp', fetchpriority: 'high' },
    { rel: 'shortcut icon', href: 'https://www.dnkre.com/favicon.ico' },
  ],
  meta: {
    author: 'DNK Real Estate',
    robots: 'index, follow',
  },
  openGraphMetaTags: {
    url: "https://www.dnkre.com",
    title: "Best Offplan Projects - Apartments, Villas, Townhouses, Penthouses",
    description:
      "Discover your ideal property in Dubai with the help of our seasoned real estate experts. Whether you're looking for a dream home or a profitable investment opportunity, we provide personalized guidance to help you make the right choice.",
    image: "https://lh3.googleusercontent.com/p/AF1QipMGg3wpa6l31rxUQyV7-wHeGDKZ0GKjyPsso52e=s1360-w1360-h1020",
  },
  schemaMarkup: {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": "#website",
    headline:
      "Best Offplan Projects - Apartments, Villas, Townhouses, Penthouses",
    url: "https://www.dnkre.com",
    name: "DNK Real Estate",
    alternateName: ["DNK Real Estate", "dnkre.com"],
    keywords:
      "New Developments, Off Plan, New Developments in Dubai, Off Plan Projects, Offplan Projects, Off Plan in Dubai, Buy Apartments in Dubai, Buy Villas in Dubai, Buy Townhouses in Dubai, Sale Apartments in Dubai, Sale Villas in Dubai, Sale Townhouses in Dubai, DNK Real Estate, Properties in Dubai, Rent Properties in Dubai, Rent in Dubai, New Off Plan Project, Upcoming Off Plan Properties, New Launch Off-Plan Properties, Dubai Properties Projects, Dubai Real Estate, Real Estate Projects in Dubai, Real Estate Projects in UAE, DNK Real Estate, Real Estate Information, Dubai Developers, Dubai Communities, New Launches, Under Constructions, Ready to Move, Apartment, Villa, Townhouses, Studio, Business Space in Dubai, Office Space in Dubai, Office Space in Business bay Dubai, luxury apartments Dubai, Best Real Estate Company Dubai, Dubai Investment, Dubai Real Estate Market, Downtown Dubai.",
    description:
      "Discover your ideal property in Dubai with the help of our seasoned real estate experts. Whether you're looking for a dream home or a profitable investment opportunity, we provide personalized guidance to help you make the right choice.",
    image: coverImageUrl,
    inLanguage: {
      "@type": "Language",
      name: ["Arabic", "English", "Hindi"],
    },
    copyrightHolder: {
      "@type": "Organization",
      name: "DNK Real Estate",
      logo: "https://www.dnkre.com//favicon-96x96.png",
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
  jsonLd: [
    {
      "@context": "http://schema.org",
      "@type": "Organization",
      name: "DNK Real Estate",
      logo: "https://www.dnkre.com/logo.webp",
      url: "https://dnkre.com",
      sameAs: [
        "https://www.instagram.com/dnk_re/",
        "https://www.facebook.com/dnkrealestate1/",
        "https://www.linkedin.com/company/dnkrealestate/",
        "https://www.youtube.com/channel/UCKH7d3Sx2dkfb4pEXXaMpFA",
      ],
      telephone: "+971555769195",
      email: "info@dnkre.com",
      address: "Suite No: 603, Sama Building, Al Barsha 1 - Al Barsha, Dubai, United Arab Emirates",
    },
    {
      "@context": "http://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "item": {
            "@id": "https://dnkre.com/about",
            "name": "About"
          }
        },
        {
          "@type": "ListItem",
          "position": 2,
          "item": {
            "@id": "https://dnkre.com/off-plan-project",
            "name": "Projects"
          }
        },
        {
          "@type": "ListItem",
          "position": 3,
          "item": {
            "@id": "https://dnkre.com/developer",
            "name": "Developers"
          }
        },
        {
          "@type": "ListItem",
          "position": 4,
          "item": {
            "@id": "https://dnkre.com/contact",
            "name": "Contact"
          }
        }
      ],
      numberOfItems: 4,
    },
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "url": "https://dnkre.com/",
      "name": "DNK Real Estate",
      "potentialAction": {
        "@type": "SearchAction",
        "target": "https://dnkre.com/search?query={search_term_string}",
        "query-input": "required name=search_term_string"
      }
    }
  ],
};


export default async function RootLayout({ children }) {
  let projects = [];
  let logoData = null;

  try {
    const [projectsData] = await Promise.all([
      getProjectList(), 
    ]);
    projects = projectsData;

    const spclLogo = await getLogo();
    logoData = spclLogo.length > 0 ? spclLogo[0] : null; 

  } catch (error) {
    console.error("Error fetching data:", error);
  }

  return (
    <html lang="en">
      <head>
      <Script
        async
        src="https://www.googletagmanager.com/gtag/js?id=G-Q883FW1J89"
        strategy="afterInteractive"
      />
      <Script id="gtag-init" strategy="afterInteractive">
        {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-Q883FW1J89');
          `}
      </Script>

      {/* ✅ Google Tag Manager */}
      <Script id="gtm-init" strategy="afterInteractive">
        {`
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-WN4SJSW3');
          `}
      </Script>

      {/* ✅ Facebook Pixel */}
      <Script id="fb-pixel" strategy="afterInteractive">
        {`
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '702378121580941');
            fbq('track', 'PageView');
          `}
        </Script>
        </head>
      <body className={`antialiased ${poppins.variable}`}>
        {/* ✅ GTM noscript fallback */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-WN4SJSW3"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>

        {/* ✅ Facebook Pixel noscript fallback */}
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: "none" }}
            src="https://www.facebook.com/tr?id=702378121580941&ev=PageView&noscript=1"
          />
        </noscript>
          <SplashProvider>
            <ClientWrapper spclLogo={logoData} projects={projects}>
              {children}
            </ClientWrapper>
          </SplashProvider>
      </body>
    </html>
  );
}
