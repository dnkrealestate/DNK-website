"use client";
import React, { useEffect, useState } from "react";
import Newsimgic from "@/public/assets/icons/image_demo.webp";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import ReactPaginate from "react-paginate";
import { useRouter } from "next/navigation";
import { userNewsServices } from "@/services/newsServices";
import Link from "next/link";
import { WWURL } from "@/url/axios";
import Image from "next/image";

export default function NewsAll({ newsData }) {
  const [newsList, setNewsList] = useState([]);
  const [searchedList, setSearchedList] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage] = useState(30);
  const [filterType, setFilterType] = useState("All");
  const { getNewsApi } = userNewsServices();

  
  const generateSlug = (name) => name.replace(/\s+/g, "-").toLowerCase();

  useEffect(() => {
    const filteredList =
      filterType === "All"
        ? newsList
        : newsList.filter((item) => item.type === filterType);
    const sortedList = filteredList.sort(
      (a, b) => new Date(b.updatedAt) - new Date(a.updatedAt)
    );
    setSearchedList(sortedList);
  }, [newsList, filterType]);

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    try {
      const response = newsData;
      setNewsList(response);
      setSearchedList(response);
    } catch (err) {
      console.error("Failed to fatch news list", err);
    }
  };

  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
  };

  const handleFilterClick = (type) => {
    setFilterType(type);
    setCurrentPage(0);
  };

  const offset = currentPage * itemsPerPage;
  const currentItems = searchedList
    .filter(
      (data) => data.newsurl.toLowerCase().includes(searchTerm.toLowerCase()) // Filtering based on search term
    )
    .slice(offset, offset + itemsPerPage);
  const pageCount = Math.ceil(searchedList.length / itemsPerPage);

  return (
    <>
      <div className="mb-4 w-full bg-[#040406] flex items-center justify-center">
        <div className="container max-w-[1240px] relative">
          <div className=" hidden NewsFilterButton md:flex items-center gap-3 justify-start mt-4">
            {["All", "Market Insights", "General", "News", "Off-Plan"].map(
              (type) => (
                <button
                  key={type}
                  onClick={() => handleFilterClick(type)}
                  className={`${
                    filterType === type ? "active" : ""
                  } site-sub-btn1 text-left bg-[#1C1D22] w-full !border-[#1C1D22]`}
                >
                  {type}
                </button>
              )
            )}
          </div>
          <div className="md:hidden p-2">
            <select
              className="bg-[#1C1D22] w-full !border-[#1C1D22] text-white px-4 py-2 rounded-sm"
              value={filterType}
              onChange={(e) => handleFilterClick(e.target.value)}
            >
              <option value="All">All</option>
              <option value="Market Insights">Market Insights</option>
              <option value="General">General</option>
              <option value="News">News</option>
              <option value="Off-Plan">Off-Plan</option>
            </select>
          </div>

          <div>
            <div className="grid sm:grid-cols-2  md:grid-cols-3">
              {currentItems.length > 0
                ? currentItems.map((data, index) => {
                    const slug = generateSlug(data.newsurl);
                    return (
                      <div key={data.newsurl}>
                        <Link href={`/news/${slug}`}>
                          <div className="p-3">
                            <div className="relative w-full h-[266px]">
                              <Image
                                src={
                                  data?.newsthumbnail
                                    ? WWURL +
                                      encodeURIComponent(data.newsthumbnail)
                                    : Newsimgic
                                }
                                alt={data.alt || "Dubai Real Estate News"}
                                fill
                                priority={index < 10}
                                sizes="100vw"
                                quality={75}
                                style={{
                                  objectFit: "cover",
                                  display: "block",
                                }}
                              />
                            </div>

                            <div>
                              <div className="flex flex-col justify-between h-full">
                                <h2 className="mb-2 text-[0.9rem] md:text-2xl font-semibold tracking-normal text-white line-clamp-2 pt-2">
                                  {data.newstitle}
                                </h2>
                                <p
                                  dangerouslySetInnerHTML={{
                                    __html: data?.newspara1,
                                  }}
                                  className="m-0 font-normal text-gray-400 line-clamp-4"
                                ></p>
                              </div>

                              <div className="flex gap-1">
                                <p className="m-0 font-normal text-gray-400 line-clamp-4 pt-3">
                                  Published:
                                </p>
                                <p className="m-0 font-normal text-gray-400 line-clamp-4 pt-3">
                                  {data.published}
                                </p>
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
      </div>
    </>
  );
};
