import { getPartner } from "@/services/partnerServices";
import { getProjectList } from '@/services/projectServices';
import DeveloperInfo from "./components/DeveloperInfo";
import DeveloperProjectGridList from "./components/DeveloperProjectGridList";
import { WWURL } from "@/url/axios";


// ✅ Slug generator
function generateSlug(name) {
  return name
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-") // spaces to hyphen
    .replace(/[^a-z0-9-]/g, ""); // remove special chars
}

// ✅ Static paths
export async function generateStaticParams() {
  const developers = await getPartner();

  // only prebuild first 20 developers
  return developers.slice(0, 20).map(dev => ({
    slug: generateSlug(dev.partnername),
  }));
}

// ✅ Metadata
export async function generateMetadata({ params }) {
  const { slug } = await params;
  const developerList = await getPartner();

  const matchedDeveloper = developerList.find(
    (n) => generateSlug(n.partnername) === slug
  );

  if (!matchedDeveloper) {
    return {
      title: "Developer Not Found | DNK Real Estate",
      description: "The requested developer could not be found.",
    };
  }

  const {
    partnername,
    image,
    partnerdescription
  } = matchedDeveloper;

  const title = `${partnername} | DNK Real Estate`;
  const description = partnerdescription || `Discover projects by ${partnername} with DNK Real Estate.`;
  const thumbnailUrl = `${WWURL}${image}`;
  const canonicalUrl = `https://www.dnkre.com/developer/${slug}`;

  return {
    title,
    description,
    keywords: [
      partnername,
      `${partnername} projects`,
      "Dubai real estate",
      "off-plan properties",
      "DNK Real Estate"
    ],
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      siteName: 'DNK Real Estate',
      type: 'article',
      images: [
        {
          url: thumbnailUrl,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [thumbnailUrl],
    },
    alternates: {
      canonical: canonicalUrl,
    },
    icons: {
      icon: [
        { url: "/favicon.ico" },
        { url: "/favicon-96x96.png", sizes: "96x96" },
        { url: "/favicon.svg", type: "image/svg+xml" },
      ],
      apple: "/apple-touch-icon.png",
    },
  };
}

export default async function DeveloperInfoPage({ params }) {
  const { slug } = await params;
  let developerData = null;
  let projects = [];
  let partnerData = [];

  try {
    const developersData = await getPartner();

    const matched = developersData.find(
      proj => generateSlug(proj.partnername) === slug
    );

    if (matched) {
      developerData = matched;
    }
     const [projectsData, partner] = await Promise.all([
                    getProjectList(),
                    getPartner(),
     ])
    projects = projectsData;
    partnerData = partner;

    if (partner && Array.isArray(partner)) {
      const sortedPartner = partner
        .slice()
        .sort((a, b) => {
          const nameA = a.partner_name?.toLowerCase() || '';
          const nameB = b.partner_name?.toLowerCase() || '';
          return nameA.localeCompare(nameB);
        });
      partnerData = sortedPartner
    }
  } catch (error) {
    console.error("Error fetching developer:", error);
  }

  const filteredProjects = projects
    .filter((data) => data.developer === slug)
    .sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));

  return (
    <>
      <DeveloperInfo projects={filteredProjects} developerData={developerData} />
      <DeveloperProjectGridList projects={projects} developerData={developerData} />
    </>
  );
}
