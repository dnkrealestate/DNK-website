
import BannerHome from "./components/BannerHome";
import AboutSection from "./components/about/AboutSection";
import { URL } from "@/url/axios";
import ProjectList from "./components/projectList/ProjectList";
import { getAd, getEvent, getHomeBanner } from "@/services/projectServices";
import { getNews } from "@/services/newsServices";
import NewsList from "./components/news/NewsList";
import ServiceSection from "./components/serviceSection/ServiceSection";
import { getTeamList } from "@/services/teamServices";
import TeamSection from "./components/team/TeamSection";
import OurProcess from "./components/ourProcess/OurProcess";
import { getPartner } from "@/services/partnerServices";
import { getReview } from "@/services/reviewServices";
import ReviewSection from "./components/reviewSection/ReviewSection";
import PartnerSection from "./components/partner/PartnerSection";
import TalkSection from "./components/talkSection/TalkSection";
import PostHogClient from "./posthog";

async function fetchProjects() {
  const res = await fetch(`${URL}task/get-task-public`);
  const data = await res.json();
  return data.success ? data.data : [];
}



export default async function Home() {
  let projects = [];
  let bannerData = null;
  let eventData = null;
  let adData = null;
  let mainNews = [];
  let SliderNews = [];
  let teamData = [];
  let reviewData = [];
  let partnerData = [];

  const postHogClient = PostHogClient();

  postHogClient.capture({
    distinctId: 'user-id', // Replace with actual user ID if available
    event: 'Home Page',
    properties: {
      page: 'Home',
      timestamp: new Date().toISOString(),
    },
  })

  try {
    // Fetch all data concurrently
    const [projectsData, banners, event, ad, news, team, review, partner] = await Promise.all([
      fetchProjects(),
      getHomeBanner(),
      getEvent(),
      getAd(),
      getNews(),
      getTeamList(),
      getReview(),
      getPartner(),
    ]);

    projects = projectsData;
    bannerData = banners.length > 0 ? banners[0] : null;
    eventData = event.length > 0 ? event[0] : null;
    adData = ad.length > 0 ? ad[0] : null;
    reviewData = review;
    partnerData = partner;
    
    if (team && Array.isArray(team)) {
      const sortedTeam = team
        .map((item) => ({ ...item, sortKey: Math.random() }))
        .sort((a, b) => a.sortKey - b.sortKey)
        .slice(0, 6);
      teamData = sortedTeam
    }
    if (news && Array.isArray(news)) {
      const sortedNews = news
        .sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));
      mainNews = sortedNews.length > 0 ? sortedNews[0] : null;
      SliderNews = sortedNews.length > 0 ? sortedNews.slice(1) : null;
    }
    if (partner && Array.isArray(partner)) {
      const sortedPartner = partner
        .map((item) => ({ ...item, sortKey: Math.random() }))
        .sort((a, b) => a.sortKey - b.sortKey)
        .slice(0, 12);
      partnerData = sortedPartner
    }
  } catch (error) {
    console.error("Error fetching data:", error);
  }

  const filteredProjects = projects
    .filter((data) => data.status === "off-plan") 
    .sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt)) 
    .slice(0, 6); 
  
  const sortReview = reviewData
    .sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt))
  
  return (
    <>
      <BannerHome banner={bannerData} event={eventData} ad={adData} />
      <ProjectList projects={filteredProjects} />
      <AboutSection />
      <NewsList mainNews={mainNews} SliderNews={SliderNews} />
      <ServiceSection />
      <TeamSection teamData={teamData} />
      <OurProcess />
      <ReviewSection reviewData={sortReview} />
      <PartnerSection partnerData={partnerData} />
      <TalkSection />
    </>
  );
}

