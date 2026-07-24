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
  const base = `https://www.dnkre.com/promotion/${promoUrlSlug}`;
  // Per Google's BreadcrumbList spec, "item" must be a plain URL string with
  // "name" on the ListItem itself — nesting an object with an arbitrary/
  // invalid "@type" (e.g. "PaymentPlan" isn't a real schema.org type) is what
  // Search Console flags as an invalid object type. The first item also used
  // to point back at this page's own URL while labeled "Home" — fixed to
  // point at the real homepage.
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://www.dnkre.com" },
      { "@type": "ListItem", position: 2, name: "About", item: `${base}/about` },
      { "@type": "ListItem", position: 3, name: "Contact", item: `${base}/contact` },
      { "@type": "ListItem", position: 4, name: "Payment Plan", item: `${base}/paymentPlan` },
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
