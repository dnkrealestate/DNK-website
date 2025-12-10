"use client";

import React from "react";
import ProjectList from "@/app/components/projectList/ProjectList";
import TalkSection from "@/app/components/talkSection/TalkSection";
import { HeaderProject } from "@/app/components/header/HeaderProject";
import ProjectBanner from "./ProjectBanner";
import DetailProject from "./DetailProject";

export default function ProjectDetailClient({
  projectData,
  teamData,
  filteredProjects,
}) {
  return (
    <>
     
        <HeaderProject projectId={projectData} />
        <ProjectBanner projectId={projectData} />
        <DetailProject projectId={projectData} teamData={teamData} />
        <ProjectList projects={filteredProjects} />
        <TalkSection />
    </>
  );
}
