import { getProjectById } from '@/services/projectServices';
import React from 'react';
import { getTeamList } from '@/services/teamServices';
import { URL, WWURL } from '@/url/axios';
import ProjectDetailClient from './components/ProjectDetailClient';

// Utility function to generate slug
function generateSlug(name) {
  return name.replace(/\s+/g, '-').toLowerCase();
}

async function fetchProjects() {
  const res = await fetch(`${URL}task/get-task-public`, {
    next: { revalidate: 60 },
  });
  const data = await res.json();
  return data.success ? data.data : [];
}

// Static Paths
export async function generateStaticParams() {
  const projects = await fetchProjects();
  if (!projects) return [];

  return projects.map((project) => ({
    slug: generateSlug(project?.projectname),
  }));
  
}

// Metadata
export async function generateMetadata({ params }) {
  const { slug } = await params;

  const projects = await fetchProjects();
  const matchedProject = projects.find(
    (p) => generateSlug(p.projectname) === slug
  );

  if (!matchedProject) {
    return { title: 'Project Not Found' };
  }

  const project = await getProjectById({ projectname: matchedProject.projectname });

  if (!project || !project.data) {
    return { title: 'Project Not Found' };
  }

  const {
    projectname,
    locationname,
    developer,
    projectdescription,
    about,
    projectkeyword,
    coverimage,
    developerlogo,
    thumbnail,
    gallary1,
    startingprice,
  } = project.data;

  const currentYear = new Date().getFullYear();

  const title = `${projectname} at ${locationname} - ${developer.replace(/-/g, ' ')}`;
  const description = `${projectdescription}${about}`;
  const keywords = [
    projectname,
    projectkeyword,
    developer.replace(/-/g, ' '),
    `${projectname} by ${developer.replace(/-/g, ' ')}`,
    `${projectname} at ${locationname}`,
    `${locationname} properties`,
    `Best property ${currentYear}`,
    `Luxury properties in Dubai`,
    `Dubai off-plan properties`,
    `Cheap property for sale in Dubai`,
    `Dubai property market ${currentYear}`,
    `${currentYear} Dubai real estate`,
    `${developer.replace(/-/g, ' ')} Best Project?`,
  ];

  const canonicalUrl = `https://www.dnkre.com/projects/${slug}`;
  const coverImageUrl = coverimage ? `${WWURL}${coverimage}` : null;
  const developerLogoUrl = developerlogo
    ? `${WWURL}${encodeURIComponent(developerlogo)}`
    : 'https://www.dnkre.com/favicon.ico';
  const thumbnailUrl = thumbnail ? `${WWURL}${gallary1}` : null;

  return {
    title,
    description,
    keywords: keywords.join(', '),
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      siteName: 'DNK Real Estate',
      type: 'website',
      images: [
        {
          url: thumbnailUrl,
          width: 1200,
          height: 630,
          alt: title,
          type: 'image/webp',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [thumbnailUrl],
    },
    alternates: {
      canonical: canonicalUrl,
    },
    link: [
      { rel: 'canonical', href: canonicalUrl },
      { rel: 'preload', as: 'image', href: coverImageUrl, type: 'image/webp', fetchpriority: 'high' },
      { rel: 'preload', as: 'image', href: developerLogoUrl, type: 'image/webp', fetchpriority: 'high' },
      { rel: 'shortcut icon', href: 'https://www.dnkre.com/favicon.ico' },
    ],
    icons: {
      icon: [
        { url: "/favicon.ico", sizes: "any" },
        { url: "/favicon-96x96.png", sizes: "96x96" },
        { url: "/favicon.svg", type: "image/svg+xml" }
      ],
      apple: "/apple-touch-icon.png",
    },
    meta: {
      author: 'DNK Real Estate',
      robots: 'index, follow',
    },
    metadataBase: "https://www.dnkre.com",
    jsonLd: [
      {
        "@context": "http://schema.org",
        "@type": "Organization",
        name: "DNK Real Estate",
        logo: "https://www.dnkre.com/favicon.ico",
        url: "https://dnkre.com",
        sameAs: [
          "https://www.instagram.com/dnk_re/",
          "https://www.facebook.com/dnkrealestate1/",
          "https://www.linkedin.com/company/dnkrealestate/",
          "https://www.youtube.com/channel/UCKH7d3Sx2dkfb4pEXXaMpFA",
        ],
        telephone: "+971555769195",
        email: "info@dnkre.com",
        address: "Suite No: 603, Sama Building, Al Barsha 1 - Al Barsha, Dubai, United Arab Emirates",
      },
      {
        "@context": "http://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            item: {
              "@id": "https://dnkre.com",
              name: "Home",
            },
          },
          {
            "@type": "ListItem",
            position: 2,
            item: {
              "@type": "Place",
              name: locationname,
              "@id": canonicalUrl,
            },
          },
          {
            "@type": "ListItem",
            position: 3,
            item: {
              "@type": "Brand",
              name: developer.replace(/-/g, " "),
              "@id": canonicalUrl,
            },
          },
          {
            "@type": "ListItem",
            position: 4,
            item: {
              "@type": "House",
              name: projectname,
              "@id": canonicalUrl,
            },
          },
        ],
        numberOfItems: 4,
      },
      {
        "@context": "http://schema.org",
        "@type": "ItemPage",
        mainEntity: {
          "@type": "WebPage",
          name: title,
          description: about,
          keywords: keywords.join(', '),
          url: canonicalUrl,
          image: thumbnailUrl,
          offers: [
            {
              "@type": "Offer",
              name: title,
              price: startingprice,
              priceCurrency: "AED",
              itemOffered: {
                "@type": "House",
                name: title,
                logo: thumbnailUrl,
                url: canonicalUrl,
                image: thumbnailUrl,
              },
              offeredBy: {
                "@type": "Organization",
                name: "DNK Real Estate",
                address: "Suite No: 603, Sama Building, Al Barsha 1 - Al Barsha, Dubai, United Arab Emirates",
                telephone: "+971555769195",
                email: "info@dnkre.com",
                image: thumbnailUrl,
                sponsor: {
                  "@type": "Organization",
                  url: canonicalUrl,
                  name: developer.replace(/-/g, " "),
                },
              },
            },
          ],
        },
      },
    ],
  };
}

// Component
export default async function ProjectDetail({ params }) {
  const { slug } = await params;

  let projectData = null;
  let teamData = null;
  let projects = [];

  try {
    const projectsData = await fetchProjects();
    const matched = projectsData.find(
      (proj) => generateSlug(proj.projectname) === slug
    );

    if (!matched) {
      return <div>Error: Project not found</div>;
    }

    const [project, team] = await Promise.all([
      getProjectById({ projectname: matched.projectname }),
      getTeamList(),
    ]);

    projectData = project.data;
    projects = projectsData;

    if (team && Array.isArray(team)) {
      const salesTeam = team
        .filter((member) => member.department === "Sales")
        .sort((a, b) => a.sortKey - b.sortKey);

      const shuffledTeam = salesTeam.sort(() => Math.random() - 0.5).slice(0, 1);
      teamData = shuffledTeam;
    }
  } catch (error) {
    console.error("Error fetching data:", error);
  }

  const filteredProjects = projects
    .filter((data) => data.status === "off-plan")
    .sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt))
    .slice(0, 6);

  if (!projectData) {
    return <div>Error: Project not found</div>;
  }

  return (
    <ProjectDetailClient
      projectData={projectData}
      teamData={teamData}
      filteredProjects={filteredProjects}
    />
  );
}
