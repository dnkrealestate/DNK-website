"use client";
import React, { useState } from "react";

export default function VideoComponent ({ projectData, youtubeLink, thumbnailUrl }) {
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlay = () => {
    setIsPlaying(true);
  };

  // 16:9 aspect-ratio box reserves the video's space up front, so it doesn't
  // shift the rest of the page down once it renders/loads.
  return (
    projectData?.youtubeid && (
      <div className="video-container" style={{ position: "relative", width: "100%", aspectRatio: "16 / 9" }}>
        {isPlaying ? (
          <iframe
            width="100%"
            height="100%"
            src={youtubeLink}
            data-src={youtubeLink}
            style={{ border: "none", position: "absolute", inset: 0 }}
            allow="autoplay; encrypted-media; accelerometer; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        ) : (
          <div
            style={{ cursor: "pointer", position: "absolute", inset: 0 }}
            onClick={handlePlay}
          >
            <img
              src={thumbnailUrl}
              alt="YouTube Video Thumbnail"
              width={1280}
              height={720}
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
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
    )
  );
};
