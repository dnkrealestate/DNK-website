"use client";
import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import { MdLocationPin } from "react-icons/md";
import { IoSearch } from "react-icons/io5";
import DemoImage from "@/public/assets/icons/image_demo.webp";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import Link from "next/link";
import Image from "next/image";
import { WWURL } from "@/url/axios";

export default function OffPlanProjectGridList({ projects, partnerData }) {
  const [projectList, setProjectList] = useState([]);
  const [searchedList, setSearchedList] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const [selectedDeveloper, setSelectedDeveloper] = useState("");
  const [itemsPerPage] = useState(30);

  const statusValue = "off-plan";
  const generateSlug = (name) => name.replace(/\s+/g, "-").toLowerCase();

  useEffect(() => {
    if (!projectList || !Array.isArray(projectList)) return;

    const tempList = projectList
      .filter((data) => data.status === statusValue)
     .sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));
    setSearchedList(tempList);
  }, [projectList]);
  
  useEffect(() => {
    setCurrentPage(0);
  }, [searchTerm, selectedDeveloper]);

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    try {
      setProjectList(projects);
    } catch (err) {
      console.error("Failed to fatch project list", err);
    }
  };

  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
  };

  const offset = currentPage * itemsPerPage;
  const filteredItems = searchedList.filter((data) => {
    const matchesSearch = data.projectname
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesDeveloper = selectedDeveloper
      ? data.developer === selectedDeveloper
      : true;
    return matchesSearch && matchesDeveloper;
  });

const currentItems = filteredItems.slice(offset, offset + itemsPerPage);
const pageCount = Math.ceil(filteredItems.length / itemsPerPage);

  return (
    <div className="about-section w-full bg-[#040406] flex items-center justify-center">
      <div className="container max-w-[1240px] py-5  px-4  md:py-9  relative">
        {/* Search Input */}
        <div className="md:flex justify-start px-4 gap-2">
          <div className="w-full md:w-[30%] flex items-center border border-[#ffffff] p-[10px] rounded">
            <input
              type="text"
              placeholder="Search project name..."
              className="w-full bg-transparent  text-[#ffffff]"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)} // Updating the search term
            />
            <IoSearch className="text-[#fff] text-[1.2rem]" />
          </div>
          <select
            placeholder="Developer"
            onChange={(e) => setSelectedDeveloper(e.target.value)}
            name="developer"
            value={selectedDeveloper}
            type="text"
            className="w-full md:w-fit border border-[#ffffff] p-[10px] rounded bg-black md:mt-0 mt-2 text-[#ffffff]"
          >
            <option value={""}>Choose Developer</option>
            {partnerData.length > 0 ? (
              partnerData.map((data, i) => (
                <option key={i} value={data.partnername || ""}>
                  {data.partnername?.replace(/-/g, " ") || "No name available"}
                </option>
              ))
            ) : (
              <option value="">No developer list added</option>
            )}
          </select>
        </div>

        <div className="grid sm:grid-cols-2  md:grid-cols-3">
          {currentItems.length > 0
            ? currentItems.map((data, index) => {
                const slug = generateSlug(data.projectname);
                return (
                  <div className="p-4" key={data.projectname}>
                    <Link href={`/projects/${slug}`}>
                      <div className="max-w-full overflow-hidden  border border-[#ffff] rounded-[10px] shadow bg-[#040406] cursor-pointer">
                        <div>
                          <div className="relative w-full h-[266px]">
                            <Image
                              src={
                                data?.thumbnail
                                  ? WWURL + encodeURIComponent(data.thumbnail)
                                  : DemoImage
                              }
                              alt={`${
                                data.projectname || "off plan, project"
                              }, ${
                                data.altthumbnail || "Dubai Apartment, villa"
                              }`}
                              fill
                              priority={index < 30} 
                              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 33vw"
                              quality={75}
                              style={{
                                objectFit: "cover",
                                display: "block",
                              }}
                            />
                            {/* status tags and price */}
                            <div className="z-10">
                              {data.runingstatus === "newlaunch" && (
                                <div className="card-status-tag text-[0.8rem] bg-[#B30000] text-[#ffffff] rotate-[-40deg] w-fit px-9 absolute top-8 left-[-35px]">
                                  <h2 className="text-[0.8rem] font-normal m-0 px-1 py-1">
                                    New Launch
                                  </h2>
                                </div>
                              )}

                              <div className="bg-[#0000006b] backdrop-blur-sm border border-[#fff] rounded-full w-fit px-5 py-0 absolute top-2 right-2">
                                <h2 className="line-clamp-1 text-[#fff] text-[0.8rem] font-normal m-0 py-1">
                                  Under Construction
                                </h2>
                              </div>

                              {data.runingstatus === "soldout" && (
                                <div className="card-status-tag text-[0.8rem] bg-[#FF9900] text-[#000000] rotate-[-40deg] w-fit px-12 absolute top-8 left-[-35px]">
                                  <h2 className="text-[0.8rem] font-normal m-0 px-1 py-1">
                                    SOLD OUT
                                  </h2>
                                </div>
                              )}
                              {data.startingprice && (
                                <div className="bg-[#FFC700] border border-[#fff] rounded-l-full rounded-r-none w-fit px-5 py-0 absolute bottom-[-10px] right-0">
                                  <h2 className="line-clamp-1 text-[0.8rem] font-normal m-0 px-1 py-1 text-[#000]">
                                    Starting From: {data.startingprice}
                                  </h2>
                                </div>
                              )}
                            </div>
                          </div>

                          <div className="p-5">
                            <h2 className="mb-2 text-2xl font-bold tracking-tight text-white line-clamp-1">
                              {data.projectname}
                            </h2>
                            <p className="m-0 font-normal text-gray-400 line-clamp-1">
                              {data.developer.replace(/-/g, " ")}
                            </p>
                            {data?.locationname && (
                              <div className="flex items-center">
                                <MdLocationPin className="text-gray-400 text-[1rem]" />
                                <p className="m-0 font-normal text-gray-400 line-clamp-1">
                                  {data.locationname}
                                </p>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </Link>
                  </div>
                );
              })
            : [...Array(3)].map((_, index) => (
                <div className="p-4" key={index}>
                  <div className="relative border rounded-[10px] shadow bg-gray-800 animate-pulse">
                    <div className="h-[250px] bg-gray-600 rounded-t-lg"></div>
                    <div className="p-5">
                      <div className="h-6 bg-gray-500 rounded w-3/4 mb-2"></div>
                      <div className="h-4 bg-gray-500 rounded w-1/2"></div>
                    </div>
                  </div>
                </div>
              ))}
        </div>

        {/* Pagination */}
        <div className="flex justify-center mt-5 pagination-block">
          <ReactPaginate
            className="flex text-[#fff]"
            previousLabel={<IoIosArrowBack className="text-[1.5rem]" />}
            nextLabel={<IoIosArrowForward className="text-[1.5rem]" />}
            breakLabel={"..."}
            breakClassName={"break-me"}
            pageCount={pageCount}
            marginPagesDisplayed={2}
            pageRangeDisplayed={3}
            onPageChange={handlePageClick}
            containerClassName={"pagination"}
            activeClassName={"active"}
            previousClassName={"previous-button"}
            nextClassName={"next-button"}
            disabledClassName={"disabled"}
          />
        </div>
      </div>
    </div>
  );
}
