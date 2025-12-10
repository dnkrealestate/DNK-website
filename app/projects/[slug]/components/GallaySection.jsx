"use client";
import { WWURL } from "@/url/axios";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { IoClose } from "react-icons/io5";

export default function GallaySection({ projectId }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  // Function to open modal with the selected image
  const handleImageClick = (imageUrl) => {
    setSelectedImage(imageUrl);
    setIsModalOpen(true);
  };

  // Function to close the modal
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedImage(null);
  };

  const Gallary1 = projectId?.gallary1 ? `${WWURL}${projectId?.gallary1}` : "loading...";
  const Gallary2 = projectId?.gallary2 ? `${WWURL}${projectId?.gallary2}` : "loading...";
  const Gallary3 = projectId?.gallary3 ? `${WWURL}${projectId?.gallary3}` : "loading...";
  return (
    <>
      <h2>{projectId?.mainhead}</h2>
      {projectId.about && <p>Personally Visited & Approved</p>}

      <div
        className="grid 
                    grid-cols-3 mb-3"
      >
        <Image
          className="col-span-2 mr-1 h-[170px] md:h-[285px] w-full"
          onClick={() =>
            handleImageClick(
              projectId?.gallary1
                ? WWURL + encodeURIComponent(projectId.gallary1)
                : null
            )
          }
          src={Gallary1}
          alt={`${projectId.projectname}, ${projectId.altgallary1}`}
          quality={75}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 33vw"
          width={150}
          height={80}
          loading="lazy"
          style={{
            objectFit: "cover",
            width: "100%",
            height: "100%",
          }}
        ></Image>

        <div className="ml-1">
          <Image
            onClick={() =>
              handleImageClick(
                projectId?.gallary2
                  ? WWURL + encodeURIComponent(projectId.gallary2)
                  : LoadImg
              )
            }
            alt={`${projectId.projectname}, ${projectId.altgallary2}`}
            src={Gallary2}
            quality={75}
            width={150}
            height={80}
            sizes="100vw"
            loading="lazy"
            style={{
              objectFit: "cover",
              width: "100%",
              height: "49.5%",
            }}
          ></Image>
          <div className="h-[1.5%] w-full"></div>
          <Image
            onClick={() =>
              handleImageClick(
                projectId?.gallary3
                  ? WWURL + encodeURIComponent(projectId.gallary3)
                  : LoadImg
              )
            }
            src={Gallary3}
            alt={`${projectId.projectname}, ${projectId.altgallary3}`}
            quality={75}
            sizes="100vw"
            loading="lazy"
            width={150}
            height={80}
            style={{
              objectFit: "cover",
              width: "100%",
              height: "49.5%",
            }}
          >
            {/* <div className="white-cover flex">
                  <p className="m-auto text-[#000000] ">View More</p>
                </div> */}
          </Image>
        </div>
      </div>
      {/* Modal for fullscreen image */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[99999] flex items-center justify-center bg-black bg-opacity-80">
          <div className="relative">
            <Image
              src={selectedImage}
              alt="Gallery"
              className="max-w-screen max-h-screen object-contain"
              loading="lazy"
              quality={100}
              width={800}
              height={600}
              sizes="100vw"
              style={{
                objectFit: "contain",
                width: "100%",
                height: "100%",
              }}
            />
            <button
              onClick={handleCloseModal}
              className="absolute top-3 right-3 bg-white text-black p-2 rounded-full shadow-lg"
            >
              <IoClose
                className="text-[1.2rem] text-[#000]"
                aria-label="close"
              />
            </button>
          </div>
        </div>
      )}
    </>
  );
}
