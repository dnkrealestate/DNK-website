"use client";
import Image from "next/image";
import React, { useState } from "react";

const GoogleGallery = ({ initialImages }) => {
  // Fetched server-side in page.js (keeps the Google API key out of the
  // client bundle entirely) and already present on first paint.
  const images = initialImages || [];
  const [selectedImage, setSelectedImage] = useState(null);

  return (
    <>
      {images.length === 0 && (
        <p className="text-center text-red-500 mt-4">
          Unable to load gallery images. Please try again later.
        </p>
      )}

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
