"use client";
import React, { useEffect, useState } from "react";
import TableDetail from "./TableDetail";
import GallaySection from "./GallaySection";
import VideoComponent from "./VideoComponent";
import FeaturesSection from "./FeaturesSection";
import LocationComponent from "./LocationComponent";
import NearBySection from "./NearBySection";
import SliderInfo from "./SliderInfo";
import MobileSliderInfo from "./MobileSliderInfo";


export default function DetailProject({ projectId, teamData }) {
  const [videoVisible, setVideoVisible] = useState(false);
  const [dataFetched, setDataFetched] = useState(false);

  // Simulate fetching data
  useEffect(() => {
    setTimeout(() => {
      setDataFetched(true);
    }, 800); // Assuming data is fetched after 1 second
  }, []);

  useEffect(() => {
    if (dataFetched) {
      const timer = setTimeout(() => {
        setVideoVisible(true);
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [dataFetched]);

  useEffect(() => {
    const handleScroll = () => {
      const stickyDiv = document.getElementById("stickyDiv");
      const content = document.getElementById("content1");

      if (content) {
        const contentHeight = content.offsetHeight;
        const scrollPosition = window.scrollY;

        if (scrollPosition > contentHeight / 1) {
          stickyDiv.classList.add("sticky-active");
        } else {
          stickyDiv.classList.remove("sticky-active");
        }
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const youtubeVideoId = projectId?.youtubeid ? `${projectId?.youtubeid}` : "";

  const thumbnailUrl = `https://img.youtube.com/vi/${youtubeVideoId}/maxresdefault.jpg`;
  const youtubeLink = `https://www.youtube.com/embed/${youtubeVideoId}?autoplay=1&controls=0&modestbranding=1&rel=0&showinfo=0&iv_load_policy=3&loop=1&playlist=${youtubeVideoId}`;

  return (
    <div className=" w-full bg-[#040406] flex items-center justify-center">
      <div className="container max-w-[1240px] relative">
        <div className=" py-5  px-4  md:py-9 relative">
          <div className="grid  lg:grid-cols-3">
            <div className="col-span-2">
              <TableDetail projectId={projectId} />
              <div className="hidden sm:block">
                <GallaySection projectId={projectId} />
                {videoVisible && (
                  <div className="mt-6">
                    <VideoComponent
                      youtubeLink={youtubeLink}
                      thumbnailUrl={thumbnailUrl}
                      projectData={projectId}
                    />
                  </div>
                )}
              </div>
              <FeaturesSection projectId={projectId} />
              <div className="block sm:hidden">
                <GallaySection projectId={projectId} />
                {videoVisible && (
                  <div className="mt-6 mb-2">
                    <VideoComponent
                      youtubeLink={youtubeLink}
                      thumbnailUrl={thumbnailUrl}
                      projectData={projectId}
                    />
                  </div>
                )}
              </div>
              {projectId?.location && (
                <LocationComponent
                  projectData={projectId}
                  aria-label="location"
                />
              )}
              {projectId?.nearby1 && <NearBySection projectData={projectId} />}
              <MobileSliderInfo projectId={projectId} teamData={teamData} />
            </div>
            {/* side section */}
            <SliderInfo projectId={projectId} teamData={teamData} />
          </div>
        </div>
      </div>
    </div>
  );
}
