// Shared JSON-LD builders for every /promotion/[slug]/* sub-page. Rendered as
// real <script type="application/ld+json"> tags directly in each page's JSX
// (see page.js files in this tree) — Next's Metadata API has no built-in
// "jsonLd" field, so returning one from generateMetadata silently renders
// nothing.
export function buildOrganizationSchema() {
  return {
    "@context": "http://schema.org",
    "@type": "Organization",
    name: "DNK Real Estate",
    logo: "https://www.dnkre.com/favicon.ico",
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
  };
}

export function buildPromotionBreadcrumbSchema(promoUrlSlug) {
  const base = `https://dnkre.com/promotion/${promoUrlSlug}`;
  return {
    "@context": "http://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, item: { "@id": base, name: "Home" } },
      {
        "@type": "ListItem",
        position: 2,
        item: { "@type": "AboutPage", name: "About", "@id": `${base}/about` },
      },
      {
        "@type": "ListItem",
        position: 3,
        item: { "@type": "ContactPage", name: "Contact", "@id": `${base}/contact` },
      },
      {
        "@type": "ListItem",
        position: 4,
        item: { "@type": "PaymentPlan", name: "Payment-Plan", "@id": `${base}/paymentPlan` },
      },
    ],
    numberOfItems: 4,
  };
}

export function buildPromotionItemPageSchema({
  title,
  description,
  keywordsStr,
  canonicalUrl,
  thumbnailUrl,
  promotionData,
}) {
  return {
    "@context": "http://schema.org",
    "@type": "ItemPage",
    mainEntity: {
      "@type": "WebPage",
      name: title,
      description,
      keywords: keywordsStr,
      url: canonicalUrl,
      image: thumbnailUrl,
      offers: [
        {
          "@type": "Offer",
          name: title,
          price: promotionData?.startingPrice,
          priceCurrency: "AED",
          itemOffered: {
            "@type": "House",
            name: title,
            logo: thumbnailUrl,
            url: canonicalUrl,
            image: thumbnailUrl,
          },
          offeredBy: {
            "@type": "Organization",
            name: "DNK Real Estate",
            address: "Suite No: 603, Sama Building, Al Barsha 1 - Al Barsha, Dubai, United Arab Emirates",
            telephone: "+971555769195",
            email: "info@dnkre.com",
            image: thumbnailUrl,
            sponsor: {
              "@type": "Organization",
              url: canonicalUrl,
              name: promotionData?.developer?.replace(/-/g, " "),
            },
          },
        },
      ],
    },
  };
}

// One shared component to render all 3 schemas — used identically by every
// promotion sub-page.
export function PromotionJsonLd({ promotionData, title, description, keywordsStr, canonicalUrl, thumbnailUrl }) {
  const promoUrlSlug = promotionData.promoUrl.replace(/\s+/g, "-").toLowerCase();
  const organizationSchema = buildOrganizationSchema();
  const breadcrumbSchema = buildPromotionBreadcrumbSchema(promoUrlSlug);
  const itemPageSchema = buildPromotionItemPageSchema({
    title,
    description,
    keywordsStr,
    canonicalUrl,
    thumbnailUrl,
    promotionData,
  });

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemPageSchema) }} />
    </>
  );
}
