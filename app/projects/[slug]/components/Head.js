"use client"
import { WWURL } from "@/url/axios";
import Head from "next/head";

export default function SEOProject({ projectId, ProjectURL }) {
    const currentYear = new Date().getFullYear();

    // Extract data for SEO
    const keywords = [
        `${projectId.projectname}`, `${projectId.projectkeyword}`, `${projectId.locationname}`,
        `${projectId.developer.replace(/-/g, " ")} ${projectId.projectname}`,
        `${projectId.developer.replace(/-/g, " ")}`,
        `${projectId.projectname} by ${projectId.developer.replace(/-/g, " ")}`,
        `${projectId.projectname} at ${projectId.locationname}`,
        `${projectId.locationname}`,
        `Properties in ${projectId.locationname}`,
        `Buy property in ${projectId.locationname}`,
        `Best property ${projectId.currentYear}`,
        `${projectId.locationname} properties`,
        `Dubai property prices ${projectId.currentYear}`,
        `Luxury properties in Dubai`
    ];

    const canonicalURL = ProjectURL;
    const developerLogo = `${WWURL}${projectId.developerlogo}`;

    return (
        <Head>
            <title>{`${projectId.projectname} at ${projectId.locationname} - ${projectId.developer.replace(/-/g, " ")}`}</title>
            <meta name="keywords" content={keywords.join(", ")} />
            <meta name="description" content={`${projectId.description} ${projectId.about}`} />
            <link rel="canonical" href={canonicalURL} />
            <meta name="author" content="DNK Real Estate" />
            <meta name="robots" content="index, follow" />

            {/* Open Graph / Facebook */}
            <meta property="og:url" content={canonicalURL} />
            <meta property="og:type" content="website" />
            <meta property="og:title" content={`${projectId.projectname} at ${projectId.locationname} - ${projectId.developer.replace(/-/g, " ")}`} />
            <meta property="og:description" content={`${projectId.description} ${projectId.about}`} />
            <meta property="og:image" content={`${WWURL}${projectId.thumbnail}`} />

            {/* Twitter */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={`${projectId.projectname} at ${projectId.locationname} - ${projectId.developer.replace(/-/g, " ")}`} />
            <meta name="twitter:description" content={`${projectId.description} ${projectId.about}`} />
            <meta name="twitter:image" content={`${WWURL}${projectId.thumbnail}`} />

            {/* Preload Images */}
            <link rel="preload" as="image" href={`${WWURL}${projectId.thumbnail}`} type="image/webp" fetchPriority="high" />
            <link rel="preload" as="image" href={`${WWURL}${projectId.coverimage}`} type="image/webp" fetchPriority="high" />
            <link rel="preload" as="image" href={developerLogo} type="image/webp" fetchPriority="high" />
        </Head>
    );
}
