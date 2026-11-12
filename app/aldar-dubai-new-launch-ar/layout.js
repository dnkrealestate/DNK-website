import { Amiri, Cairo } from "next/font/google";

const amiri = Amiri({
  subsets: ["arabic"],
  weight: ["400", "700"],
  variable: "--font-display",
  display: "swap",
});

const cairo = Cairo({
  subsets: ["arabic"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-body",
  display: "swap",
});

const OG_IMAGE = "/assets/aldar-dubai-launch/images/masterplan-pin.webp";
const PAGE_URL = "https://www.dnkre.com/aldar-dubai-new-launch-ar";

export const metadata = {
  title: "إطلاق ألدار الجديد في دبي | تاون هاوس وفيلات وخطة الدفع",
  description:
    "اكتشف إطلاق ألدار السكني الجديد والمعلن في دبي، بتاون هاوس بثلاث غرف نوم من 2.875 مليون درهم، وفيلات من 3.95 مليون درهم، وخطة دفع 55/45.",
  keywords:
    "إطلاق ألدار دبي, تاون هاوس ألدار دبي, فيلات ألدار دبي, شارع العين E66, فيلات واحة دبي للسيليكون, تاون هاوس مدينة الأكاديميين, خطة دفع ألدار 55/45",
  icons: {
    icon: [
      { url: "/assets/aldar-dubai-launch/logos/logo-aldar-ink.svg", type: "image/svg+xml" },
    ],
    shortcut: "/assets/aldar-dubai-launch/logos/logo-aldar-ink.svg",
    apple: "/assets/aldar-dubai-launch/logos/logo-aldar-ink.svg",
  },
  openGraph: {
    title: "إطلاق ألدار الجديد في دبي | تاون هاوس وفيلات وخطة الدفع",
    description:
      "تاون هاوس بثلاث غرف نوم من 2.875 مليون درهم، وفيلات من 3.95 مليون درهم. خطة دفع معلنة 55/45. سجّل اهتمامك مع DNK العقارية.",
    url: PAGE_URL,
    siteName: "DNK Real Estate",
    type: "website",
    locale: "ar_AE",
    images: [
      {
        url: OG_IMAGE,
        width: 940,
        height: 1015,
        alt: "إطلاق ألدار السكني الجديد في دبي — تصميم تخيلي معلن للمخطط الرئيسي",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "إطلاق ألدار الجديد في دبي | تاون هاوس وفيلات وخطة الدفع",
    description:
      "تاون هاوس بثلاث غرف نوم من 2.875 مليون درهم، وفيلات من 3.95 مليون درهم. خطة دفع معلنة 55/45.",
    images: [OG_IMAGE],
  },
  alternates: {
    canonical: PAGE_URL,
    languages: {
      en: "https://www.dnkre.com/aldar-dubai-new-launch",
      ar: PAGE_URL,
    },
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

const jsonLdSchema = {
  "@context": "https://schema.org",
  "@type": "Product",
  name: "إطلاق ألدار السكني الجديد في دبي",
  description:
    "إطلاق سكني جديد ومعلن من ألدار في دبي يضم تاون هاوس بثلاث غرف نوم من 2.875 مليون درهم وفيلات بثلاث غرف نوم من 3.95 مليون درهم، مع خطة دفع 55/45. اسم المشروع النهائي وموقعه ومواصفاته تخضع لتأكيد المطوّر.",
  url: PAGE_URL,
  image: `https://www.dnkre.com${OG_IMAGE}`,
  brand: {
    "@type": "Organization",
    name: "ألدار",
  },
  additionalProperty: [
    { "@type": "PropertyValue", name: "أنواع الوحدات", value: "تاون هاوس وفيلات بثلاث غرف نوم" },
    { "@type": "PropertyValue", name: "خطة الدفع (المعلنة)", value: "55/45" },
  ],
  offers: {
    "@type": "Offer",
    price: "2875000",
    priceCurrency: "AED",
    availability: "https://schema.org/PreOrder",
    url: PAGE_URL,
    seller: {
      "@type": "RealEstateAgent",
      name: "DNK Real Estate",
      url: "https://dnkre.com",
      telephone: "+971555769195",
      address: {
        "@type": "PostalAddress",
        streetAddress: "Suite No: 603, Sama Building, Al Barsha 1",
        addressLocality: "Dubai",
        addressCountry: "AE",
      },
    },
  },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "الرئيسية", item: "https://www.dnkre.com" },
    {
      "@type": "ListItem",
      position: 2,
      name: "إطلاق ألدار الجديد في دبي",
      item: PAGE_URL,
    },
  ],
};

export default function AldarDubaiNewLaunchArLayout({ children }) {
  return (
    <div dir="rtl" lang="ar" className={`${amiri.variable} ${cairo.variable}`}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      {children}
    </div>
  );
}
