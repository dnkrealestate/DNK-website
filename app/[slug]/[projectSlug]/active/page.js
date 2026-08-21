import ProjectFunnel from "./components/ProjectFunnel";
import { getProjectList } from "@/services/projectServices";


export const metadata = {
  title: "Property Inquiry | DNK Real Estate",
  robots: {
    index: false,
    follow: false,
  },
};

export default async function Page({ params }) {
  const { projectSlug } = await params;

  // Fetched here (server-side) so the funnel's developer logo/title are
  // already in the HTML on first paint instead of a blank div while a
  // client-side fetch resolves the matching project.
  let initialProjectData = null;
  try {
    const projects = await getProjectList();
    initialProjectData =
      (projects || []).find(
        (p) =>
          p.projectname &&
          p.projectname.toLowerCase().replace(/\s+/g, "-") === projectSlug
      ) || null;
  } catch (error) {
    console.error("Error fetching project for funnel:", error);
  }

  return <ProjectFunnel initialProjectData={initialProjectData} />;
}