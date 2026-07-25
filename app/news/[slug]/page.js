import React from 'react';
import { getNews, getNewsSummary, getNewsById } from '@/services/newsServices';
import MainBannerNews from './components/MainBannerNews';
import NewsMain from './components/NewsMain';
import { WWURL } from '@/url/axios';
import { notFound } from 'next/navigation';

// Utility: generate consistent slugs
function generateSlug(name) {
    return name.toLowerCase().replace(/\s+/g, '-');
}

// ✅ Step 1: Generate static paths
export async function generateStaticParams() {
    const newsList = await getNewsSummary();
    if (!newsList || !Array.isArray(newsList)) return [];

    // Only prebuild the 30 most recent — same fix applied to the project
    // pages, which blew Vercel's 60s-per-page build timeout by prebuilding
    // everything at once. News is a smaller collection so less likely to
    // hit that ceiling, but no reason to risk it as it grows.
    const recentNews = newsList
        .slice()
        .sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt))
        .slice(0, 30);

    return recentNews.map((news) => ({
        slug: generateSlug(news.newsurl),
    }));
}

// ✅ Step 2: Generate metadata for SEO
export async function generateMetadata({ params }) {
    params = await params;
    const { slug } = params;
    // Only newstitle/newspara1/newsthumbnail are used below — all covered
    // by the summary projection, so no need for the full unfiltered fetch.
    const newsList = await getNewsSummary();

    const matchedNews = newsList.find(
        (n) => generateSlug(n.newsurl) === slug
    );

    if (!matchedNews) {
        return { title: "News Not Found" };
    }

    const {
        newstitle,
        newspara1,
        newsthumbnail
    } = matchedNews;

    const title = newstitle || 'News';
    const description = newspara1 || '';
    const thumbnailUrl = `${WWURL}${newsthumbnail}`;
    const canonicalUrl = `https://www.dnkre.com/news/${slug}`;

    return {
        title,
        description,
        keywords: [title].join(', '),
        openGraph: {
            title,
            description,
            url: canonicalUrl,
            siteName: 'DNK Real Estate',
            type: 'article',
            images: [
                {
                url: thumbnailUrl,
                width: 1200,
                height: 630,
                alt: title,
                type: 'image/webp',
                },
            ],
        },
        twitter: {
            card: "summary_large_image",
            title,
            description,
            image: thumbnailUrl,
        },
        alternates: {
            canonical: canonicalUrl,
        },
        icons: {
            icon: [
                { url: "/favicon.ico", sizes: "any" },
                { url: "/favicon-96x96.png", sizes: "96x96" },
                { url: "/favicon.svg", type: "image/svg+xml" }
            ],
            apple: "/apple-touch-icon.png",
        },
        metadataBase: new URL("https://www.dnkre.com"),
        meta: {
            author: "DNK Real Estate",
            robots: "index, follow",
        },
    };
}

// JSON-LD builders — rendered as real <script> tags directly in NewsDetail's
// JSX below, since generateMetadata's custom "jsonLd" field never renders.
function buildNewsSchemas({ title, description, thumbnailUrl, canonicalUrl }) {
    return [
        {
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
        },
        {
            // Per Google's BreadcrumbList spec, "item" must be a plain URL
            // string with "name" on the ListItem itself — a nested object
            // with no "@type" (as this used to be) is what Search Console
            // flags as an invalid object type.
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
                { "@type": "ListItem", position: 1, name: "Home", item: "https://www.dnkre.com" },
                { "@type": "ListItem", position: 2, name: "News", item: "https://www.dnkre.com/news" },
                { "@type": "ListItem", position: 3, name: title, item: canonicalUrl },
            ],
            numberOfItems: 3,
        },
        {
            "@context": "http://schema.org",
            "@type": "WebPage",
            mainEntity: {
                "@type": "WebPage",
                name: title,
                description,
                keywords: title,
                url: canonicalUrl,
                image: thumbnailUrl,
            },
        },
    ];
}

// ✅ Step 3: Render the page
export default async function NewsDetail({ params }) {
    params = await params;
    const { slug } = params;

    let newsData = null;
    let newsList = [];

    try {
        const allNews = await getNews();

        const matchedNews = allNews.find(
            (n) => generateSlug(n.newsurl) === slug
        );

        if (!matchedNews) return notFound();

        newsData = matchedNews;
        newsList = allNews
            .filter((n) => generateSlug(n.newsurl) !== slug)
            .sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));
    } catch (error) {
        console.error("Error fetching data:", error);
        return <div>Error loading news details.</div>;
    }

    const canonicalUrl = `https://www.dnkre.com/news/${slug}`;
    const thumbnailUrl = `${WWURL}${newsData.newsthumbnail}`;
    const newsSchemas = buildNewsSchemas({
        title: newsData.newstitle || 'News',
        description: newsData.newspara1 || '',
        thumbnailUrl,
        canonicalUrl,
    });

    return (
        <>
            {newsSchemas.map((schema, i) => (
                <script
                    key={i}
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
                />
            ))}
            <MainBannerNews newsId={newsData} />
            <NewsMain
                newsId={newsData}
                newsList={newsList}
            />
        </>
    );
}
