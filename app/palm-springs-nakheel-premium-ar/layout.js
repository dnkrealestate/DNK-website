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

const OG_IMAGE =
  "https://www.dnkre.com/assets/palm-springs-nakheel/images/hero-waterfront-sunset.png";
const PAGE_URL = "https://www.dnkre.com/palm-springs-nakheel-premium-ar";

export const metadata = {
  title: "بالم سبرينغز من نخيل | تاون هاوس وفيلات ما قبل الإطلاق، دبي",
  description:
    "بالم سبرينغز من نخيل في جبل علي، دبي — تاون هاوس وفيلات جديدة ما قبل الإطلاق بأسعار تبدأ من 1.03 مليون دولار. سجّل الآن للحصول على الأسعار والمخططات والإصدار الأول.",
  alternates: {
    canonical: PAGE_URL,
    languages: {
      en: "https://www.dnkre.com/palm-springs-nakheel-premium",
      ar: PAGE_URL,
    },
  },
  openGraph: {
    title: "بالم سبرينغز من نخيل | تاون هاوس وفيلات ما قبل الإطلاق، دبي",
    description:
      "مجتمع جديد من نخيل في جبل علي، دبي. تاون هاوس وفيلات بأسعار تبدأ من 1.03 مليون دولار — سجّل الآن للحصول على الأسعار والمخططات والإصدار الأول.",
    url: PAGE_URL,
    siteName: "بالم سبرينغز من نخيل",
    images: [{ url: OG_IMAGE, width: 1674, height: 940, alt: "بالم سبرينغز من نخيل — فيلات عند الغروب" }],
    type: "website",
    locale: "ar_AE",
  },
  twitter: {
    card: "summary_large_image",
    title: "بالم سبرينغز من نخيل | ما قبل الإطلاق، جبل علي",
    description:
      "تاون هاوس وفيلات جديدة من نخيل في جبل علي، دبي، بأسعار تبدأ من 1.03 مليون دولار. سجّل الآن للحصول على الإصدار الأول.",
    images: [OG_IMAGE],
  },
  robots: "index, follow",
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "الرئيسية", item: "https://www.dnkre.com/" },
    { "@type": "ListItem", position: 2, name: "بالم سبرينغز من نخيل", item: PAGE_URL },
  ],
};

export default function PalmSpringsPremiumArLayout({ children }) {
  return (
    <div dir="rtl" lang="ar" className={`${amiri.variable} ${cairo.variable}`}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      {children}
    </div>
  );
}
