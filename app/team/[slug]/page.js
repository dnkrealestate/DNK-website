import { getTeamById, getTeamList } from '@/services/teamServices';
import React from 'react'
import TeamDetail from './components/TeamDetail';
import OurProcess from '@/app/components/ourProcess/OurProcess';
import TalkSection from '@/app/components/talkSection/TalkSection';
import ReviewSection from '@/app/components/reviewSection/ReviewSection';
import { getReview } from '@/services/reviewServices';

export async function generateMetadata({params}) {
    const { slug } = await params;

    const team = await getTeamById({ id: slug });
    if (!team || !team.data) {
        return {
            title: "Team Not Found",
        };
    }

    const { id, name, position, aboutpara1 } = team.data;

    const title = `Best ${position} in DNK ${name}`;
    const description = `${aboutpara1}`;
    const keywords = [
        
    ]
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

  return (
      <>
          <TeamDetail teamData={teamData} />
          <OurProcess />
          <ReviewSection reviewData={sortReview} />
          <TalkSection />
      </>
  )
}