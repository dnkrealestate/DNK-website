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

export default function YouTubePage() {
    return (
        <div>
            <BannerGallery />
            <GoogleGallery />
        </div>
    );
}
