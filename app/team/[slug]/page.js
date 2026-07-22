import { getTeamById, getTeamList } from '@/services/teamServices';
import React from 'react'
import TeamDetail from './components/TeamDetail';
import OurProcess from '@/app/components/ourProcess/OurProcess';
import TalkSection from '@/app/components/talkSection/TalkSection';
import ReviewSection from '@/app/components/reviewSection/ReviewSection';
import { getReview } from '@/services/reviewServices';
import { WWURL } from '@/url/axios';

export async function generateMetadata({params}) {
    const { slug } = await params;

    const team = await getTeamById({ id: slug });
    if (!team || !team.data) {
        return {
            title: "Team Not Found",
        };
    }

    const { name, position, aboutpara1, image } = team.data;

    const title = `${name} - ${position} at DNK Real Estate Dubai`;
    const description = aboutpara1 || `Meet ${name}, ${position} at DNK Real Estate — Dubai's trusted real estate brokerage.`;
    const keywords = [
        name,
        position,
        `${name} DNK Real Estate`,
        'DNK Real Estate team',
        'Dubai real estate agent',
    ];
    const canonicalUrl = `https://www.dnkre.com/team/${slug}`;
    const imageUrl = image ? `${WWURL}${image}` : 'https://www.dnkre.com/favicon.ico';

    return {
        title,
        description,
        keywords: keywords.join(', '),
        openGraph: {
            title,
            description,
            url: canonicalUrl,
            siteName: 'DNK Real Estate',
            type: 'profile',
            images: [
                {
                    url: imageUrl,
                    width: 1200,
                    height: 630,
                    alt: name,
                },
            ],
        },
        twitter: {
            card: 'summary_large_image',
            title,
            description,
            images: [imageUrl],
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
        metadataBase: "https://www.dnkre.com",
        robots: "index, follow",
    };
}

export async function generateStaticParams() {
    try {
        const teams = await getTeamList(); // Fetch the list of teams from your service

        if (!teams || !Array.isArray(teams)) {
            throw new Error('Failed to fetch teams list or invalid response');
        }

        return teams.map((team) => ({
            slug: team.user_id, // Map each team to a slug (assuming `id` is used as the slug)
            paths: [], // keep this small
            fallback: 'blocking',
        }));
    } catch (error) {
        console.error("Error fetching team list:", error);
        return [];
    }
}


export default async function teamDetail({ params }) {
    const { slug } = await params;

    let teamData = null;
    let reviewData = [];

    try {
        const [team, review] = await Promise.all([
            getTeamById({ id: slug }),
            getReview(),
        ])
        teamData = team.data;
        reviewData = review; 

    } catch (error) {
        console.error("Error fetching data:", error);
    }

    const sortReview = reviewData
        .sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt))

    if (!teamData) {
        return <div>Error: Team not found</div>;
    }

    const personSchema = {
        "@context": "http://schema.org",
        "@type": "Person",
        name: teamData.name,
        jobTitle: teamData.position,
        worksFor: {
            "@type": "Organization",
            name: "DNK Real Estate",
            url: "https://dnkre.com",
        },
        image: teamData.image ? `${WWURL}${teamData.image}` : undefined,
        url: `https://www.dnkre.com/team/${slug}`,
        telephone: teamData.phone,
    };

  return (
      <>
          <script
              type="application/ld+json"
              dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
          />
          <TeamDetail teamData={teamData} />
          <OurProcess />
          <ReviewSection reviewData={sortReview} />
          <TalkSection />
      </>
  )
}