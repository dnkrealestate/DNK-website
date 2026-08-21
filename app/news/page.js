
import { getNews } from "@/services/newsServices";
import NewsAll from "./components/NewsAll";
import BannerNews from "./components/BannerNews";

export const metadata = {
    title: "News | DNK Real Estate",
    description:
        "",
    keywords:
        "Dubai real estate, buy property Dubai, sell property Dubai, villas for sale, apartments in Dubai, luxury properties",
    openGraph: {
        title: "News| Real Estate",
        description:
            "",
        url: "https://www.dnkre.com/news/",
        siteName: "DNK Real Estate",
        images: [
            {
                url: "https://www.dnkre.com/logo.webp",
                width: 1200,
                height: 630,
                alt: "DNK Real Estate Properties",
            },
        ],
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "News | Real Estate",
        description:
            "",
        images: ["https://www.dnkre.com/logo.webp"], // Replace with your actual image URL
    },
    robots: "index, follow",
    alternates: {
        canonical: "https://www.dnkre.com/news/",
    },
};

export default async function News() {
    let newsData = [];
    try {
        const [news] = await Promise.all([
            getNews(),
        ])
        if (news && Array.isArray(news)) {
            const sortedNews = news
                .sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));
            newsData=sortedNews
        }
    } catch (error) {
        console.error("Error fetching data:", error);
    }

    return (
        <>
            <BannerNews />
            <NewsAll newsData={newsData} />
        
        </>
    );
}