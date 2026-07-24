import BannerPodcast from "./componet/BannerPodcast";
import YouTubeFeed from "./componet/YouTubeFeed";

export const metadata = {
    title: "Podcast | DNK Real Estate Dubai",
    description:
        "Welcome to Dubai Real Estate — your go-to podcast for insights, trends, and expert advice on Dubai's dynamic property market. Whether you're a first-time buyer, seasoned investor, or simply curious about the city's booming real estate scene, we break down everything you need to know.",
    keywords:
        "Dubai real estate podcast, Buy property in Dubai, Dubai off- plan projects, Dubai property investment, Real estate market Dubai, Dubai property trends, Dubai villas and apartments, UAE property laws, Living in Dubai, Real estate tips Dubai, DNK Real Estate, Dubai real estate news, Real estate for expats in Dubai, Rent vs Buy Dubai",
    openGraph: {
        title: "Podcast | DNK Real Estate Dubai",
        description:
            "Welcome to Dubai Real Estate — your go-to podcast for insights, trends, and expert advice on Dubai's dynamic property market. Whether you're a first-time buyer, seasoned investor, or simply curious about the city's booming real estate scene, we break down everything you need to know.",
        url: "https://www.dnkre.com/podcast/",
        siteName: "DNK Real Estate",
        images: [
            {
                url: "https://www.dnkre.com/favicon.ico",
                width: 1200,
                height: 630,
                alt: "DNK Real Estate Properties",
            },
        ],
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "podcast | DNK Real Estate Dubai",
        description:
            "Welcome to Dubai Real Estate — your go-to podcast for insights, trends, and expert advice on Dubai's dynamic property market. Whether you're a first-time buyer, seasoned investor, or simply curious about the city's booming real estate scene, we break down everything you need to know.",
        images: ["https://www.dnkre.com/favicon.ico"],
    },
    robots: "index, follow",
    alternates: {
        canonical: "https://www.dnkre.com/podcast/",
    },
};

async function fetchInitialVideos() {
    try {
        const API_KEY = process.env.YOUTUBE_API_KEY;
        const PLAYLIST_ID = process.env.YOUTUBE_PLAYLIST_ID;
        if (!API_KEY || !PLAYLIST_ID) return [];

        const res = await fetch(
            `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=30&playlistId=${PLAYLIST_ID}&key=${API_KEY}`,
            { next: { revalidate: 60 } }
        );
        if (!res.ok) throw new Error("Failed to fetch from YouTube API");

        const data = await res.json();
        return (
            data.items?.filter((item) => item.snippet?.resourceId?.videoId) || []
        );
    } catch (error) {
        console.error("YouTube API Error:", error);
        return [];
    }
}

export default async function YouTubePage() {
    // Fetched here (server-side) so the video list and first thumbnails are
    // already in the HTML on first paint instead of a client-side spinner.
    const initialVideos = await fetchInitialVideos();
    return (
        <div>
            <BannerPodcast />
            <YouTubeFeed initialVideos={initialVideos} />
        </div>
    );
}
