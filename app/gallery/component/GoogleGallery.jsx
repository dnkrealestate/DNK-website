"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";

const folderId = "1K06A7kVpfY2sJK1wkZ6uAWuZN3jXliLn";
const apiKey = "AIzaSyBYaSVRvTvLlwTBoxXL5Ubn3Zc2nulh32o";

// Timeout wrapper around fetch
const timeoutFetch = (url, options = {}, timeout = 10000) => {
  return Promise.race([
    fetch(url, options),
    new Promise((_, reject) =>
      setTimeout(() => reject(new Error("Request timed out")), timeout)
    ),
  ]);
};

const GoogleGallery = () => {
  const [images, setImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        setLoading(true);
        setError(null);

        const res = await timeoutFetch(
          `https://www.googleapis.com/drive/v3/files?q='${folderId}'+in+parents+and+mimeType+contains+'image/'&pageSize=20&key=${apiKey}`,
          {},
          10000 // 10 seconds timeout
        );

        if (!res.ok) throw new Error("Failed to fetch images");

        const data = await res.json();

        const imageLinks =
          data.files?.map((file) => ({
            id: file.id,
            name: file.name,
            url: `https://drive.google.com/uc?export=view&id=${file.id}`,
          })) || [];

        setImages(imageLinks);
      } catch (err) {
        console.error("Fetch error:", err);
        if (err.message.includes("timed out")) {
          setError("Request timed out. Please try again.");
        } else {
          setError("Something went wrong while fetching images.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchImages();
  }, []);

  return (
    <>
      {loading && (
        <div className="grid grid-cols-3 md:grid-cols-4 gap-2 md:gap-4 p-4">
          <div className="">
            <div className="relative w-full rounded-[10px] shadow bg-gray-800 animate-pulse">
              <div className="h-[130px] md:h-[200px] bg-gray-600 rounded"></div>
            </div>
          </div>
          <div className="">
            <div className="relative w-full rounded-[10px] shadow bg-gray-800 animate-pulse">
              <div className="h-[130px] md:h-[200px] bg-gray-600 rounded"></div>
            </div>
          </div>
          <div className="">
            <div className="relative w-full rounded-[10px] shadow bg-gray-800 animate-pulse">
              <div className="h-[130px] md:h-[200px] bg-gray-600 rounded"></div>
            </div>
          </div>
          <div className="md:block hidden">
            <div className="relative w-full rounded-[10px] shadow bg-gray-800 animate-pulse">
              <div className="h-[130px] md:h-[200px] bg-gray-600 rounded"></div>
            </div>
          </div>
        </div>
      )}
      {error && <p className="text-center text-red-500 mt-4">{error}</p>}

      <div className="grid grid-cols-3 md:grid-cols-4 gap-2 md:gap-4 p-4">
        {images.map((img) => (
          <div
            key={img.id}
            className="relative w-full h-[130px] md:h-[200px] cursor-pointer"
            onClick={() => setSelectedImage(img)}
          >
            <Image
              src={img.url}
              alt={img.name}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 33vw"
              style={{
                objectFit: "cover",
                borderRadius: "3px",
                boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
              }}
            />
          </div>
        ))}
      </div>

      {/* Modal for Fullscreen Image */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative w-full h-full max-w-5xl max-h-[90vh] p-4">
            <Image
              src={selectedImage.url}
              alt={selectedImage.name}
              fill
              style={{ objectFit: "contain" }}
            />
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 text-white text-2xl bg-black/60 px-3 py-1 rounded hover:bg-black/80"
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default GoogleGallery;
