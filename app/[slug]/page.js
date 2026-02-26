import { getPartner } from "@/services/partnerServices";
import { getProjectList } from "@/services/projectServices";
import { WWURL } from "@/url/axios";
import Image from "next/image";
import Link from "next/link";


// Slug generator
function generateSlug(name) {
  return name
    ?.toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "");
}

export async function generateStaticParams() {
  const developers = await getPartner();

  return developers.map((dev) => ({
    slug: generateSlug(dev.partnername),
  }));
}

export async function generateMetadata({ params }) {
  const { slug } = await  params;

  const developers = await getPartner();

  const matchedDeveloper = developers.find(
    (dev) => generateSlug(dev.partnername) === slug
  );

  if (!matchedDeveloper) {
    return {
      title: "Developer Not Found | DNK Real Estate",
      description: "The requested developer could not be found.",
    };
  }

  const developerName = matchedDeveloper.partnername?.replace(/-/g, " ");

  const projectsData = await getProjectList();

  const developerProjects = projectsData.filter(
    (proj) =>
      proj.developer?.toLowerCase() ===
      developerName.toLowerCase()
  );

  const latestProjectWithImage = developerProjects.find(
    (proj) => proj.coverimage && proj.coverimage !== ""
  );

  const ogImage = latestProjectWithImage?.coverimage
    ? `${WWURL}${latestProjectWithImage.coverimage}`
    : "https://www.dnkre.com/logo.webp";

  const currentYear = new Date().getFullYear();

  return {
    metadataBase: new URL("https://www.dnkre.com"),

    title: `${developerName} Projects in Dubai | Prices & Payment Plans ${currentYear}`,
    description: `Explore ${developerName} projects in Dubai with updated prices, flexible payment plans, prime locations and high ROI opportunities. Book with DNK Real Estate today.`,
    keywords: `${developerName} Dubai, ${developerName} projects, ${developerName} off plan, buy property in Dubai, Dubai real estate developer`,

    alternates: {
      canonical: `${WWURL}${slug}`,
    },

    openGraph: {
      title: `${developerName} Projects in Dubai | ${currentYear}`,
      description: `Discover premium properties by ${developerName} in Dubai. View prices, payment plans and latest launches.`,
      url: `${WWURL}${slug}`,
      siteName: "DNK Real Estate",
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: `${developerName} Dubai Projects`,
        },
      ],
      type: "website",
    },

    twitter: {
      card: "summary_large_image",
      title: `${developerName} Projects in Dubai | ${currentYear}`,
      description: `Explore ${developerName} properties in Dubai with flexible payment plans.`,
      images: [ogImage],
    },

    robots: {
      index: true,
      follow: true,
    },
  };
}


export default async function Page({ params }) {
  // ✅ Await params (Next.js App Router dynamic API)
  const { slug } = params;

  let developerData = null;
  let projects = [];

  try {
    // 1️⃣ Get all developers
    const developers = await getPartner();

    // 2️⃣ Find developer from slug
    const matchedDeveloper = developers.find(
      (dev) => generateSlug(dev.partnername) === slug
    );

    if (!matchedDeveloper) {
      return <div className="text-center p-10">Developer Not Found</div>;
    }

    developerData = matchedDeveloper;

    // 3️⃣ Get all projects
    const projectsData = await getProjectList();

    // 4️⃣ Filter projects by developer name (case insensitive)
    projects = projectsData
      .filter(
        (proj) =>
          proj.developer?.toLowerCase() ===
          matchedDeveloper.partnername.toLowerCase()
      )
      .sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));

  } catch (error) {
    console.error("Error fetching developer or projects:", error);
  }

  // 5️⃣ Find latest project that has a coverImage
  const latestProjectWithImage = projects.find(
    (proj) => proj.coverimage && proj.coverimage !== ""
  );

  const backgroundImage = latestProjectWithImage
    ? `${WWURL}${latestProjectWithImage.coverimage}`
    : "/default-bg.jpg";

    const DeveloperLogo = latestProjectWithImage
    ? `${WWURL}${latestProjectWithImage.developerlogo}`
    : "/default-bg.jpg";

  return (
    <>
    <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            name: developerData?.partnername,
            url: `${WWURL}${slug}`,
            logo: DeveloperLogo,
            areaServed: {
              "@type": "City",
              name: "Dubai",
            },
          }),
        }}
      />

  <div className="w-full bg-[#040406] flex items-center justify-center py-4 md:py-10">
     <div className="absolute inset-0 z-0 ">
        <Image
          src={backgroundImage}
          alt={developerData?.partnername}
          fill
          priority
          className="object-cover opacity-15 z-0 blur-loop"
        />
        <div className="bg-[#000000cc] w-full h-full absolute left-0 top-0 z-0"></div>
      </div>

    {projects.length === 0 ? (
      <div className="relative h-[200px] md:h-[350px] w-full">
        <div className="absolute h-full w-full bg-gray-700 animate-pulse"></div>
      </div>
    ) : (
      <div className="grid md:grid-cols-2 w-full max-w-7xl">
        
   
        <div className="relative h-[250px] md:h-[400px] w-full">
          <Image
            src={`${WWURL}${projects[0]?.thumbnail}`}
            alt={projects[0]?.projectname || "Project Image"}
            fill
            priority
            sizes="(max-width: 768px) 100vw, 50vw"
             style={{
                objectFit: "cover",
                objectPosition: "top"
              }}
          />
        </div>

        <div className=" z-10 px-4 pt-4 md:pt-1">
         <h1 className="text-white text-xl md:text-2xl font-bold ">{developerData?.partnername?.replace(/-/g, " ")} presents elevated living through innovation and elegance</h1>
          <div className="pb-4">
            <h2 className="text-[0.9rem] md:text-[1.1rem] font-normal">◆ Starting from AED 800K</h2>
            <h2 className="text-[0.9rem] md:text-[1.1rem] font-normal">◆ Attractive & Flexible Payment Options</h2>
            <h2 className="text-[0.9rem] md:text-[1.1rem] font-normal">◆ Premium Selection of Residences</h2>
            <h2 className="text-[0.9rem] md:text-[1.1rem] font-normal">◆ Prime Locations Across Dubai</h2>
            <h2 className="text-[0.9rem] md:text-[1.1rem] font-normal">◆ Strong ROI & Excellent Capital Appreciation</h2>
            <h2 className="text-[0.9rem] md:text-[1.1rem] font-normal">◆ Complimentary Property Consultation</h2>
          </div>
          <Link href={`/${slug}/funnel`}>
              <button className=" site-btn1 bg-yellow-500 hover:bg-yellow-600 px-6 py-3 rounded-lg font-semibold transition duration-300">
                Explore Projects
              </button>
          </Link>
        </div>
      </div>
    )}
    <div className="absolute top-24  md:top-auto md:bottom-24 z-10 px-10">
       
        <Image
          src={DeveloperLogo}
          alt={developerData?.partnername}
          width={200}
          height={80}
          priority
          className="object-cover z-10 "
          style={{ height: "auto" }}
        />
        
  </div>
    <div className="bg-[#00000066] w-full h-full absolute left-0 top-0 z-0 sm:hidden rounded-md"></div>
  </div>
  </>
  
  );
}
