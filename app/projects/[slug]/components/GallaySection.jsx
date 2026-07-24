"use client";
import { WWURL } from "@/url/axios";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { IoClose, IoChevronBack, IoChevronForward } from "react-icons/io5";

export default function GallaySection({ projectId }) {
  const [lightboxIndex, setLightboxIndex] = useState(null);

  const images = [
    projectId?.gallary1
      ? { src: WWURL + projectId.gallary1, alt: `${projectId.projectname}, ${projectId.altgallary1 || ""}` }
      : null,
    projectId?.gallary2
      ? { src: WWURL + projectId.gallary2, alt: `${projectId.projectname}, ${projectId.altgallary2 || ""}` }
      : null,
    projectId?.gallary3
      ? { src: WWURL + projectId.gallary3, alt: `${projectId.projectname}, ${projectId.altgallary3 || ""}` }
      : null,
    ...(Array.isArray(projectId?.gallery)
      ? projectId.gallery
          .filter(Boolean)
          .map((name) => ({ src: WWURL + name, alt: `${projectId.projectname} gallery image` }))
      : []),
  ].filter(Boolean);

  const extraCount = images.length - 3;

  const openLightbox = (index) => {
    if (images.length === 0) return;
    setLightboxIndex(index);
  };
  const closeLightbox = () => setLightboxIndex(null);
  const showPrev = () =>
    setLightboxIndex((i) => (i === null ? null : (i - 1 + images.length) % images.length));
  const showNext = () =>
    setLightboxIndex((i) => (i === null ? null : (i + 1) % images.length));

  useEffect(() => {
    if (lightboxIndex === null) return;
    const onKeyDown = (e) => {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowLeft") showPrev();
      if (e.key === "ArrowRight") showNext();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [lightboxIndex, images.length]);

  const placeholderImg = "/assets/icons/image_demo.webp";

  return (
    <>
      <h2>{projectId?.mainhead}</h2>
      {projectId.about && <p>Personally Visited & Approved</p>}

      <div className="grid grid-cols-3 mb-3">
        <div
          className="relative col-span-2 mr-1 h-[170px] w-full cursor-pointer md:h-[285px]"
          onClick={() => openLightbox(0)}
        >
          <Image
            className="object-cover object-center"
            src={images[0]?.src || placeholderImg}
            alt={images[0]?.alt || `${projectId.projectname} gallery`}
            quality={75}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 66vw, 66vw"
            fill
            loading="lazy"
          />
        </div>

        <div className="ml-1 flex h-[170px] flex-col md:h-[285px]">
          <div
            className="relative w-full cursor-pointer"
            style={{ height: "49.5%" }}
            onClick={() => openLightbox(1)}
          >
            <Image
              className="object-cover object-center"
              alt={images[1]?.alt || `${projectId.projectname} gallery`}
              src={images[1]?.src || placeholderImg}
              quality={75}
              sizes="33vw"
              fill
              loading="lazy"
            />
          </div>
          <div className="h-[1.5%] w-full"></div>
          <div
            className="relative w-full cursor-pointer"
            style={{ height: "49.5%" }}
            onClick={() => openLightbox(2)}
          >
            <Image
              className="object-cover object-center"
              src={images[2]?.src || placeholderImg}
              alt={images[2]?.alt || `${projectId.projectname} gallery`}
              quality={75}
              sizes="33vw"
              fill
              loading="lazy"
            />
            {extraCount > 0 && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/55 text-white text-sm md:text-base font-medium">
                +{extraCount} More
              </div>
            )}
          </div>
        </div>
      </div>

      {lightboxIndex !== null && images[lightboxIndex] && (
        <div className="fixed inset-0 z-[99999] flex items-center justify-center bg-black bg-opacity-80">
          <div className="relative flex h-full w-full items-center justify-center">
            <Image
              src={images[lightboxIndex].src}
              alt={images[lightboxIndex].alt}
              className="max-w-[90vw] max-h-[85vh] object-contain"
              loading="lazy"
              quality={80}
              width={1200}
              height={800}
              sizes="100vw"
              style={{
                objectFit: "contain",
                width: "auto",
                height: "auto",
                maxWidth: "90vw",
                maxHeight: "85vh",
              }}
            />

            <button
              onClick={closeLightbox}
              className="absolute top-3 right-3 bg-white text-black p-2 rounded-full shadow-lg"
              aria-label="Close"
            >
              <IoClose className="text-[1.2rem] text-[#000]" />
            </button>

            {images.length > 1 && (
              <>
                <button
                  onClick={showPrev}
                  className="absolute left-3 top-1/2 -translate-y-1/2 bg-white text-black p-2 rounded-full shadow-lg"
                  aria-label="Previous image"
                >
                  <IoChevronBack className="text-[1.2rem] text-[#000]" />
                </button>
                <button
                  onClick={showNext}
                  className="absolute right-3 top-1/2 -translate-y-1/2 bg-white text-black p-2 rounded-full shadow-lg"
                  aria-label="Next image"
                >
                  <IoChevronForward className="text-[1.2rem] text-[#000]" />
                </button>
                <div className="absolute bottom-3 left-1/2 -translate-x-1/2 rounded-full bg-black/60 px-3 py-1 text-sm text-white">
                  {lightboxIndex + 1} / {images.length}
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}
