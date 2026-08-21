"use client";
import React, { useEffect, useRef, useState } from "react";
import { MdLocationPin } from "react-icons/md";
import { IoSearch } from "react-icons/io5";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import ReactPaginate from "react-paginate";
import DemoImage from "@/public/assets/icons/image_demo.webp";
import Link from "next/link";
import Image from "next/image";
import { WWURL } from "@/url/axios";
import { usePathname } from "next/navigation";
import { getPaginatedProjectList } from "@/services/projectServices";
import MegaFilterPanel, { EMPTY_FILTERS } from "@/app/components/projectFilters/MegaFilterPanel";

const STATUS_VALUE = "off-plan";
const ITEMS_PER_PAGE = 50;

export default function OffPlanProjectGridList({
  partnerData,
  initialData,
  initialTotal,
  initialFilterOptions,
}) {
  // Seeded from the server-fetched first batch (see page.js) so the first
  // paint already has real cards — no client fetch, no loading skeleton.
  const [data, setData] = useState(initialData || []);
  const [total, setTotal] = useState(initialTotal || 0);
  const [filterOptions, setFilterOptions] = useState(initialFilterOptions || null);
  const [loading, setLoading] = useState(false);

  // Backend now returns everything matching in one response (no server-side
  // batching) — pagination here is purely a client-side display slice over
  // the already-fetched `data`, not another network round-trip.
  const [currentPage, setCurrentPage] = useState(0);

  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
  const [selectedDeveloper, setSelectedDeveloper] = useState("");
  const [megaFilters, setMegaFilters] = useState(EMPTY_FILTERS);
  const pathname = usePathname();
  const isFirstRun = useRef(true);

  const generateSlug = (name) => name.replace(/\s+/g, "-").toLowerCase();

  // Search now triggers a real network request instead of an in-memory
  // filter, so debounce it to avoid firing one per keystroke.
  useEffect(() => {
    const timer = setTimeout(() => setDebouncedSearchTerm(searchTerm), 400);
    return () => clearTimeout(timer);
  }, [searchTerm]);

  // Any filter/search/developer change re-fetches the full matching set and
  // resets back to page 1 of the client-side pagination. Skips the very
  // first run: that data already arrived server-side via props.
  useEffect(() => {
    if (isFirstRun.current) {
      isFirstRun.current = false;
      return;
    }
    let cancelled = false;
    setLoading(true);
    getPaginatedProjectList({
      status: STATUS_VALUE,
      next: 0,
      search: debouncedSearchTerm || undefined,
      developer: selectedDeveloper || undefined,
      ...megaFilters,
    })
      .then((res) => {
        if (cancelled) return;
        setData(res.data || []);
        setTotal(res.total || 0);
        setCurrentPage(0);
        if (res.filterOptions) setFilterOptions(res.filterOptions);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [debouncedSearchTerm, selectedDeveloper, megaFilters]);

  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
  };

  // 🔥 GTM Project Click Event
  const pushProjectClick = (project) => {
    if (typeof window !== "undefined") {
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
        event: "project_list_click",
        event_category: "Project Engagement",
        event_label: project.projectname,
        page_path: pathname,
        project_id: project._id,
        project_name: project.projectname,
        developer: project.developer,
        location: project.locationname,
        list_name: "Featured Off Plan Page",
      });
    }
  };

  const offset = currentPage * ITEMS_PER_PAGE;
  const currentItems = data.slice(offset, offset + ITEMS_PER_PAGE);
  const pageCount = Math.ceil(data.length / ITEMS_PER_PAGE);

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
          <div className="md:mt-0 mt-2">
            <MegaFilterPanel
              filterOptions={filterOptions}
              filters={megaFilters}
              onChange={setMegaFilters}
              resultCount={total}
            />
          </div>
        </div>

        <p className="px-4 mt-3 text-white/60 text-xs">
          {total} project{total === 1 ? "" : "s"} found
        </p>

        <div className="grid sm:grid-cols-2  md:grid-cols-3">
          {!loading && currentItems.length > 0
            ? currentItems.map((item, index) => {
                const slug = generateSlug(item.projectname);
                return (
                  <div className="p-4" key={item.projectname}>
                    <Link href={`/projects/${slug}`}
                    onClick={() => {
                            pushProjectClick(item);
                            if (typeof window !== "undefined" && window.snaptr) {
                              window.snaptr("track", `PROJECT_CLICK : /projects/${slug}`);
                            }
                          }} >
                      <div className="max-w-full overflow-hidden  border border-[#ffff] rounded-[10px] shadow bg-[#040406] cursor-pointer">
                        <div>
                          <div className="relative w-full h-[266px]">
                            <Image
                              src={
                                item?.thumbnail
                                  ? WWURL + encodeURIComponent(item.thumbnail)
                                  : DemoImage
                              }
                              alt={`${
                                item.projectname || "off plan, project"
                              }, ${
                                item.altthumbnail || "Dubai Apartment, villa"
                              }`}
                              fill
                              priority={index < 6}
                              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 33vw"
                              quality={75}
                              style={{
                                objectFit: "cover",
                                display: "block",
                              }}
                            />
                            {/* status tags and price */}
                            <div className="z-10">
                              {item.runingstatus === "newlaunch" && (
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

                              {item.runingstatus === "soldout" && (
                                <div className="card-status-tag text-[0.8rem] bg-[#FF9900] text-[#000000] rotate-[-40deg] w-fit px-12 absolute top-8 left-[-35px]">
                                  <h2 className="text-[0.8rem] font-normal m-0 px-1 py-1">
                                    SOLD OUT
                                  </h2>
                                </div>
                              )}
                              {item.startingprice && (
                                <div className="bg-[#FFC700] border border-[#fff] rounded-l-full rounded-r-none w-fit px-5 py-0 absolute bottom-[-10px] right-0">
                                  <h2 className="line-clamp-1 text-[0.8rem] font-normal m-0 px-1 py-1 text-[#000]">
                                    Starting From: {item.startingprice}
                                  </h2>
                                </div>
                              )}
                            </div>
                          </div>

                          <div className="p-5">
                            <h2 className="mb-2 text-2xl font-bold tracking-tight text-white line-clamp-1">
                              {item.projectname}
                            </h2>
                            <p className="m-0 font-normal text-gray-400 line-clamp-1">
                              {item.developer.replace(/-/g, " ")}
                            </p>
                            {item?.locationname && (
                              <div className="flex items-center">
                                <MdLocationPin className="text-gray-400 text-[1rem]" />
                                <p className="m-0 font-normal text-gray-400 line-clamp-1">
                                  {item.locationname}
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
            : loading
            ? [...Array(3)].map((_, index) => (
                <div className="p-4" key={index}>
                  <div className="relative border rounded-[10px] shadow bg-gray-800 animate-pulse">
                    <div className="h-[250px] bg-gray-600 rounded-t-lg"></div>
                    <div className="p-5">
                      <div className="h-6 bg-gray-500 rounded w-3/4 mb-2"></div>
                      <div className="h-4 bg-gray-500 rounded w-1/2"></div>
                    </div>
                  </div>
                </div>
              ))
            : (
                <p className="px-4 text-white/60">No projects found.</p>
              )}
        </div>

        {/* Pagination */}
        {pageCount > 1 && (
          <div className="flex justify-center mt-5 pagination-block">
            <ReactPaginate
              className="flex text-[#fff]"
              previousLabel={<IoIosArrowBack className="text-[1.5rem]" />}
              nextLabel={<IoIosArrowForward className="text-[1.5rem]" />}
              breakLabel={"..."}
              breakClassName={"break-me"}
              pageCount={pageCount}
              forcePage={currentPage}
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
        )}
      </div>
    </div>
  );
}
