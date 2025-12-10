import Head from 'next/head'
import ADHeader from './components/ADHeader'
import HomeAddressHills from './components/HomeAddressHills'

export default function AddressVillaPage() {
  return (
    <>
      <Head>
        <title>Damac Island Phase 2 | Dubailand</title>
        <meta
          name="description"
          content="Discover luxury waterfront townhouses and villas at Damac Islands 2 in Dubailand, Dubai. Starting from AED 2.3M, enjoy private beaches, lagoons, and resort-style living with flexible 1% monthly payment plans. Completion June 2029."
        />
        <meta
          name="keywords"
          content="Damac Islands 2, Damac Islands Dubai, waterfront villas Dubai, luxury villas Dubailand, townhouses for sale Dubai, villas with private beach, gated community villas Dubai, investment property Dubai, high rental yield Dubai"
        />
        <meta name="robots" content="index, follow" />
        <meta name="author" content="DNK Real Estate" />

        {/* Canonical URL */}
        <link
          rel="canonical"
          href="https://dnkre.com/damac-islands-new-community"
        />

        {/* Open Graph */}
        <meta
          property="og:url"
          content="https://dnkre.com/damac-islands-new-community"
        />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Damac Island Phase 2 | Dubailand" />
        <meta
          property="og:description"
          content="Discover luxury waterfront townhouses and villas at Damac Islands 2 in Dubailand, Dubai. Starting from AED 2.3M, enjoy private beaches, lagoons, and resort-style living with flexible 1% monthly payment plans. Completion June 2029."
        />
        <meta
          property="og:image"
          content="https://api.dnkre.com/image/islands2ad.webp"
        />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Damac Island Phase 2 | Dubailand" />
        <meta
          name="twitter:description"
          content="Discover luxury waterfront townhouses and villas at Damac Islands 2 in Dubailand, Dubai. Starting from AED 2.3M, enjoy private beaches, lagoons, and resort-style living with flexible 1% monthly payment plans. Completion June 2029."
        />
        <meta
          name="twitter:image"
          content="https://api.dnkre.com/image/islands2ad.webp"
        />

        {/* Icons */}
        <link rel="shortcut icon" href="https://api.dnkre.com/e42c7012-8478-4b82-9735-b2b3c05123e8damac.svg" />
        <link rel="apple-touch-icon" href="https://api.dnkre.com/e42c7012-8478-4b82-9735-b2b3c05123e8damac.svg" />

        {/* Preload OG image */}
        <link
          rel="preload"
          as="image"
          href="https://api.dnkre.com/image/islands2ad.webp"
          type="image/webp"
        />

        {/* Schema Markup */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([
              {
                "@context": "http://schema.org",
                "@type": "Organization",
                name: "DNK Real Estate",
                logo: "https://dnkre.com/favicon.ico",
                url: "https://dnkre.com",
                sameAs: [
                  "https://www.instagram.com/dnk_re/",
                  "https://www.facebook.com/dnkrealestate1/",
                  "https://www.linkedin.com/company/dnkrealestate/",
                  "https://www.youtube.com/channel/UCKH7d3Sx2dkfb4pEXXaMpFA",
                ],
                telephone: "+971555769195",
                email: "info@dnkre.com",
                address:
                  "Suite No: 603, Sama Building, Al Barsha 1 - Al Barsha, Dubai, United Arab Emirates",
              },
              {
                "@context": "http://schema.org",
                "@type": "Product",
                name: "Damac Island Phase 2 | Dubailand",
                description:
                  "Luxury waterfront townhouses and villas at Damac Islands 2 in Dubailand, Dubai. Starting from AED 2.3M with private beaches, lagoons, and resort-style living.",
                image: "https://api.dnkre.com/image/islands2ad.webp",
                url: "https://dnkre.com/damac-islands-new-community",
                brand: {
                  "@type": "Organization",
                  name: "Damac Properties",
                },
                offers: {
                  "@type": "Offer",
                  price: "2300000",
                  priceCurrency: "AED",
                  availability: "https://schema.org/InStock",
                  url: "https://dnkre.com/damac-islands-new-community",
                  seller: {
                    "@type": "Organization",
                    name: "DNK Real Estate",
                    url: "https://dnkre.com",
                  },
                },
              },
            ]),
          }}
        />
      </Head>

        <ADHeader />
        <HomeAddressHills />
      </>
  )
}