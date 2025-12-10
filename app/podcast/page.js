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

export default function YouTubePage() {
    return (
        <div>
            <BannerPodcast />
            <YouTubeFeed />
        </div>
    );
}
