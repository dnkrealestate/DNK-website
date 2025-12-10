"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import bannerImgPlaceholder from "@/public/assets/icons/adposter.webp";
import Link from "next/link";

const folderId = "1K06A7kVpfY2sJK1wkZ6uAWuZN3jXliLn";
const apiKey = "AIzaSyBYaSVRvTvLlwTBoxXL5Ubn3Zc2nulh32o";

const timeoutFetch = (url, options = {}, timeout = 10000) => {
  return Promise.race([
    fetch(url, options),
    new Promise((_, reject) =>
      setTimeout(() => reject(new Error("Request timed out")), timeout)
    ),
  ]);
};

const GalleryComponent = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        setLoading(true);
        setError(null);

        const res = await timeoutFetch(
          `https://www.googleapis.com/drive/v3/files?q='${folderId}'+in+parents+and+mimeType+contains+'image/'&fields=files(id,name)&key=${apiKey}`
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
    <div className="w-full bg-[#040406] flex items-center justify-center py-2 md:py-10">
      
        {loading ? (
          <div className="relative h-[200px] md:h-[350px] w-full">
            <div className="absolute h-full w-full bg-gray-600 animate-pulse"></div>
          </div>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : (
            <>
              <div className="grid md:grid-cols-2  w-full">
            {/* Left big image */}
            <div className="relative h-[100px] md:h-[350px] w-full">
              <Image
                src={images[0]?.url || bannerImgPlaceholder}
                alt={images[0]?.name || "Gallery Banner"}
                quality={90}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
                style={{
                  objectFit: "cover",
                }}
              />
            </div>

            {/* Right 2x2 grid */}
            <div className="grid grid-cols-2 grid-rows-2 h-[200px] md:h-[350px]">
              {[1, 2, 3, 4].map((index) => (
                <div key={index} className="relative w-full h-full">
                  <Image
                    src={images[index]?.url || bannerImgPlaceholder}
                    alt={images[index]?.name || `Gallery Small ${index}`}
                    quality={90}
                    fill
                    sizes="(max-width: 768px) 50vw, 25vw"
                    priority
                    style={{
                      objectFit: "cover",
                    }}
                  />
                  {/* "More" Button on the 4th image */}
                  {index === 4 && (
                    <Link
                      href="/gallery"
                      className="absolute bottom-2 right-2 bg-black/70 text-white px-4 md:px-5 py-2 md:py-3 rounded text-sm group-hover:bg-[#CE8745] transition"
                    >
                      + More
                    </Link>
                  )}
                </div>
              ))}
                </div>
                </div>
          </>
        )}
      </div>
  );
};

export default GalleryComponent;
