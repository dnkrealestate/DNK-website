import React from 'react';
import { getNews, getNewsById } from '@/services/newsServices';
import MainBannerNews from './components/MainBannerNews';
import NewsMain from './components/NewsMain';
import { getProjectList } from '@/services/projectServices';
import { WWURL } from '@/url/axios';
import { notFound } from 'next/navigation';

// Utility: generate consistent slugs
function generateSlug(name) {
    return name.toLowerCase().replace(/\s+/g, '-');
}

// ✅ Step 1: Generate static paths
export async function generateStaticParams() {
    const newsList = await getNews();
    if (!newsList || !Array.isArray(newsList)) return [];

    return newsList.map((news) => ({
        slug: generateSlug(news.newsurl),
    }));
}

// ✅ Step 2: Generate metadata for SEO
export async function generateMetadata({ params }) {
    params = await params;
    const { slug } = params;
    const newsList = await getNews();

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
        link: [
            { rel: "canonical", href: canonicalUrl },
            { rel: "preload", as: "image", href: thumbnailUrl, type: "image/webp", fetchpriority: "high" },
            { rel: "shortcut icon", href: "https://www.dnkre.com/favicon.ico" },
        ],
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
        jsonLd: [
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
                "@context": "http://schema.org",
                "@type": "BreadcrumbList",
                itemListElement: [
                    { "@type": "ListItem", position: 1, item: { "@id": "https://dnkre.com", name: "Home" } },
                    { "@type": "ListItem", position: 2, item: { "@id": "https://www.dnkre.com/news", name: "News" } },
                    { "@type": "ListItem", position: 3, item: { "@id": "https://dnkre.com/off-plan-project", name: "Properties" } },
                    { "@type": "ListItem", position: 4, item: { "@id": "https://dnkre.com/contact", name: "Contact" } },
                ],
                numberOfItems: 4,
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
        ],
    };
}

// ✅ Step 3: Render the page
export default async function NewsDetail({ params }) {
    params = await params;
    const { slug } = params;

    let newsData = null;
    let newsList = [];
    let projects = [];

    try {
        const [allNews, projectData] = await Promise.all([
            getNews(),
            getProjectList()
        ]);

        const matchedNews = allNews.find(
            (n) => generateSlug(n.newsurl) === slug
        );

        if (!matchedNews) return notFound();

        newsData = matchedNews;
        newsList = allNews
            .filter((n) => generateSlug(n.newsurl) !== slug)
            .sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));

        projects = Array.isArray(projectData) ? projectData : [];
    } catch (error) {
        console.error("Error fetching data:", error);
        return <div>Error loading news details.</div>;
    }

    const filteredProjects = projects
        .sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt))
        .filter((data) => data.status === "off-plan")
        .slice(0, 10);

    return (
        <>
            <MainBannerNews newsId={newsData} />
            <NewsMain
                projects={filteredProjects}
                newsId={newsData}
                newsList={newsList}
            />
        </>
    );
}
