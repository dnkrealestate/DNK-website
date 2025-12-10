"use client";
import React from "react";
import ProjectConnect from "./ProjectConnect";
import StickyConnect from "./StickyConnect";

export default function SliderInfo({ projectId, teamData }) {
  return (
    <div className="pl-4 hidden lg:block">
      <ProjectConnect projectId={projectId} teamData={teamData} />
      {projectId.about && (
        <div id="content1">
          <div id="stickyDiv" className="sticky mt-4">
            <StickyConnect projectId={projectId} teamData={teamData} />
          </div>
        </div>
      )}
    </div>
  );
}
