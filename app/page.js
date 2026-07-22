
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
import { getCreatedTime } from "@/utils/projectSort";
import PartnerSection from "./components/partner/PartnerSection";
import TalkSection from "./components/talkSection/TalkSection";


/* ✅ ISR: regenerate once per month */
export const revalidate = 2592000;

/* ===============================
   Monthly Seeded Random Helpers
================================ */
function seededRandom(seed) {
  let x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}


function getMonthlySeed() {
  const now = new Date();
  return now.getFullYear() * 100 + (now.getMonth() + 1);
}



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

    const monthSeed = getMonthlySeed();

    projects = projectsData;
    bannerData = banners.length > 0 ? banners[0] : null;
    eventData = event.length > 0 ? event[0] : null;
    adData = ad.length > 0 ? ad[0] : null;
    reviewData = review;
    partnerData = partner;
    
    
    /* ✅ Monthly random TEAM */
    if (Array.isArray(team)) {
      teamData = team
        .map((item, index) => ({
          ...item,
          sortKey: seededRandom(monthSeed + index),
        }))
        .sort((a, b) => a.sortKey - b.sortKey)
        .slice(0, 6);
    }

    /* ✅ Latest NEWS */
    if (news && Array.isArray(news)) {
      const sortedNews = news
        .sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));
      mainNews = sortedNews.length > 0 ? sortedNews[0] : null;
      SliderNews = sortedNews.length > 0 ? sortedNews.slice(1) : null;
    }

    /* ✅ Monthly random PARTNER */
    if (Array.isArray(partner)) {
      partnerData = partner
        .map((item, index) => ({
          ...item,
          sortKey: seededRandom(monthSeed + index + 1000),
        }))
        .sort((a, b) => a.sortKey - b.sortKey)
        .slice(0, 12);
    }

  } catch (error) {
    console.error("Error fetching data:", error);
  }

  const filteredProjects = projects
    .filter((data) => data.status === "off-plan")
    .sort((a, b) => getCreatedTime(b) - getCreatedTime(a))
    .slice(0, 6);
  
  const sortReview = reviewData
    .sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt))
  
  return (
    <>
      <BannerHome banner={bannerData} event={eventData} ad={adData} />
      <ProjectList projects={filteredProjects} />
      <AboutSection banner={bannerData}/>
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

