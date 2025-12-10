"use client";
import React, { useState, useEffect } from "react";

export default function VideoComponent ({ projectData, youtubeLink, thumbnailUrl }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [videoVisible, setVideoVisible] = useState(false);

  // Simulate fetching data (you can replace this with your real data fetching logic)
  useEffect(() => {
    if (projectData?.youtubeid) {
      const timer = setTimeout(() => {
        setVideoVisible(true);
      }, 1000);

      return () => clearTimeout(timer); // Cleanup timeout
    }
  }, [projectData]);

  const handlePlay = () => {
    setIsPlaying(true);
  };

  return (
    projectData?.youtubeid && (
      <div className="video-container">
        {videoVisible && (
          <div>
            {isPlaying ? (
              <iframe
                width="100%"
                height="315"
                src={youtubeLink}
                data-src={youtubeLink}
                style={{ border: "none" }}
                allow="autoplay; encrypted-media; accelerometer; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            ) : (
              <div
                style={{ cursor: "pointer", position: "relative" }}
                onClick={handlePlay}
              >
                <img
                  src={thumbnailUrl}
                  alt="YouTube Video Thumbnail"
                  style={{ width: "100%" }}
                  loading="lazy"
                />
                <div
                  style={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    backgroundColor: "rgba(0, 0, 0, 0.6)",
                    borderRadius: "50%",
                    padding: "20px",
                  }}
                >
                  <svg width="60" height="60" viewBox="0 0 24 24" fill="white">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    )
  );
};
