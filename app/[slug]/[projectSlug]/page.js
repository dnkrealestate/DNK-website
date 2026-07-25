import { getProjectListSummary } from "@/services/projectServices";
import { WWURL } from "@/url/axios";
import Image from "next/image";
import Link from "next/link";
import { getCreatedTime } from "@/utils/projectSort";

// ✅ Slug generator
function generateSlug(name) {
  return name
    ?.toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "");
}

// ✅ Capitalize helper
const capitalize = (str) =>
  str
    ?.toLowerCase()
    .split(" ")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");

// ✅ Static Params
export async function generateStaticParams() {
  const projects = await getProjectListSummary();

  // Only prebuild the most recent 30 (same fix as projects/[slug]/page.js
  // and [slug]/page.js) — this route has ~325+ projects, and prebuilding
  // all of them at once is what blows the 60s-per-page Vercel build
  // timeout even on the fast summary endpoint. The rest still render fine
  // on first visit since `dynamicParams` isn't disabled here.
  const recentProjects = projects
    .slice()
    .sort((a, b) => getCreatedTime(b) - getCreatedTime(a))
    .slice(0, 30);

  return recentProjects.map((project) => ({
    projectSlug: generateSlug(project.projectname),
  }));
}

// ✅ Metadata
export async function generateMetadata({ params }) {
  const awaitedParams = await params;
  const { slug, projectSlug } = awaitedParams;

  const projects = await getProjectListSummary();

  const matchedProject = projects.find(
    (proj) => generateSlug(proj.projectname) === projectSlug
  );

  if (!matchedProject) {
    return {
      title: "Project Not Found | DNK Real Estate",
      description: "The requested project could not be found.",
      robots: { index: false, follow: false },
    };
  }

  const projectName = matchedProject.projectname;
  const developerName = matchedProject.developer;
  const locationName = matchedProject.locationname;
  const projectKeyword = matchedProject.projectkeyword;
  const currentYear = new Date().getFullYear();

  const ogImage = matchedProject.coverimage
    ? `${WWURL}${matchedProject.coverimage}`
    : "https://www.dnkre.com/logo.webp";

  return {
    metadataBase: new URL("https://www.dnkre.com"),
    title: `${projectName} by ${developerName} | ${currentYear}`,
    description: `Explore ${projectName} by ${developerName} in ${capitalize(
      locationName
    )} with updated prices, payment plans, and premium amenities.`,
    keywords: `${projectName}, ${developerName}, ${projectKeyword}`,
    alternates: { canonical: `https://www.dnkre.com/${projectSlug}` },
    openGraph: {
      title: `${projectName} | ${developerName}`,
      description: `Discover ${projectName} by ${developerName} in ${capitalize(
        locationName
      )}. Updated prices, payment plans, and premium amenities.`,
      url: `https://www.dnkre.com/${projectSlug}`,
      siteName: "DNK Real Estate",
      images: [{ url: ogImage, width: 1200, height: 630, alt: projectName }],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `${projectName} | ${developerName}`,
      description: `Explore ${projectName} by ${developerName} in ${capitalize(
        locationName
      )}.`,
      images: [ogImage],
    },
    robots: { index: true, follow: true },
  };
}

