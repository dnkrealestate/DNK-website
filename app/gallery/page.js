import BannerGallery from "./component/BannerGallery";
import GoogleGallery from "./component/GoogleGallery";

export const metadata = {
    title: "Gallery | DNK Real Estate Dubai",
    description:
        "Step inside the vibrant world of DNK Real Estate. Our Gallery captures the spirit of our workplace — the energy, teamwork, and dedication that drive everything we do. From team collaborations and client meetings to office events and daily moments, get a glimpse of our dynamic environment and professional culture.",
    keywords:
        "good work life company in dubai, office life, job, Dubai real estate, Dubai jobs",
    openGraph: {
        title: "Gallery | DNK Real Estate Dubai",
        description:
            "Step inside the vibrant world of DNK Real Estate. Our Gallery captures the spirit of our workplace — the energy, teamwork, and dedication that drive everything we do. From team collaborations and client meetings to office events and daily moments, get a glimpse of our dynamic environment and professional culture.",
        url: "https://www.dnkre.com/gallery/",
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
        title: "Gallery | DNK Real Estate Dubai",
        description:
            "Step inside the vibrant world of DNK Real Estate. Our Gallery captures the spirit of our workplace — the energy, teamwork, and dedication that drive everything we do. From team collaborations and client meetings to office events and daily moments, get a glimpse of our dynamic environment and professional culture.",
        images: ["https://www.dnkre.com/favicon.ico"],
    },
    robots: "index, follow",
    alternates: {
        canonical: "https://www.dnkre.com/gallery/",
    },
};

const folderId = "1K06A7kVpfY2sJK1wkZ6uAWuZN3jXliLn";

async function fetchGalleryImages() {
    try {
        const apiKey = process.env.GOOGLE_DRIVE_API;
        const res = await fetch(
            `https://www.googleapis.com/drive/v3/files?q='${folderId}'+in+parents+and+mimeType+contains+'image/'&pageSize=20&key=${apiKey}`,
            { next: { revalidate: 300 } }
        );
        if (!res.ok) throw new Error("Failed to fetch images");
        const data = await res.json();
        return (
            data.files?.map((file) => ({
                id: file.id,
                name: file.name,
                url: `https://drive.google.com/uc?export=view&id=${file.id}`,
            })) || []
        );
    } catch (err) {
        console.error("Gallery fetch error:", err);
        return [];
    }
}

export default async function YouTubePage() {
    // Fetched here (server-side) so the API key never reaches the client
    // bundle, and the images are already in the HTML on first paint.
    const initialImages = await fetchGalleryImages();
    return (
        <div>
            <BannerGallery />
            <GoogleGallery initialImages={initialImages} />
        </div>
    );
}
