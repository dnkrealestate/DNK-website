"use client";
import React, { useEffect, useRef, useState } from "react";

export default function LocationComponent({ projectData }) {
  const iframeRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true); // The iframe is visible, so set the state to true
        }
      },
      { threshold: 0.1 } // Trigger when 10% of the iframe is visible
    );

    if (iframeRef.current) {
      observer.observe(iframeRef.current);
    }

    return () => {
      if (iframeRef.current) {
        observer.unobserve(iframeRef.current);
      }
    };
  }, []);

  return (
    <>
      {projectData?.location && (
        <div ref={iframeRef}>
          {isVisible ? (
            <>
              <iframe
                className="map mb-3 mt-2"
                src={projectData?.location}
                title="Project Location"
              ></iframe>
            </>
          ) : (
            <div
              className="map-placeholder"
              style={{ width: "100%", height: "400px" }}
            >
              <div className="bg-[#040406] text-center flex my-5">
                <p>{projectData.projectname} Location</p>
                <p className="loader !w-[24px] !h-[24px]"></p>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
}