// ✅ PAGE
export default async function Page({ params }) {
  const awaitedParams = await params;
  const { slug, projectSlug } = awaitedParams;

  let project = null;

  try {
    const projects = await getProjectListSummary();
    project = projects.find(
      (proj) => generateSlug(proj.projectname) === projectSlug
    );
    if (!project) {
      return (
        <div className="text-center p-20 text-xl font-semibold">
          Project Not Found
        </div>
      );
    }
  } catch (error) {
    console.error("Error fetching project:", error);
  }

  const backgroundImage = project?.coverimage
    ? `${WWURL}${project.coverimage}`
    : "/default-bg.jpg";
  const thumbnailImage = project?.thumbnail
    ? `${WWURL}${project.thumbnail}`
    : "/default-bg.jpg";
  const developerLogo = project?.developerlogo
    ? `${WWURL}${project.developerlogo}`
    : "/default-bg.jpg";

  return (
    <>
      {/* Schema for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Residence",
            name: project?.projectname,
            url: `https://www.dnkre.com/${projectSlug}`,
            image: backgroundImage,
            address: {
              "@type": "PostalAddress",
              addressLocality: "Dubai",
              addressCountry: "AE",
            },
            brand: {
              "@type": "Organization",
              name: capitalize(project?.developer),
            },
            description: `Explore ${project?.projectname} by ${capitalize(
              project?.developer
            )} in ${capitalize(project?.locationname)} with updated prices, payment plans, and premium amenities.`,
          }),
        }}
      />

      <div className="w-full bg-[#040406] flex items-center justify-center py-4 md:py-10">
        {/* Background */}
        <div className="absolute inset-0 z-0">
          <Image
            src={backgroundImage}
            alt={project?.projectname}
            fill
            priority
            className="object-cover opacity-15 blur-loop"
          />
          <div className="bg-[#000000cc] w-full h-full absolute left-0 top-0 z-1"></div>
        </div>

        <div className="grid md:grid-cols-2 w-full max-w-7xl z-[7]">
          {/* Thumbnail */}
          <div className="relative h-[250px] md:h-[400px] w-full z-[6]">
            <Image
              src={thumbnailImage}
              alt={project?.projectname}
              fill
              priority
              sizes="(max-width: 768px) 100vw, 50vw"
              style={{ objectFit: "cover", objectPosition: "top" }}
            />
            <div className="bg-[#000000b1] w-full h-full absolute left-0 top-0 z-[9] sm:hidden rounded-md"></div>
          </div>

          {/* Content */}
          <div className="px-4 pt-4 md:pt-1 text-white">
            <h1 className="text-2xl md:text-3xl font-bold mb-1 md:mb-2 z-20">
              {project?.projectname}
            </h1>
            <h2 className="text-lg mb-3">
              Developed by {capitalize(project?.developer)}
            </h2>

            <div className="space-y-1 md:space-y-0">
              <h3 className="text-[0.8rem] md:text-[1.1rem] font-normal mb-0">
                ◆ Starting from {project?.startingprice}
              </h3>
              <h3 className="text-[0.8rem] md:text-[1.1rem] font-normal">
                ◆ Flexible Payment Plan {project?.paymentplan}
              </h3>
              <h3 className="text-[0.8rem] md:text-[1.1rem] font-normal">
                ◆ Premium Residences in {capitalize(project?.locationname)}
              </h3>
              <h3 className="text-[0.8rem] md:text-[1.1rem] font-normal">
                ◆ Easy & Attractive Down Payment Options – {project?.downpayment}
              </h3>
              <h3 className="text-[0.8rem] md:text-[1.1rem] font-normal">
                ◆ Strong ROI & High Capital Appreciation Potential
              </h3>
              <h3 className="text-[0.8rem] md:text-[1.1rem] font-normal">
                ◆ Available Units:{" "}
                {Object.keys(project)
                  .filter((key) => key.startsWith("type") && project[key])
                  .map((key) =>
                    project[key]
                      .split(" ")
                      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
                      .join(" ")
                  )
                  .join(", ")
                  .replace(/,([^,]*)$/, " & $1")}
              </h3>
              <h3 className="text-[0.8rem] md:text-[1.1rem] font-normal">
                ◆ Available Bedrooms: {project?.bedroom}
              </h3>
              <h3 className="text-[0.8rem] md:text-[1.1rem] font-normal">
                ◆ Free Property Consultation
              </h3>
            </div>

            <Link href={`/${project?.developer?.toLowerCase().replace(/\s+/g, "-")}/${projectSlug}/active`}>
              <button className="bg-yellow-600 hover:bg-yellow-500 px-6 py-3 rounded-md font-semibold transition duration-300 w-full md:w-fit mt-6">
                Explore Project
              </button>
            </Link>
          </div>
        </div>

        {/* Developer Logo */}
        <div className="absolute top-24 md:top-auto md:bottom-24 z-[40] px-10">
          <Image
            src={developerLogo}
            alt={capitalize(project?.developer)}
            width={180}
            height={80}
            priority
            className="object-cover z-20"
            style={{ height: "auto" }}
          />
        </div>

        
      </div>
    </>
  );
}