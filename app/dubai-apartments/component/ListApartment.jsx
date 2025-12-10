"use client"; // required if used inside `app/` folder in Next.js 13+

import React, { useEffect, useState } from "react";
import {
  MdOutlineKeyboardDoubleArrowRight,
  MdLocationPin,
} from "react-icons/md";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

import { URL } from "@/url/axios";
import DemoImage from "@/public/assets/icons/image_demo.webp";
import useSliderLazyLoad from "@/app/hooks/useSliderLazyLoad";
import { useProjectServices } from "@/services/projectServices";
import PopupClick from "./PopupClick";

const ListApartment = ({ params }) => {
  const [searchedList, setSearchedList] = useState([]);
  const [projectList, setProjectList] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const { getProjectPublicList } = useProjectServices();
  const router = useRouter();

  useEffect(() => {
    const tempList = projectList
      .filter((data) =>
        ["type", "type2", "type3", "type4", "type5", "type6"].some(
          (typeKey) => data[typeKey] === "apartment"
        )
      )
      .sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));
    setSearchedList(tempList);
  }, [params, projectList]);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const response = await getProjectPublicList();
      if (response.success) {
        const sortedProjects = response.data
          .filter((data) =>
            ["type", "type2", "type3", "type4", "type5", "type6"].some(
              (typeKey) => data[typeKey] === "apartment"
            )
          )
          .sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));
        setProjectList(sortedProjects);
        setSearchedList(sortedProjects);
      }
    } catch (err) {
      console.error("Failed to fetch project list", err);
    }
  };

  const handleCardClick = (data) => {
    if (!isFormSubmitted) {
      const thumbnailUrl = data?.thumbnail
        ? URL + encodeURIComponent(data.thumbnail)
        : DemoImage;
      setSelectedProject({ ...data, imageUrl: thumbnailUrl });
      setIsPopupVisible(true);
    }
  };

  const handlePopupSubmit = () => {
    if (selectedProject) {
      const slug = selectedProject.projectname
        .replace(/\s+/g, "-")
        .toLowerCase();
      setIsPopupVisible(false);
      setIsFormSubmitted(true);
      router.push(`/projects/${slug}`);
    }
  };

  const thumbnailUrls = searchedList.map((data) =>
    data?.thumbnail ? URL + encodeURIComponent(data.thumbnail) : DemoImage
  );

  const [imageUrls, loadImages] = useSliderLazyLoad(thumbnailUrls, 3);

  useEffect(() => {
    loadImages(0);
  }, [searchedList]);

  return (
    <div className="w-full bg-[#040406] flex items-center justify-center px-4 xl:px-0">
      <div className="featureProject container max-w-[1240px] py-5 px-4 md:py-9">
        <div className="flex flex-col md:flex-row justify-between">
          <div>
            <h2 className="m-0">Premium Dubai Apartments</h2>
            <h3 className="m-0 text-[#A4815C]">
              Dubai's Best Properties for Sale
            </h3>
          </div>
          <div className="mt-4 md:mt-0">
            <Link
              href="/off-plan-project"
              className="flex items-center gap-4 text-white font-normal text-[0.9rem] md:text-[1rem]"
            >
              View More
              <MdOutlineKeyboardDoubleArrowRight className="arrow-r-bounce text-[1.3rem]" />
            </Link>
          </div>
        </div>

        <Swiper
          modules={[Autoplay, Pagination]}
          spaceBetween={20}
          slidesPerView={3}
          pagination={{ clickable: false }}
          autoplay={{ delay: 7000, disableOnInteraction: false }}
          breakpoints={{
            0: { slidesPerView: 1 },
            640: { slidesPerView: 1 },
            992: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          onSlideChange={({ activeIndex }) => loadImages(activeIndex)}
          onSwiper={() => loadImages(0)}
        >
          {searchedList.length > 0 ? (
            searchedList.slice(0, 10).map((data, index) => {
              const thumbnailUrl = imageUrls[index] || DemoImage;

              return (
                <SwiperSlide key={data.projectname}>
                  <div
                    onClick={() => handleCardClick(data)}
                    className="p-2 cursor-pointer"
                  >
                    <div className="border border-white rounded-[10px] bg-[#040406] overflow-hidden">
                      <div
                        style={{
                          backgroundImage: `url(${thumbnailUrl})`,
                          backgroundPosition: "center",
                          backgroundSize: "cover",
                          height: "266px",
                          position: "relative",
                        }}
                        aria-label={data.projectname}
                      >
                        {data.runingstatus === "newlaunch" && (
                          <div className="card-status-tag text-xs bg-red-600 text-white rotate-[-40deg] w-fit px-9 absolute top-8 left-[-35px]">
                            <h6>New Launch</h6>
                          </div>
                        )}
                        {data.runingstatus === "soldout" && (
                          <div className="card-status-tag text-xs bg-orange-500 text-black rotate-[-40deg] w-fit px-12 absolute top-8 left-[-35px]">
                            <h6>SOLD OUT</h6>
                          </div>
                        )}
                        <div className="bg-[#0000006b] backdrop-blur-sm border border-white rounded-full w-fit px-5 py-0 absolute top-2 right-2">
                          <h6 className="text-white text-xs">
                            Under Construction
                          </h6>
                        </div>
                        {data.startingprice && (
                          <div className="bg-[#FFC700] border border-white rounded-l-full rounded-r-none w-fit px-5 py-0 absolute bottom-[-10px] right-0">
                            <h6>Starting From: {data.startingprice}</h6>
                          </div>
                        )}
                      </div>
                      <div className="p-5">
                        <h5 className="text-2xl font-bold text-white line-clamp-1">
                          {data.projectname}
                        </h5>
                        <p className="text-gray-400 line-clamp-1">
                          {data.developer?.replace(/-/g, " ")}
                        </p>
                        {data?.locationname && (
                          <div className="flex items-center">
                            <MdLocationPin className="text-gray-400 text-base" />
                            <p className="text-gray-400 line-clamp-1 m-0">
                              {data.locationname}
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              );
            })
          ) : (
            <div className="text-white text-center">
              <p className="loader !w-[24px] !h-[24px] mx-auto"></p>
            </div>
          )}
        </Swiper>
      </div>

      {isPopupVisible && (
        <PopupClick
          data={selectedProject}
          onClose={() => setIsPopupVisible(false)}
          onFormSubmit={handlePopupSubmit}
          imageUrl={selectedProject?.imageUrl}
        />
      )}
    </div>
  );
};

export default ListApartment;
