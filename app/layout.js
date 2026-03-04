import { Poppins } from "next/font/google";
import "./globals.css";
import { SplashProvider } from "./context/SplashContext";
import ClientWrapper from "./components/ClientWrapper";
import Script from "next/script";
import { GoogleTagManager } from "@next/third-parties/google";
import { getLogo } from "@/services/projectServices";
import { getDeveloperSlugs } from "@/utils/developerSlugs";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const coverImageUrl =
  "https://lh3.googleusercontent.com/p/AF1QipMGg3wpa6l31rxUQyV7-wHeGDKZ0GKjyPsso52e=s1360-w1360-h1020";

/* ✅ GLOBAL SEO (Next.js App Router supported only) */
export const metadata = {
  metadataBase: new URL("https://www.dnkre.com"),
  title: {
    default:
      "Best Off Plan Properties in Dubai | Apartments, Villas & Investments",
    // template: "%s | DNK Real Estate",
  },
  description:
    "Discover your ideal property in Dubai with DNK Real Estate. Explore off-plan projects, luxury apartments, villas, and high-ROI investment opportunities.",
  keywords:
    "Off Plan Properties Dubai, Dubai Real Estate, Apartments for Sale Dubai, Villas Dubai",
  openGraph: {
    title:
      "Best Off Plan Properties in Dubai | Apartments, Villas & Investments",
    description:
      "Explore premium off-plan properties in Dubai with high ROI potential.",
    url: "https://www.dnkre.com/",
    siteName: "DNK Real Estate",
    images: [
      {
        url: coverImageUrl,
        width: 1200,
        height: 630,
        alt: "DNK Real Estate Dubai",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    images: [coverImageUrl],
  },
  robots: "index, follow",
};

export default async function RootLayout({ children }) {
  let logoData = null;
  const developerSlugs = await getDeveloperSlugs();

  try {
    const logo = await getLogo();
    logoData = logo?.[0] || null;
  } catch (error) {
    console.error("Logo fetch failed:", error);
  }

  return (
    <html lang="en">
      <body className={`antialiased ${poppins.className}`}>
        {/* ✅ Google Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-Q883FW1J89"
          strategy="afterInteractive"
        />
        <Script id="ga-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-Q883FW1J89');
          `}
        </Script>

         {/* ✅ Google Tag Manager */}
      <GoogleTagManager gtmId="GTM-WN4SJSW3" />

      {/* ✅ Meta Pixel Code */}
        <Script
          id="meta-pixel"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              !function(f,b,e,v,n,t,s)
              {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
              n.callMethod.apply(n,arguments):n.queue.push(arguments)};
              if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
              n.queue=[];t=b.createElement(e);t.async=!0;
              t.src=v;s=b.getElementsByTagName(e)[0];
              s.parentNode.insertBefore(t,s)}(window, document,'script',
              'https://connect.facebook.net/en_US/fbevents.js');
              fbq('init', '702378121580941'); https://connect.facebook.net/en_US/fbevents.js');
              fbq('track', 'PageView');
            `,
          }}
        />

        {/* ✅ Meta Pixel NoScript Fallback */}
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: "none" }}
            src={`https://www.facebook.com/tr?id=702378121580941&ev=PageView&noscript=1`}
            alt="meta-pixel"
          />
        </noscript>
        

        {/* ✅ JSON-LD (SEO safe) */}
        <Script
          id="jsonld-org"
          type="application/ld+json"
          strategy="afterInteractive"
        >
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            name: "DNK Real Estate",
            url: "https://www.dnkre.com",
            logo: "https://www.dnkre.com/logo.webp",
            sameAs: [
              "https://www.instagram.com/dnk_re/",
              "https://www.facebook.com/dnkrealestate1/",
              "https://www.linkedin.com/company/dnkrealestate/",
            ],
          })}
        </Script>

        <SplashProvider>
          <ClientWrapper developerSlugs={developerSlugs} spclLogo={logoData}>
            {children}
          </ClientWrapper>
        </SplashProvider>
      </body>
    </html>
  );
}
